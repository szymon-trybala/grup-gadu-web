import { Avatar, Badge, Layout, Menu } from "antd";
import React, { useEffect } from "react";
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
import NavBar from "./NavBar";
import { setSelected } from "../../core/store/slices/chats/chatsSlice";
import LoadingChatSkeleton from "../skeletons/LoadingChatsSkeleton";
import { alert } from "../alerts/alerts";

const MainLayout: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const chatsState = useAppSelector((s) => s.chatsSlice);

  useEffect(() => {
    dispatch(chatsService.fetchChats());
  }, [dispatch]);

  useEffect(() => {
    if (chatsState.promise === "error" && chatsState.error) {
      alert.error(`Nie udało się pobrać listy czatów: ${chatsState.error}`);
    }
  }, [chatsState.promise, chatsState.error]);

  const handleChangeSelectedChat = (chatId: number) => {
    dispatch(setSelected(chatId));
  };

  return (
    <SiteLayout>
      <HamburgerSider>
        <SiteLogo />
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[chatsState.selectedChat?.id.toString() || "0"]}
        >
          {chatsState.promise === "pending" && (
            <>
              <Menu.Item>
                <LoadingChatSkeleton />
              </Menu.Item>
              <Menu.Item>
                <LoadingChatSkeleton />
              </Menu.Item>
              <Menu.Item>
                <LoadingChatSkeleton />
              </Menu.Item>
              <Menu.Item>
                <LoadingChatSkeleton />
              </Menu.Item>
            </>
          )}
          {chatsState.promise === "fulfilled" &&
            chatsState.chats.map((chat) => (
              <Menu.Item
                onClick={() => handleChangeSelectedChat(chat.id)}
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
        <NavBar />
        <ContentContainer>
          <SiteContent>{children}</SiteContent>
        </ContentContainer>
        <SiteFooter>Grup-Gadu ©2021 Loniek & Treffon & Trybała</SiteFooter>
      </Layout>
    </SiteLayout>
  );
};

export default MainLayout;
