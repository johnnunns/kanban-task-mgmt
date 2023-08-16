import { StatusCodes } from 'http-status-codes';
import { Board, Task, Subtask } from '../models/Board'
import mongoose from 'mongoose';

const getBoard = async (req: any, res: any) => {
  try {
    const boardId = req.params.boardId;
    const result = await Board.findById(boardId)

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error('Error fetching board by ID:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
}

const getAllBoardNames = async (req: any, res: any) => {
  try {
    const result = await Board.find({});
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error('Error fetching board names:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
}

const createBoard = async (req: any, res: any) => {
  try {
    const board = await Board.create(req.body);
    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    console.error('Error creating board:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
}

const deleteBoard = async (req: any, res: any) => {
  const { boardId } = req.params;

  try {
    const deletedBoard = await Board.findByIdAndDelete(boardId);

    if (!deletedBoard) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Board not found' });
    }

    res.status(StatusCodes.OK).json({ message: 'Board deleted successfully' });
  } catch (error) {
    console.error('Error deleting board:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
}

const updateBoard = async (req: any, res: any) => {
  try {
    const { boardId } = req.params;
    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      req.body,
      { new: true }
    );

    res.status(StatusCodes.OK).json(updatedBoard);
  } catch (error) {
    console.error('Error creating board:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
}

const createTask = async (req: any, res: any) => {
  const { boardId, columnId } = req.params;
  const { title, description, subtasks } = req.body;
  try {
    // Find the board by ID and its specific column
    const board = await Board.findById(boardId);
    const column = board?.columns?.find(col => col._id.equals(columnId));

    if (!column) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Column not found' });
    }

    // Create subtask documents from the req.body subtasks array
    const subtaskDocuments = subtasks
    .filter((subtask: { title: string, isCompleted: boolean }) => subtask.title)
    .map((subTask: { title: string, isCompleted: boolean }) => ({
      title: subTask.title,
      isCompleted: subTask.isCompleted || false,
    }));

    // Create a new task and add it to the column's tasks array
    const newTask = new Task({
      status: column.name,
      title,
      description,
      subtasks: subtaskDocuments,
    });
    column.tasks.push(newTask);

    // Save the changes
    await board?.save();
    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
}

const deleteTask = async (req: any, res: any) => {
  const { boardId, columnId, taskId } = req.params;
  try {
    // Find the board by ID and its specific column
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Board not found' });
    }
  
    const column = board?.columns?.find(col => col._id.equals(columnId));

    if (!column) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Column not found' });
    }

    // Find the existing task in the column's tasks array
    const existingTask = column.tasks.find(task => task._id.equals(taskId));

    if (!existingTask) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Task not found' });
    }
    
    const sourceColumnIndex = board.columns.findIndex(col => col._id.equals(columnId));
    board.columns[sourceColumnIndex].tasks.splice(
      column.tasks.findIndex(task => task._id.equals(taskId)),
      1
    );

    await board?.save();
  
    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
}

const updateTask = async (req: any, res: any) => {
  const { boardId, columnId, taskId } = req.params;
  const { title, description, subtasks, destinationColumnId, destinationTaskIndex } = req.body;
  try {
    // Find the board by ID and its specific column
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Board not found' });
    }
  
    const column = board?.columns?.find(col => col._id.equals(columnId));

    if (!column) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Column not found' });
    }

    // Find the existing task in the column's tasks array
    const existingTask = column.tasks.find(task => task._id.equals(taskId));

    if (!existingTask) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Task not found' });
    }

    // Update the existing task's properties if provided
    if (title !== undefined) {
      existingTask.title = title;
    }
    if (description !== undefined) {
      existingTask.description = description;
    }
    if (subtasks !== undefined) {
      existingTask.subtasks = subtasks;
    }

    // if destination column is different also check index.
    // if column is the same still check index

    const sourceTabIndex = column.tasks.findIndex(task => task._id.equals(taskId));
    const movingColumns = destinationColumnId && destinationColumnId !== columnId;
    const movingIndexes = destinationTaskIndex !== undefined && destinationTaskIndex !== sourceTabIndex;
    
    if (movingColumns) {
      // Move task to a different column
      const sourceColumnIndex = board.columns.findIndex(col => col._id.equals(columnId));
      const destinationColumnIndex = board.columns.findIndex(col => col._id.equals(destinationColumnId));

      if (sourceColumnIndex !== -1 && destinationColumnIndex !== -1) {
        const [movedTask] = board.columns[sourceColumnIndex].tasks.splice(
          column.tasks.findIndex(task => task._id.equals(taskId)),
          1
        );
        // creating "new" task to push to new column so mongoose doesn't trip over id
        const newTask = new Task({
          _id: movedTask.id,
          status: board.columns[destinationColumnIndex].name,
          title: movedTask.title,
          description: movedTask.description,
          subtasks: movedTask.subtasks,
        });
  
        if (destinationTaskIndex !== undefined) {
          board.columns[destinationColumnIndex].tasks.splice(destinationTaskIndex, 0, newTask);
        } else {
          board.columns[destinationColumnIndex].tasks.push(newTask);
        }
      } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Unable to move task to new column' });
      }
    } else if (movingIndexes) {
      // Task remains in the same column but the index is updated
      const sourceColumnIndex = board.columns.findIndex(col => col._id.equals(columnId));

      const [movedTask] = board.columns[sourceColumnIndex].tasks.splice(sourceTabIndex, 1);
      column.tasks.splice(destinationTaskIndex || 0, 0, movedTask);
    }

    // Save the changes to the column and the board
    await board?.save();

    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
};

const updateSubtask = async (req: any, res: any) => {
  const { boardId, columnId, taskId, subtaskId } = req.params;
  const { isCompleted, title } = req.body;

  try {
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Board not found' });
    }

    const targetColumn = board.columns.find(col => col._id.equals(columnId));

    if (!targetColumn) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Column not found' });
    }

    const targetTask = targetColumn.tasks.find(task => task._id.equals(taskId));

    if (!targetTask) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Task not found in the specified column' });
    }

    const targetSubtask = targetTask.subtasks?.find(subtask => (subtask as any)._id.equals(subtaskId));

    if (!targetSubtask) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Subtask not found in the specified task' });
    }

    targetSubtask.isCompleted = isCompleted;
    targetSubtask.title = title;

    await board.save();

    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    console.error('Error updating subtask:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
};

export {
  getAllBoardNames,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard,
  createTask,
  deleteTask,
  updateTask,
  updateSubtask,
};
