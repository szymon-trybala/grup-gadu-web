import { Result } from "antd";
import React from "react";
import { useAppSelector } from "../../core/store/hooks";

const MessagesListErrorFeedback: React.FC = () => {
  const messagesState = useAppSelector((s) => s.messagesSlice);

  return (
    <Result
      status="500"
      title="Nie udało się pobrać wiadomości"
      subTitle={messagesState.error}
    />
  );
};

export default MessagesListErrorFeedback;
