import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { authService, LoginDto } from "../../../api/authService";
import { AppDispatch, AppThunk } from "../../store";
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

export const login = (loginDto: LoginDto): AppThunk => async (
  dispatch: AppDispatch
) => {
  authService.login(loginDto).then((user) => {
    dispatch(authSlice.actions.set(user));
    localStorage.setItem("token", user.token);
  });
};

export default authSlice.reducer;
