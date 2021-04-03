import {
  Action,
  AnyAction,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { signal } from "./middlewares/signalr/signalrSlice";
import rootReducer, { RootState } from "./rootReducer";
import { SignalAction, SignalDispatch } from "redux-signalr";

const store = configureStore({
  reducer: rootReducer,
  middleware: [signal],
});

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export type SignalrAction<ReturnValue = void> = SignalAction<
  ReturnValue,
  RootState,
  AnyAction
>;
export type AppDispatch<Action extends AnyAction = AnyAction> = SignalDispatch<
  RootState,
  Action
>;

export default store;
