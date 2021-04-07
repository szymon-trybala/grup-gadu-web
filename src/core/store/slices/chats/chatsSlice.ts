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
    addChat(state, action: PayloadAction<ChatDto>) {
      state.chats.push(action.payload);
    },
    setChatList(state, action: PayloadAction<ChatDto[]>) {
      state.chats = action.payload;
    },
    setSelectedChat(state, action: PayloadAction<number>) {
      state.chats = state.chats.map((x) => {
        if (x.id === action.payload) return { ...x, unreadMessages: 0 };
        return x;
      });
      const newChat = state.chats.find((x) => x.id === action.payload);
      if (newChat) {
        state.selectedChat = newChat;
      }
    },
    newMessageInChat(state, action: PayloadAction<number>) {
      if (state.selectedChat && state.selectedChat?.id !== action.payload)
        state.chats = state.chats.map((x) => {
          if (x.id === action.payload)
            return { ...x, unreadMessages: x.unreadMessages + 1 };
          return x;
        });
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

export const {
  addChat,
  setChatList,
  setSelectedChat,
  newMessageInChat,
} = chatsSlice.actions;

export default chatsSlice.reducer;
