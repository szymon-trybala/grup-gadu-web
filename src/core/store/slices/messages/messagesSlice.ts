import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageDto, messagesService } from "../../../api/messagesService";
import { MessagesState } from "./types";

const initialState: MessagesState = {
  messages: [],
  error: undefined,
  promise: "initial",
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<MessageDto>) {
      state.messages.push(action.payload);
    },
    setMessages(state, action: PayloadAction<MessageDto[]>) {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(messagesService.fetchMessages.pending, (state) => {
      state.promise = "pending";
    });
    builder.addCase(
      messagesService.fetchMessages.fulfilled,
      (state, { payload }) => {
        state.messages = payload;
        state.promise = "fulfilled";
      }
    );
    builder.addCase(messagesService.fetchMessages.rejected, (state, action) => {
      state.promise = "error";
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export const { addMessage, setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
