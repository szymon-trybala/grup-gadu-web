import { createAsyncThunk } from "@reduxjs/toolkit";
import { Chat, ChatsRefreshError } from "../store/slices/chats/types";
import { AppDispatch } from "../store/store";

export interface ChatCreateDto {
  name: string;
}

export interface ChatLeaveDto {
  chatId: number;
}

export interface ChatInviteDto {
  userLogin: string;
  chatId: number;
}

const fetchChats = createAsyncThunk<
  Chat[],
  undefined,
  {
    dispatch: AppDispatch;
    rejectValue: ChatsRefreshError;
  }
>("chat/get", async (_, thunkApi) => {
  const token = localStorage.getItem("token");
  if (!token || token === null || token.length < 1)
    return thunkApi.rejectWithValue({ errorMessage: "Brak tokenu" });

  const response = await fetch("api/chat", {
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

  const chats = (await response.json()) as Chat[];
  return chats;
});

const createChat = async (dto: ChatCreateDto): Promise<Chat> => {
  const token = localStorage.getItem("token");
  if (!token || token === null || token.length < 1)
    return Promise.reject(new Error("Niepoprawny token"));

  const response = await fetch(`api/chat/create?name=${dto.name}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
    return Promise.reject(new Error("Błąd autoryzacji"));
  } else if (!response.ok) {
    return Promise.reject(new Error("Błąd serwera"));
  }
  const body = (await response.json()) as Chat;
  return body;
};

const leaveChat = async (dto: ChatLeaveDto): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token || token === null || token.length < 1)
    return Promise.reject(new Error("Niepoprawny token"));

  const response = await fetch(`api/chat/leave?chatId=${dto.chatId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
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

const inviteToChat = async (dto: ChatInviteDto): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token || token === null || token.length < 1)
    return Promise.reject(new Error("Niepoprawny token"));

  const response = await fetch(
    `api/chat/invite?userLogin=${dto.userLogin}&chatId=${dto.chatId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status === 404) {
    const message = (await response.json()) as string;
    return Promise.reject(new Error(message || response.statusText));
  }
  if (response.status === 401) {
    return Promise.reject(new Error("Błąd autoryzacji"));
  } else if (!response.ok) {
    return Promise.reject(new Error("Błąd serwera"));
  }
  return;
};

export const chatsService = {
  fetchChats,
  createChat,
  leaveChat,
  inviteToChat,
};
