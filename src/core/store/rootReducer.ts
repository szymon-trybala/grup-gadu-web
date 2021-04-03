import { combineReducers } from "redux";
import chatsSlice from "./slices/chats/chatsSlice";
import authSlice from "./slices/auth/authSlice";
import messagesSlice from "./slices/messages/messagesSlice";

const rootReducer = combineReducers({
  chatsSlice,
  authSlice,
  messagesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
