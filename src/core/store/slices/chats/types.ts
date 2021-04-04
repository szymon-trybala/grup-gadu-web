import { ChatDto } from "../../../api/chatsService";

export interface ChatsRefreshError {
  errorMessage: string;
}

export interface ChatsState {
  chats: ChatDto[];
  selectedChat: ChatDto | undefined;
  promise: "initial" | "pending" | "error" | "fulfilled";
  error: string | undefined;
}
