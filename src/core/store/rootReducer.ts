import { combineReducers } from "redux";
import contactsSlice from "./slices/contacts/contactsSlice";
import groupsSlice from "./slices/groups/groupsSlice";
import authSlice from "./slices/auth/authSlice";

const rootReducer = combineReducers({
  contactsSlice,
  groupsSlice,
  authSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
