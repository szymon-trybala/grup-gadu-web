import {
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { withCallbacks, signalMiddleware } from "redux-signalr";
import { ChatDto } from "../../../api/chatsService";
import { MessageDto } from "../../../api/messagesService";
import { addChat, newMessageInChat } from "../../slices/chats/chatsSlice";
import { addMessage } from "../../slices/messages/messagesSlice";
import { invoke } from "./invoke";
import { alert } from "../../../../common/alerts/alerts";

export const connection = new HubConnectionBuilder()
  .withUrl(`http://localhost:5000/hubs/chat`, {
    accessTokenFactory: () => localStorage.getItem("token") || "",
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

export const connectToHub = () => {
  const token = localStorage.getItem("token");
  if (token) {
    tryDisconnectFromHub().then(() => {
      connection
        .start()
        .then(() => {
          console.log("Started connection via SignalR");
        })
        .catch((err) => {
          console.error(err);
          alert.error("Nie udało się nawiązać połączenia z serwerem");
        });
    });
  }
};

export const tryDisconnectFromHub = (): Promise<void> => {
  if (connection.state !== HubConnectionState.Disconnected) {
    return connection
      .stop()
      .then(() => {
        console.log("Disconnected from signalr hub");
      })
      .catch((err) => {
        console.error(err);
        alert.error("Nie udało się rozłączyć z serwerem");
      });
  } else return Promise.resolve();
};
