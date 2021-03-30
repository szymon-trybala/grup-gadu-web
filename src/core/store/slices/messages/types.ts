import { MessageDto } from "../../../api/messagesService";

export interface MessagesFetchError {
  errorMessage: string;
}

export interface MessagesState {
  messages: MessageDto[];
  promise: "initial" | "pending" | "error" | "fulfilled";
  error: string | undefined;
}
