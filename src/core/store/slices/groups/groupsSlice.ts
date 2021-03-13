import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk } from "../../store";
import { Group } from "./types";

const initialState: Group[] = [
  {
    id: 0,
    name: "Dev team",
    members: [
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
    ],
    admin: {
      id: 0,
      login: "loniek_pro",
    },
    unread: 8,
  },
  {
    id: 1,
    name: "adrite",
    members: [
      {
        id: 1,
        login: "adritre",
      },
      {
        id: 2,
        login: "szymtry",
      },
    ],
    admin: {
      id: 1,
      login: "szymtry",
    },
    unread: 0,
  },
];

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Group>) {
      state.push(action.payload);
    },
    set(state, action: PayloadAction<Group[]>) {
      return action.payload;
    },
  },
});

export const { add, set } = groupsSlice.actions;

export const refreshGroups = (): AppThunk => async (
  dispatch: AppDispatch
) => {
  // const newGroupsList = await groupsList.get();
  // dispatch(groupsSlice.actions.set(newGroupsList));
  console.log("TODO - pobieranie grup");
};

export default groupsSlice.reducer;
