import { createAsyncThunk } from "@reduxjs/toolkit";
import { MessagesFetchError } from "../store/slices/messages/types";
import { AppDispatch } from "../store/store";

export interface SeenByDto {
  login: string;
  id: number;
  seenAt: Date;
}

export interface MessageDto {
  id: number;
  authorId: number;
  authorLogin: string;
  chatId: number;
  chatName: string;
  createdAt: Date;
  content: string;
}

export interface MessageSendDto {
  chatId: number;
  messageContent: string;
}

const fetchMessages = createAsyncThunk<
  MessageDto[],
  {
    chatId: number;
  },
  {
    dispatch: AppDispatch;
    rejectValue: MessagesFetchError;
  }
>("message/all", async (props, thunkApi) => {
  const token = localStorage.getItem("token");
  if (!token || token === null || token.length < 1)
    return thunkApi.rejectWithValue({ errorMessage: "Brak tokenu" });

  const response = await fetch(`api/message/all?chatId=${props.chatId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
    return thunkApi.rejectWithValue({ errorMessage: "Nie jesteś zalogowany" });
  } else if (!response.ok) {
    return thunkApi.rejectWithValue({ errorMessage: "Błąd serwera" });
  }

  const chats = (await response.json()) as MessageDto[];
  return chats;
});

const createMessage = async (dto: MessageSendDto): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token || token === null || token.length < 1)
    return Promise.reject(new Error("Niepoprawny token"));

  const response = await fetch(
    `api/message?chatId=${dto.chatId}&messageContent=${dto.messageContent}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status === 400) {
    const message = (await response.json()) as string;
    return Promise.reject(
      new Error(`${message || "Błąd podczas przetwarzania ządania"}`)
    );
  } else if (response.status === 401) {
    return Promise.reject(new Error("Błąd autoryzacji"));
  } else if (!response.ok) {
    return Promise.reject(new Error("Błąd serwera"));
  }
  return;
};

export const messagesService = {
  fetchMessages,
  createMessage,
};
