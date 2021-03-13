import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk } from "../../store";
import { User } from "./types";

const initialState: User[] = [
  {
    id: 0,
    login: "loniek_pro",
  },
  {
    id: 1,
    login: "adritre",
  },
  {
    id: 2,
    login: "szymtry",
  },
];

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    add(state, action: PayloadAction<User>) {
      state.push(action.payload);
    },
    set(state, action: PayloadAction<User[]>) {
      return action.payload;
    },
  },
});

export const { add, set } = contactsSlice.actions;

export const refreshContacts = (): AppThunk => async (
  dispatch: AppDispatch
) => {
  // const newContactsList = await contactsService.get();
  // dispatch(contactsSlice.actions.set(newContactsList));
  console.log("TODO - pobieranie kontaktów");
};

export default contactsSlice.reducer;
