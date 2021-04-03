import { UserOutlined } from "@ant-design/icons";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Avatar, Comment, notification, Tooltip } from "antd";
import Search from "antd/lib/input/Search";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import MessagesListEmptyFeedback from "../../common/feedbacks/MessagesListEmptyFeedback";
import MessagesListErrorFeedback from "../../common/feedbacks/MessagesListErrorFeedback";
import MainLayout from "../../common/mainLayout/MainLayout";
import LoadingMessagesSkeleton from "../../common/skeletons/LoadingMessagesSkeleton";
import { MessageDto, messagesService } from "../../core/api/messagesService";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import { addMessage } from "../../core/store/slices/messages/messagesSlice";

const Messages: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector((x) => x.chatsSlice.selectedChat);
  const messagesState = useAppSelector((s) => s.messagesSlice);
  const authState = useAppSelector((x) => x.authSlice);

  const [connection, setConnection] = useState<HubConnection>();

  useEffect(() => {
    if (!selectedChat) return;
    dispatch(messagesService.fetchMessages({ chatId: selectedChat.id })).then(
      () => {
        dummy.current?.scrollIntoView({ behavior: "smooth" });
      }
    );
  }, [selectedChat, dispatch]);

  useEffect(() => {
    const createHubConnection = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/hubs/chat")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();
      setConnection(newConnection);
      try {
        await newConnection.start();
        newConnection.invoke("join", selectedChat?.id);
      } catch (err) {
        notification.error({
          message: "Nie udało się dołączyć do czatu na zywo",
        });
        console.log(err);
      }
      setConnection(newConnection);
    };
    if (selectedChat?.id) createHubConnection();

    return () => {
      if (connection && selectedChat?.id)
        connection
          ?.invoke("leave", selectedChat.id)
          .then(() => connection.stop());
    };
  }, [selectedChat]);

  useEffect(() => {
    connection?.on("newMessage", (message: MessageDto) => {
      dispatch(addMessage(message));
      dummy.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [connection, dispatch]);

  const onSubmit = async (message: string) => {
    if (!connection || !message || !selectedChat?.id || !authState.user?.id)
      return;
    await connection.invoke(
      "send",
      Number(authState.user.id),
      selectedChat.id,
      message
    );
  };

  const dummy = useRef<HTMLDivElement | null>();

  return (
    <MainLayout>
      <div
        style={{
          minHeight: "100%",
          display: "grid",
          gridTemplateRows: "1fr auto",
        }}
      >
        <div style={{ overflow: "auto", height: "calc(100vh - 250px)" }}>
          {messagesState.promise === "pending" && <LoadingMessagesSkeleton />}
          {messagesState.promise === "error" && <MessagesListErrorFeedback />}
          {messagesState.promise === "fulfilled" &&
            messagesState.messages.length === 0 && (
              <MessagesListEmptyFeedback />
            )}
          {messagesState.promise === "fulfilled" &&
            messagesState.messages.length > 0 &&
            messagesState.messages.map((x) => (
              <Comment
                key={x.id}
                author={x.authorLogin}
                avatar={<Avatar alt={x.authorLogin} icon={<UserOutlined />} />}
                content={<p>{x.content}</p>}
                datetime={
                  <Tooltip title={moment().format("DD-MM-YYYY HH:mm:ss")}>
                    <span>{moment().fromNow()}</span>
                  </Tooltip>
                }
              />
            ))}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              dummy.current = el;
            }}
          />
        </div>

        <Search
          placeholder="Wpisz wiadomość..."
          allowClear
          enterButton="Wyślij"
          onSearch={onSubmit}
          style={{ alignSelf: "flex-end" }}
        />
      </div>
    </MainLayout>
  );
};

export default Messages;
