import { alert } from "../../../../common/alerts/alerts";
import { SignalrAction } from "../../store";

const joinChat = (chatId: number): SignalrAction => (
  _dispatch,
  _getState,
  invoke
) => {
  invoke("join", chatId).catch((error) => {
    console.error(error);
    alert.error("Nie udało się dołączyć do czatu");
  });
};

const leaveChat = (chatId: number): SignalrAction => (
  _dispatch,
  _getState,
  invoke
) => {
  invoke("leave", chatId).catch((error) => {
    console.error(error);
    alert.error("Nie udało się rozłączyć z czatem");
  });
};

const sendMessage = (
  userId: number,
  chatId: number,
  message: string
): SignalrAction => (_dispatch, _getState, invoke) => {
  invoke("send", userId, chatId, message).catch((error) => {
    console.error(error);
    alert.error("Nie udało się wysłać wiadomości");
  });
};

export const invoke = {
  joinChat,
  leaveChat,
  sendMessage,
};
