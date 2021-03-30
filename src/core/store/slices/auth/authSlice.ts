import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { Auth } from "./types";

const emptyAuthObject: Auth = {
  user: undefined,
};

function getInitialAuthStateFromLocalStorate(): Auth {
  try {
    const token = localStorage.getItem("token");
    if (!token) return emptyAuthObject;

    const decoded = jwtDecode<any>(token);
    if (!decoded) return emptyAuthObject;

    return {
      user: {
        login: decoded.unique_name,
        id: decoded.nameid,
        token: token,
      },
    };
  } catch (error) {
    return emptyAuthObject;
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthStateFromLocalStorate(),
  reducers: {
    set(state, action: PayloadAction<Auth>) {
      return action.payload;
    },
  },
});

export const { set } = authSlice.actions;

export default authSlice.reducer;
