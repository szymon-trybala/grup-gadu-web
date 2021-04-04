import { Result } from "antd";
import React from "react";

const MessagesListChatNotSelectedFeedback: React.FC = () => {
  return (
    <Result
      status="404"
      title="Pusto tu"
      subTitle="Utwórz czat aby kontynuować"
    />
  );
};

export default MessagesListChatNotSelectedFeedback;
