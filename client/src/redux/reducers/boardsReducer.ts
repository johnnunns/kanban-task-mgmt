import { ActionType } from "../action-types";
import { Board, BoardName, ModalTypes } from '../../types';
import { Action } from "../actions";

export interface BoardState {
  namesLoading: boolean;
  boardNames: BoardName[];
  selectedBoard: Board | null;
  loading: boolean;
  error: string | null;
  openModal: ModalTypes | null;
};

const initialState = {
  namesLoading: true,
  boardNames: [],
  loading: false,
  selectedBoard: null,
  error: null,
  openModal: null,
};

const reducer = (
  state: BoardState = initialState,
  action: Action
  ): BoardState => {
    switch (action.type) {
      case ActionType.OPEN_MODAL:
        return { ...state, openModal: action.payload };
      case ActionType.CLOSE_MODAL:
        return { ...state, openModal: null };
      case ActionType.GET_BOARD_NAMES:
        return { ...state, namesLoading: true, error: null, boardNames: [] };
      case ActionType.GET_BOARD_NAMES_SUCCESS:
        return { ...state, namesLoading: false, error: null, boardNames: action.payload };
      case ActionType.GET_BOARD_NAMES_ERROR:
        return { ...state, namesLoading: false, error: action.payload, boardNames: [] };
      case ActionType.GET_BOARD:
        return { ...state, loading: true, error: null, selectedBoard: null };
      case ActionType.GET_BOARD_SUCCESS:
        return { ...state, loading: false, error: null, selectedBoard: action.payload };
      case ActionType.GET_BOARD_ERROR:
        return { ...state, loading: false, error: action.payload, selectedBoard: null };
      case ActionType.CREATE_BOARD:
        return { ...state,loading: true, error: null, selectedBoard: state.selectedBoard, boardNames: state.boardNames };
      case ActionType.CREATE_BOARD_SUCCESS:
        return { ...state,loading: false, error: null, selectedBoard: action.payload, boardNames: [...state.boardNames, { id: action.payload.id, name: action.payload.name }] };
      case ActionType.CREATE_BOARD_ERROR:
        return { ...state,loading: false, error: action.payload, selectedBoard: state.selectedBoard, boardNames: state.boardNames };
      case ActionType.EDIT_BOARD:
        return { ...state,loading: true, error: null, selectedBoard: state.selectedBoard};
      case ActionType.EDIT_BOARD_SUCCESS:
        return { ...state,loading: false, error: null, selectedBoard: action.payload };
      case ActionType.EDIT_BOARD_ERROR:
        return { ...state,loading: false, error: action.payload, selectedBoard: state.selectedBoard };
      case ActionType.CREATE_TASK:
        return { ...state,loading: true, error: null, selectedBoard: state.selectedBoard};
      case ActionType.CREATE_TASK_SUCCESS:
        return { ...state,loading: false, error: null, selectedBoard: action.payload };
      case ActionType.CREATE_TASK_ERROR:
        return { ...state,loading: false, error: action.payload, selectedBoard: state.selectedBoard };
      case ActionType.UPDATE_TASK:
        return { ...state,loading: true, error: null, selectedBoard: action.payload };
      case ActionType.UPDATE_TASK_SUCCESS:
        return { ...state,loading: false, error: null, selectedBoard: action.payload };
      case ActionType.UPDATE_TASK_ERROR:
        return { ...state,loading: false, error: action.payload, selectedBoard: state.selectedBoard };
      case ActionType.DELETE_TASK:
        return { ...state,loading: true, error: null, selectedBoard: state.selectedBoard};
      case ActionType.DELETE_TASK_SUCCESS:
        return { ...state,loading: false, error: null, selectedBoard: action.payload };
      case ActionType.DELETE_TASK_ERROR:
        return { ...state,loading: false, error: action.payload, selectedBoard: state.selectedBoard };
      case ActionType.UPDATE_SUBTASK:
        return { ...state,loading: true, error: null, selectedBoard: state.selectedBoard};
      case ActionType.UPDATE_SUBTASK_SUCCESS:
        return { ...state,loading: false, error: null, selectedBoard: action.payload };
      case ActionType.UPDATE_SUBTASK_ERROR:
        return { ...state,loading: false, error: action.payload, selectedBoard: state.selectedBoard };
      default:
        return state;
    }
};

export default reducer;
