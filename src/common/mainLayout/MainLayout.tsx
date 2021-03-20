import { Avatar, Badge, Layout, Menu, notification, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  ContentContainer,
  HamburgerSider,
  SiteContent,
  SiteFooter,
  SiteLayout,
  SiteLogo,
} from "./styles";
import { chatsService } from "../../core/api/chatsService";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import ChatAddDialog from "../../features/chatAddDialog/ChatAddDialog";
import { UsergroupAddOutlined } from "@ant-design/icons";

const MainLayout: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const chatsState = useAppSelector((s) => s.chatsSlice);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(chatsService.fetchChats(token));
  }, []);

  useEffect(() => {
    if (chatsState.promise === "error" && chatsState.error) {
      notification.error({
        message: `Nie udało się pobrać listy czatów: ${chatsState.error}`,
      });
    }
  }, [chatsState.promise, chatsState.error]);

  const handleNewChat = () => {
    dispatch(chatsService.fetchChats(token));
    toggleModal();
  };

  return (
    <SiteLayout>
      <HamburgerSider>
        <SiteLogo />
        <Menu theme="light" mode="inline">
          <Menu.Item key="addChat" icon={<UsergroupAddOutlined />}>
            <span onClick={() => toggleModal()}>Dodaj czat</span>
            <ChatAddDialog
              visible={modalVisible}
              onChatAdded={handleNewChat}
              onDialogCancel={() => toggleModal()}
            />
          </Menu.Item>
          {chatsState.promise === "pending" && (
            <Menu.Item key="loading">
              <Spin />
            </Menu.Item>
          )}
          {chatsState.promise === "fulfilled" &&
            chatsState.chats.length > 0 &&
            chatsState.chats.map((chat) => (
              <Menu.Item
                key={chat.id}
                icon={
                  <Badge count={0} size="small">
                    <Avatar size={27}>{chat.name.slice(0, 1)}</Avatar>
                  </Badge>
                }
              >
                {chat.name}
              </Menu.Item>
            ))}
        </Menu>
      </HamburgerSider>
      <Layout>
        <ContentContainer>
          <SiteContent>{children}</SiteContent>
        </ContentContainer>
        <SiteFooter>Grup-Gadu ©2021 Loniek & Treffon & Trybała</SiteFooter>
      </Layout>
    </SiteLayout>
  );
};

export default MainLayout;
