
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import boardsReducer from "./reducers/boardsReducer";
import appReducer from "./reducers/appReducer";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    app: appReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
