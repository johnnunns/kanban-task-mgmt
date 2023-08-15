export enum ActionType {
  // app
  TOGGLE_SIDEBAR = 'toggle_sidebar',
  TOGGLE_MODE = 'toggle_mode',

  // board
  OPEN_MODAL = 'open_modal',
  CLOSE_MODAL = 'close_modal',

  GET_BOARD_NAMES = 'get_board_names',
  GET_BOARD_NAMES_SUCCESS = 'get_board_names_success',
  GET_BOARD_NAMES_ERROR = 'get_board_names_error',

  GET_BOARD = 'get_board',
  GET_BOARD_SUCCESS = 'get_board_success',
  GET_BOARD_ERROR = 'get_board_error',

  CREATE_BOARD = 'create_board',
  CREATE_BOARD_SUCCESS = 'create_board_success',
  CREATE_BOARD_ERROR = 'create_board_error',

  EDIT_BOARD = 'edit_board',
  EDIT_BOARD_SUCCESS = 'edit_board_success',
  EDIT_BOARD_ERROR = 'edit_board_error',

  DELETE_BOARD = 'delete_board_',
  DELETE_BOARD_SUCCESS = 'delete_board_success',
  DELETE_BOARD_ERROR = 'delete_board_error',

  CREATE_TASK = 'create_task',
  CREATE_TASK_SUCCESS = 'create_task_success',
  CREATE_TASK_ERROR = 'create_task_error',

  UPDATE_TASK = 'update_task',
  UPDATE_TASK_SUCCESS = 'update_task_success',
  UPDATE_TASK_ERROR = 'update_task_error',
  
  DELETE_TASK = 'delete_task',
  DELETE_TASK_SUCCESS = 'delete_task_success',
  DELETE_TASK_ERROR = 'delete_task_error',

  UPDATE_SUBTASK = 'update_subtask',
  UPDATE_SUBTASK_SUCCESS = 'update_subtask_success',
  UPDATE_SUBTASK_ERROR = 'update_subtask_error',
}
