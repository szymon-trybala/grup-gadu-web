import { combineReducers } from "redux";
import contactsSlice from "./slices/contacts/contactsSlice";
import groupsSlice from "./slices/groups/groupsSlice";

const rootReducer = combineReducers({
  contactsSlice,
  groupsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
