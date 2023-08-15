import { ActionType } from "../action-types";
import { Board, BoardName, ModalTypes } from "../../types";

interface GetBoardNamesAction {
  type: ActionType.GET_BOARD_NAMES;
};

interface GetBoardNamesSuccessAction {
  type: ActionType.GET_BOARD_NAMES_SUCCESS;
  payload: BoardName[];
};

interface GetBoardNamesErrorAction {
  type: ActionType.GET_BOARD_NAMES_ERROR;
  payload: string;
};

interface GetBoardAction {
  type: ActionType.GET_BOARD;
};

interface GetBoardSuccessAction {
  type: ActionType.GET_BOARD_SUCCESS;
  payload: Board;
};

interface GetBoardErrorAction {
  type: ActionType.GET_BOARD_ERROR;
  payload: string;
};

interface CreateBoardAction {
  type: ActionType.CREATE_BOARD;
};

interface CreateBoardSuccessAction {
  type: ActionType.CREATE_BOARD_SUCCESS;
  payload: Board;
};

interface CreateBoardErrorAction {
  type: ActionType.CREATE_BOARD_ERROR;
  payload: string;
};

interface EditBoardAction {
  type: ActionType.EDIT_BOARD;
};

interface EditBoardSuccessAction {
  type: ActionType.EDIT_BOARD_SUCCESS;
  payload: Board;
};

interface EditBoardErrorAction {
  type: ActionType.EDIT_BOARD_ERROR;
  payload: string;
};

interface DeleteBoardAction {
  type: ActionType.DELETE_BOARD;
};

interface DeleteBoardSuccessAction {
  type: ActionType.DELETE_BOARD_SUCCESS;
  payload: Board;
};

interface DeleteBoardErrorAction {
  type: ActionType.DELETE_BOARD_ERROR;
  payload: string;
};

interface CreateTaskAction {
  type: ActionType.CREATE_TASK;
};

interface CreateTaskSuccessAction {
  type: ActionType.CREATE_TASK_SUCCESS;
  payload: Board;
};

interface CreateTaskErrorAction {
  type: ActionType.CREATE_TASK_ERROR;
  payload: string;
};

interface UpdateTaskAction {
  type: ActionType.UPDATE_TASK;
  payload: Board;
};

interface UpdateTaskSuccessAction {
  type: ActionType.UPDATE_TASK_SUCCESS;
  payload: Board;
};

interface UpdateTaskErrorAction {
  type: ActionType.UPDATE_TASK_ERROR;
  payload: string;
};

interface DeleteTaskAction {
  type: ActionType.DELETE_TASK;
};

interface DeleteTaskSuccessAction {
  type: ActionType.DELETE_TASK_SUCCESS;
  payload: Board;
};

interface DeleteTaskErrorAction {
  type: ActionType.DELETE_TASK_ERROR;
  payload: string;
};

interface UpdateSubtaskAction {
  type: ActionType.UPDATE_SUBTASK;
};

interface UpdateSubtaskSuccessAction {
  type: ActionType.UPDATE_SUBTASK_SUCCESS;
  payload: Board;
};

interface UpdateSubtaskErrorAction {
  type: ActionType.UPDATE_SUBTASK_ERROR;
  payload: string;
};


interface ToggleSidebarAction {
  type: ActionType.TOGGLE_SIDEBAR;
  payload: boolean | null;
};

interface ToggleModeAction {
  type: ActionType.TOGGLE_MODE;
  payload: string;
};

interface OpenModal {
  type: ActionType.OPEN_MODAL;
  payload: ModalTypes;
};

interface CloseModal {
  type: ActionType.CLOSE_MODAL;
};

export type Action = GetBoardNamesAction
| GetBoardNamesSuccessAction
| GetBoardNamesErrorAction
| GetBoardAction
| GetBoardSuccessAction
| GetBoardErrorAction
| ToggleSidebarAction
| ToggleModeAction
| CreateBoardAction
| CreateBoardSuccessAction
| CreateBoardErrorAction
| EditBoardAction
| EditBoardSuccessAction
| EditBoardErrorAction
| DeleteBoardAction
| DeleteBoardSuccessAction
| DeleteBoardErrorAction
| CreateTaskAction
| CreateTaskSuccessAction
| CreateTaskErrorAction
| UpdateTaskAction
| UpdateTaskSuccessAction
| UpdateTaskErrorAction
| DeleteTaskAction
| DeleteTaskSuccessAction
| DeleteTaskErrorAction
| UpdateSubtaskAction
| UpdateSubtaskSuccessAction
| UpdateSubtaskErrorAction
| OpenModal
| CloseModal;
