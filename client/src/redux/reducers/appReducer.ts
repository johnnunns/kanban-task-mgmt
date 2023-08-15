import { ActionType } from "../action-types";
import { Action } from "../actions";

export interface AppState {
  mode: string;
  showSidebar: boolean;
}

const initialState = {
  mode: sessionStorage.getItem('mode') || 'light',
  showSidebar: true,
};

const reducer = (
  state: AppState = initialState,
  action: Action
  ): AppState => {
    switch (action.type) {
      case ActionType.TOGGLE_SIDEBAR:
        const usePayload = typeof action.payload === 'boolean';
        return { ...state, showSidebar: usePayload ? action.payload as boolean : !state.showSidebar };
      case ActionType.TOGGLE_MODE:
        return { ...state, mode: action.payload };
      default:
        return state;
    }
};

export default reducer;
