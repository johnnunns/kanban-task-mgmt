import axios from 'axios';
import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { Action } from '../actions';
import { BoardName, Modals, Subtask } from '../../types';
import { cloneDeep } from 'lodash';
import { RootState } from '../store';

const baseURL =
  process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:5000/api/v1';

const axiosInstance = axios.create({
  baseURL,
});

export const toggleMode = () => {
  return (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { app } = getState();
    const mode = app.mode === 'light' ? 'dark' : 'light';
    sessionStorage.setItem('mode', mode);

    dispatch({
      type: ActionType.TOGGLE_MODE,
      payload: mode,
    });
  };
};

export const toggleSidebar = (bool?: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.TOGGLE_SIDEBAR,
      payload: bool !== undefined ? bool : null,
    })
  }
}

export const openModal = (type: Modals, modalData?: any) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.OPEN_MODAL,
      payload: {type, modalData},
    })
  }
}

export const closeModal = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CLOSE_MODAL,
    })
  }
}

export const getBoardNames = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_BOARD_NAMES,
    })
    try {
      const { data } = await axiosInstance.get('/boards/names');

      const names = data.map((result: BoardName) => {
        return { name: result.name, id: result.id };
      });

      dispatch({
        type: ActionType.GET_BOARD_NAMES_SUCCESS,
        payload: names,
      })
    } catch (e: any) {
      dispatch({
        type: ActionType.GET_BOARD_NAMES_ERROR,
        payload: e.message,
      })
    }
  }
}

export const createBoard = ({name, columns}: {name: string, columns: { name: string; }[]}) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CREATE_BOARD,
    })
    try {
      const cleanColumns = columns.filter((c) => c.name);

      const { data } = await axiosInstance.post('/boards', {
        name,
        columns: cleanColumns,
      });

      dispatch({
        type: ActionType.CREATE_BOARD_SUCCESS,
        payload: data,
      })

      return data;
    } catch (e: any) {
      dispatch({
        type: ActionType.CREATE_BOARD_ERROR,
        payload: e.message,
      })
    }
  }
}

export const updateBoard = (boardId: string, boardName: string, columns: {name: string}[]) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.EDIT_BOARD,
    })
    try {
      const cleanColumns = columns.filter((c) => c.name);

      const { data } = await axiosInstance.patch(`/boards/${boardId}`, {
        name: boardName,
        columns: cleanColumns,
      });

      dispatch({
        type: ActionType.EDIT_BOARD_SUCCESS,
        payload: data,
      })
    } catch (e: any) {
      dispatch({
        type: ActionType.EDIT_BOARD_ERROR,
        payload: e.message,
      })
    }
  }
}

export const deleteBoard = (boardId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DELETE_BOARD,
    })
    try {
      const { data } = await axiosInstance.delete(`/boards/${boardId}`);

      dispatch({
        type: ActionType.DELETE_BOARD_SUCCESS,
        payload: data,
      })
    } catch (e: any) {
      dispatch({
        type: ActionType.DELETE_BOARD_ERROR,
        payload: e.message,
      })
    }
  }
}

export const getBoard = (boardId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_BOARD,
    })
    try {
      const { data } = await axiosInstance.get(`/boards/${boardId}`);

      dispatch({
        type: ActionType.GET_BOARD_SUCCESS,
        payload: data,
      })
    } catch (e: any) {
      dispatch({
        type: ActionType.GET_BOARD_ERROR,
        payload: e.message,
      })
    }
  }
}

export const createTask = ({ boardId, columnId, title, description, subtasks }: { boardId: string; columnId: string, title: string, description: string, subtasks: Subtask[] }) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CREATE_TASK,
    })
    try {
      const { data } = await axiosInstance.post(`/boards/${boardId}/columns/${columnId}/tasks`, {
        title,
        description,
        subtasks,
      });

      dispatch({
        type: ActionType.CREATE_TASK_SUCCESS,
        payload: data,
      })
    } catch (e: any) {
      dispatch({
        type: ActionType.CREATE_TASK_ERROR,
        payload: e.message,
      })
    }
  }
}

export const updateTask = ({ boardId, columnId, taskId, title, description, subtasks, destinationColumnId, destinationTaskIndex }: { boardId: string; columnId: string, taskId: string, title?: string, description?: string, subtasks?: Subtask[], destinationColumnId?: string, destinationTaskIndex?: number }) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { boards } = getState();
    const board = boards.selectedBoard;

    if (!board) {
      console.error('No selected board found');
      return;
    };
    const updatedBoard = cloneDeep(board);

    if (destinationColumnId !== undefined || destinationTaskIndex !== undefined) {
      const destinationColumnIndex = updatedBoard.columns.findIndex(col => col.id === destinationColumnId);
      const sourceColumnIndex = updatedBoard.columns.findIndex(col => col.id === columnId);
      const sourceColumn = updatedBoard.columns[sourceColumnIndex];
      const taskIndex = sourceColumn.tasks.findIndex(task => task.id === taskId);
  
      const [movedTask] = sourceColumn.tasks.splice(taskIndex, 1);
  
      if (destinationColumnIndex !== undefined) {
        const destinationColumn = updatedBoard.columns[destinationColumnIndex];
  
        if (destinationTaskIndex !== undefined) {
          destinationColumn.tasks.splice(destinationTaskIndex, 0, movedTask);
        } else {
          destinationColumn.tasks.push(movedTask);
        }
      } else {
        sourceColumn.tasks.splice(destinationTaskIndex || 0, 0, movedTask);
      }
    }

    dispatch({
      type: ActionType.UPDATE_TASK,
      payload: updatedBoard,
    });


    try {
      const { data } = await axiosInstance.patch(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        title,
        description,
        subtasks,
        destinationColumnId,
        destinationTaskIndex,
      });

      dispatch({
        type: ActionType.UPDATE_TASK_SUCCESS,
        payload: data,
      });
    } catch (e: any) {
      dispatch({
        type: ActionType.UPDATE_TASK_ERROR,
        payload: e.message,
      });
    }
  }
}

export const deleteTask = ({ boardId, columnId, taskId }: {boardId: string, columnId: string, taskId: string}) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DELETE_TASK,
    })
    try {
      const { data } = await axiosInstance.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);

      dispatch({
        type: ActionType.DELETE_TASK_SUCCESS,
        payload: data,
      })
    } catch (e: any) {
      dispatch({
        type: ActionType.DELETE_TASK_ERROR,
        payload: e.message,
      })
    }
  }
}

export const updateSubtask = ({ boardId, columnId, taskId, subtaskId, isCompleted, title }: {boardId: string, columnId: string, taskId: string, subtaskId: string, isCompleted: boolean, title: string}) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.UPDATE_SUBTASK,
    })
    try {
      const { data } = await axiosInstance.patch(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}/subtask/${subtaskId}`, {
        isCompleted,
        title,
      });

      dispatch({
        type: ActionType.UPDATE_SUBTASK_SUCCESS,
        payload: data,
      })
    } catch (e: any) {
      dispatch({
        type: ActionType.UPDATE_SUBTASK_ERROR,
        payload: e.message,
      })
    }
  }
}
