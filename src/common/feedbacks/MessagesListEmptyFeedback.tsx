import { Result } from "antd";
import React from "react";

const MessagesListEmptyFeedback: React.FC = () => {
  return (
    <Result status="404" title="Pusto tu" subTitle="Napisz jakąś wiadomość!" />
  );
};

export default MessagesListEmptyFeedback;
