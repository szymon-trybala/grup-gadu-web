import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { withCallbacks, signalMiddleware } from "redux-signalr";
import { MessageDto } from "../../../api/messagesService";
import { addMessage } from "../../slices/messages/messagesSlice";

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5000/hubs/chat")
  .withAutomaticReconnect()
  .configureLogging(LogLevel.Information)
  .build();

const globalCallbacks = withCallbacks().add(
  "newMessage",
  (msg: MessageDto) => (dispatch) => {
    dispatch(addMessage(msg));
  }
);

export const signal = signalMiddleware({
  callbacks: globalCallbacks,
  connection,
});
