import { Result } from "antd";
import React from "react";

const NotLoggedInFeedback: React.FC = () => {
  return (
    <Result
      status="403"
      title="Nie masz uprawnień do wyświetlania tej części aplikacji"
      subTitle="Najpierw się zaloguj"
    />
  );
};

export default NotLoggedInFeedback;
