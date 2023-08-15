export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}

export interface BoardName {
  name: string;
  id: string;
}

export enum Modals {
  VIEW_TASK = 'view_task',
  ADD_BOARD = 'add_board',
  EDIT_BOARD = 'edit_board',
  ADD_TASK = 'add_task',
  EDIT_TASK = 'edit_task',
  DELETE_BOARD = 'delete_board',
  DELETE_TASK = 'delete_task',
  MOBILE_BOARD_LIST = 'mobile_board_list',
}

export interface ModalTypes {
  type: Modals;
  modalData: any;
}