import { Input } from "antd";
import Search from "antd/lib/input/Search";
import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import { invoke } from "../../core/store/middlewares/signalr/invoke";

const MessageInput: React.FC = () => {
  const authState = useAppSelector((x) => x.authSlice);
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector((x) => x.chatsSlice.selectedChat);
  const searchInputRef = useRef<Input | null>();

  const onSubmit = async (message: string) => {
    if (!message || !selectedChat?.id || !authState.user?.id) return;
    dispatch(
      invoke.sendMessage(selectedChat.id, message)
    );
    searchInputRef.current?.setValue("");
  };

  return (
    <Search
      ref={(el) => (searchInputRef.current = el)}
      placeholder="Wpisz wiadomość..."
      allowClear
      enterButton="Wyślij"
      onSearch={onSubmit}
      style={{ alignSelf: "flex-end" }}
    />
  );
};

export default MessageInput;
