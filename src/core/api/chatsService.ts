import { createAsyncThunk } from "@reduxjs/toolkit";
import { Chat, ChatsRefreshError } from "../store/slices/chats/types";
import { AppDispatch } from "../store/store";

export interface ChatCreateDto {
  name: string;
}

const fetchChats = createAsyncThunk<
  Chat[],
  string | null,
  {
    dispatch: AppDispatch;
    rejectValue: ChatsRefreshError;
  }
>("chat/get", async (jwt, thunkApi) => {
  if (!jwt || jwt === null)
    return thunkApi.rejectWithValue({ errorMessage: "Brak tokenu" });

  const response = await fetch("api/chat", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
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
    body: JSON.stringify(dto),
  });
  if (response.status === 401) {
    return Promise.reject(new Error("Błąd autoryzacji"));
  } else if (!response.ok) {
    return Promise.reject(new Error("Błąd serwera"));
  }
  const body = (await response.json()) as Chat;
  return body;
};

export const chatsService = {
  fetchChats,
  createChat,
};
