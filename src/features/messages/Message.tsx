import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip, Comment } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { MessageDto, messagesService } from "../../core/api/messagesService";
import { useAppSelector } from "../../core/store/hooks";
import { alert } from "../../common/alerts/alerts";

interface MessageProps {
  message: MessageDto;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const selectedChat = useAppSelector((s) => s.chatsSlice.selectedChat);
  const [seenBy, setSeenBy] = useState<string | undefined>();

  const handleMessageClick = () => {
    if (seenBy) {
      setSeenBy(undefined);
      return;
    }

    if (!selectedChat) return;
    messagesService
      .details({
        chatId: selectedChat.id,
        messageId: message.id,
      })
      .then((details) => {
        let results: string = "Wyświetlili: ";
        details.forEach((x) => (results += `${x.login}, `));
        details.length > 0 && setSeenBy(results.trim().slice(0, -1));
      })
      .catch((err) => {
        alert.error(`${err}`);
      });
  };

  return (
    <div onClick={handleMessageClick} style={{ cursor: "pointer" }}>
      <Comment
        actions={seenBy ? [<span key="seenBy">{seenBy}</span>] : undefined}
        key={message.id}
        author={message.authorLogin}
        avatar={<Avatar alt={message.authorLogin} icon={<UserOutlined />} />}
        content={<p>{message.content}</p>}
        datetime={
          <Tooltip
            title={moment(message.createdAt).format("DD-MM-YYYY HH:mm:ss")}
          >
            <span>{moment(message.createdAt).fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  );
};

export default Message;
