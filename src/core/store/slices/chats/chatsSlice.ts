import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatDto, chatsService } from "../../../api/chatsService";
import { ChatsState } from "./types";

const initialState: ChatsState = {
  chats: [],
  selectedChat: undefined,
  error: undefined,
  promise: "initial",
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    add(state, action: PayloadAction<ChatDto>) {
      state.chats.push(action.payload);
    },
    set(state, action: PayloadAction<ChatDto[]>) {
      state.chats = action.payload;
    },
    setSelected(state, action: PayloadAction<number>) {
      const newChat = state.chats.find((x) => x.id === action.payload);
      if (newChat) {
        state.selectedChat = newChat;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(chatsService.fetchChats.pending, (state) => {
      state.promise = "pending";
    });
    builder.addCase(chatsService.fetchChats.fulfilled, (state, { payload }) => {
      state.chats = payload;
      state.selectedChat = payload[0];
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

export const { add, set, setSelected } = chatsSlice.actions;

export default chatsSlice.reducer;
