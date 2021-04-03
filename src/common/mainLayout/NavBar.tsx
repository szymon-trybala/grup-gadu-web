import {
  UsergroupAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { chatsService } from "../../core/api/chatsService";
import { routes } from "../../core/router/routes";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import { clearUser } from "../../core/store/slices/auth/authSlice";
import ChatAddDialog from "../../features/chatAddDialog/ChatAddDialog";
import ChatSettingsDrawer from "../../features/chatSettingsDrawer/ChatSettingsDrawer";
import { SiteHeader } from "./styles";

const NavBar: React.FC = () => {
  const selectedChat = useAppSelector((s) => s.chatsSlice.selectedChat);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleNewChat = () => {
    dispatch(chatsService.fetchChats());
    toggleModal();
  };

  const logout = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    history.push(routes.login);
  };

  return (
    <SiteHeader>
      <Row>
        <Col flex="auto">
          {selectedChat && (
            <>
              <Button
                type="link"
                icon={
                  drawerVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                }
                onClick={toggleDrawer}
              >
                Ustawienia czatu
              </Button>
              <ChatSettingsDrawer
                visible={drawerVisible}
                onModalClose={toggleDrawer}
              />
            </>
          )}

          <Button
            type="link"
            icon={<UsergroupAddOutlined />}
            onClick={toggleModal}
          >
            Nowy czat
          </Button>

          <ChatAddDialog
            visible={modalVisible}
            onChatAdded={handleNewChat}
            onDialogCancel={toggleModal}
          />
        </Col>
        <Col flex="50px">
          <Button type="link" icon={<LogoutOutlined />} onClick={logout}>
            Wyloguj
          </Button>
        </Col>
      </Row>
    </SiteHeader>
  );
};

export default NavBar;
