import express from 'express';
import {
  getAllBoardNames,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard,
  createTask,
  deleteTask,
  updateTask,
  updateSubtask,
} from '../controllers/boardControllers';

const router = express.Router();

// Boards routes
router.route('/boards')
  .post(createBoard);

router.route('/boards/names').get(getAllBoardNames);

router.route('/boards/:boardId')
  .delete(deleteBoard)
  .patch(updateBoard)
  .get(getBoard);

// Tasks routes
router.route('/boards/:boardId/columns/:columnId/tasks')
  .post(createTask);

router.route('/boards/:boardId/columns/:columnId/tasks/:taskId')
  .delete(deleteTask)
  .patch(updateTask);

router.route('/boards/:boardId/columns/:columnId/tasks/:taskId/subtask/:subtaskId')
  .patch(updateSubtask)

export default router;
