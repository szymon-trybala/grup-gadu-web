import {
  UsergroupAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import { chatsService } from "../../core/api/chatsService";
import { useAppDispatch } from "../../core/store/hooks";
import ChatAddDialog from "../../features/chatAddDialog/ChatAddDialog";
import ChatSettingsDrawer from "../../features/chatSettingsDrawer/ChatSettingsDrawer";
import { SiteHeader } from "./styles";

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();
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

  return (
    <SiteHeader>
      <Row>
        <Col flex="200px">
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
        <Col flex="auto"></Col>
        <Col flex="50px">
          <Button
            type="link"
            icon={drawerVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleDrawer}
          ></Button>
          <ChatSettingsDrawer
            visible={drawerVisible}
            onModalClose={toggleDrawer}
          />
        </Col>
      </Row>
    </SiteHeader>
  );
};

export default NavBar;
