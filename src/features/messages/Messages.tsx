import React, { useEffect, useRef } from "react";
import MessagesListChatNotSelectedFeedback from "../../common/feedbacks/MessagesListChatNotSelectedFeedback";
import MessagesListEmptyFeedback from "../../common/feedbacks/MessagesListEmptyFeedback";
import MessagesListErrorFeedback from "../../common/feedbacks/MessagesListErrorFeedback";
import MainLayout from "../../common/mainLayout/MainLayout";
import Restrict from "../../common/security/Restrict";
import LoadingMessagesSkeleton from "../../common/skeletons/LoadingMessagesSkeleton";
import { messagesService } from "../../core/api/messagesService";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import { invoke } from "../../core/store/middlewares/signalr/invoke";
import Message from "./Message";
import MessageInput from "./MessageInput";
import {
  MessagesContainer,
  MessagesListEnd,
  MessagesScrollableList,
} from "./styles";

const Messages: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector((x) => x.chatsSlice.selectedChat);
  const messagesState = useAppSelector((s) => s.messagesSlice);
  const messagesListEnd = useRef<HTMLDivElement | null>();

  useEffect(() => {
    if (!selectedChat) return;
    dispatch(invoke.joinChat(selectedChat.id));
    return () => {
      dispatch(invoke.leaveChat(selectedChat.id));
    };
  }, [selectedChat, dispatch]);

  useEffect(() => {
    messagesListEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesState.messages]);

  useEffect(() => {
    if (!selectedChat) return;
    dispatch(messagesService.fetchMessages({ chatId: selectedChat.id })).then(
      () => {
        dispatch(invoke.readAllMessages(selectedChat.id));
      }
    );
  }, [selectedChat, dispatch]);

  return (
    <Restrict>
      <MainLayout>
        {selectedChat ? (
          <MessagesContainer>
            <MessagesScrollableList>
              {messagesState.promise === "pending" && (
                <LoadingMessagesSkeleton />
              )}
              {messagesState.promise === "error" && (
                <MessagesListErrorFeedback />
              )}
              {messagesState.promise === "fulfilled" &&
                messagesState.messages.length === 0 && (
                  <MessagesListEmptyFeedback />
                )}
              {messagesState.promise === "fulfilled" &&
                messagesState.messages.length > 0 &&
                messagesState.messages.map((x) => <Message message={x} />)}
              <MessagesListEnd
                ref={(el) => {
                  messagesListEnd.current = el;
                }}
              />
            </MessagesScrollableList>
            <MessageInput />
          </MessagesContainer>
        ) : (
          <MessagesListChatNotSelectedFeedback />
        )}
      </MainLayout>
    </Restrict>
  );
};

export default Messages;
