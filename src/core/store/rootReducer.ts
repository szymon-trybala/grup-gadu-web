import { combineReducers } from "redux";
import contactsSlice from "./slices/contacts/contactsSlice";
import chatsSlice from "./slices/chats/chatsSlice";
import authSlice from "./slices/auth/authSlice";

const rootReducer = combineReducers({
  contactsSlice,
  chatsSlice,
  authSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
