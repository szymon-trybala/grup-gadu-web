import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { Auth } from "./types";

function getInitialAuthStateFromLocalStorate(): Auth {
  try {
    const token = localStorage.getItem("token");
    if (!token)
      return {
        login: undefined,
        token: undefined,
      };

    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded)
      return {
        login: undefined,
        token: undefined,
      };

    return {
      login: decoded.sub,
      token: token,
    };
  } catch (error) {
    return {
      login: undefined,
      token: undefined,
    };
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
