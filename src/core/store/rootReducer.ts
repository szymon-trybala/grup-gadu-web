import { combineReducers } from "redux";
import contactsSlice from "./slices/contacts/contactsSlice";
import chatsSlice from "./slices/chats/chatsSlice";
import authSlice from "./slices/auth/authSlice";
import messagesSlice from "./slices/messages/messagesSlice";

const rootReducer = combineReducers({
  contactsSlice,
  chatsSlice,
  authSlice,
  messagesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
