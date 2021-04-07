import { alert } from "../../../../common/alerts/alerts";
import { chatsService } from "../../../api/chatsService";
import { SignalrAction } from "../../store";

const joinChat = (chatId: number): SignalrAction => (
  _dispatch,
  _getState,
  invoke
) => {
  invoke("join", chatId).catch((error) => {
    console.error(error);
  });
};

const leaveChat = (chatId: number): SignalrAction => (
  _dispatch,
  _getState,
  invoke
) => {
  invoke("leave", chatId).catch((error) => {
    console.error(error);
  });
};

const sendMessage = (chatId: number, message: string): SignalrAction => (
  _dispatch,
  _getState,
  invoke
) => {
  invoke("send", chatId, message).catch((error) => {
    console.error(error);
    alert.error("Nie udało się wysłać wiadomości");
  });
};

const readAllMessages = (chatId: number): SignalrAction => (
  _dispatch,
  _getState,
  invoke
) => {
  invoke("readAllMessages", chatId).catch((error) => {
    console.error(error);
  });
};

const invite = (userLogin: string, chatId: number): SignalrAction => (
  dispatch,
  _getState,
  invoke
) => {
  invoke("invite", userLogin, chatId)
    .then(() => {
      dispatch(chatsService.fetchChats());
    })
    .catch((error) => {
      console.error(error);
      alert.error("Nie udało się zaprosić uzytkownika");
    });
};

export const invoke = {
  joinChat,
  leaveChat,
  sendMessage,
  readAllMessages,
  invite,
};
