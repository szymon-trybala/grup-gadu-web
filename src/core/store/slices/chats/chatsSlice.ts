import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chatsService } from "../../../api/chatsService";
import { Chat, ChatsState } from "./types";

const initialState: ChatsState = {
  chats: [],
  error: undefined,
  promise: "initial",
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Chat>) {
      state.chats.push(action.payload);
    },
    set(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(chatsService.fetchChats.pending, (state) => {
      state.promise = "pending";
    });
    builder.addCase(chatsService.fetchChats.fulfilled, (state, { payload }) => {
      state.chats = payload;
      state.promise = "fulfilled";
    });
    builder.addCase(chatsService.fetchChats.rejected, (state, action) => {
      state.promise = "error";
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export const { add, set } = chatsSlice.actions;

export default chatsSlice.reducer;
