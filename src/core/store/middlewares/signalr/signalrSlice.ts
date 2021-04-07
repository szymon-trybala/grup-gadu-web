import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { withCallbacks, signalMiddleware } from "redux-signalr";
import { ChatDto } from "../../../api/chatsService";
import { MessageDto } from "../../../api/messagesService";
import { addChat, newMessageInChat } from "../../slices/chats/chatsSlice";
import { addMessage } from "../../slices/messages/messagesSlice";
import { invoke } from "./invoke";

export const connection = new HubConnectionBuilder()
  .withUrl(`http://localhost:5000/hubs/chat`, {
    accessTokenFactory: () => {
      const token = localStorage.getItem("token");
      return token || "";
    },
  })
  .withAutomaticReconnect()
  .configureLogging(LogLevel.Information)
  .build();

const globalCallbacks = withCallbacks()
  .add("newMessage", (msg: MessageDto) => (dispatch) => {
    dispatch(addMessage(msg));
    dispatch(invoke.readAllMessages(msg.chatId));
  })
  .add("newUnread", (chatId: number) => (dispatch) => {
    dispatch(newMessageInChat(chatId));
  })
  .add("joinedToNewChat", (chat: ChatDto) => (dispatch) => {
    dispatch(addChat(chat));
  });

export const signal = signalMiddleware({
  callbacks: globalCallbacks,
  connection,
  shouldConnectionStartImmediately: false,
});
