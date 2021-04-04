import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip, Comment } from "antd";
import moment from "moment";
import React from "react";
import { MessageDto } from "../../core/api/messagesService";

interface MessageProps {
  message: MessageDto;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <Comment
      key={message.id}
      author={message.authorLogin}
      avatar={<Avatar alt={message.authorLogin} icon={<UserOutlined />} />}
      content={<p>{message.content}</p>}
      datetime={
        <Tooltip title={moment().format("DD-MM-YYYY HH:mm:ss")}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default Message;
