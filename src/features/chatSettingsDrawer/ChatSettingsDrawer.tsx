import React, { useState } from "react";
import {
  Button,
  Drawer,
  Empty,
  List,
  notification,
  Space,
  Spin,
  Typography,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import { chatsService } from "../../core/api/chatsService";
import ChatMemberAddDialog from "../chatMemberAddDialog/ChatMemberAddDialog";

interface ChatSettingsDrawerProps {
  visible: boolean;
  onModalClose: () => any;
}

const ChatSettingsDrawer: React.FC<ChatSettingsDrawerProps> = ({
  visible,
  onModalClose,
}) => {
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector((x) => x.chatsSlice.selectedChat);
  const userLogin = useAppSelector((x) => x.authSlice.login);
  const [chatInviteVisible, setChatInviteVisible] = useState(false);
  const toggleChatInviteVisible = () => {
    setChatInviteVisible(!chatInviteVisible);
  };

  const handleLeaveChat = () => {
    const chatName = selectedChat?.name;

    if (!selectedChat?.id) return;
    chatsService
      .leaveChat({
        chatId: selectedChat.id,
      })
      .then(() => {
        notification.success({
          message: `Opuściłeś grupę ${chatName || ""}`,
          placement: "bottomRight",
        });
        dispatch(chatsService.fetchChats());
        onModalClose();
      })
      .catch((err) => {
        notification.error({
          placement: "bottomRight",
          message: `${err}`,
        });
      });
  };

  const handleNewChatMember = () => {
    dispatch(chatsService.fetchChats());
    toggleChatInviteVisible();
  };

  return (
    <Drawer
      title={
        <>
          <Typography.Title level={3}>
            Czat: {selectedChat?.name || ""}
          </Typography.Title>
          <Typography.Title level={5}>
            Właściciel: {selectedChat?.owner.login}{" "}
            {selectedChat?.owner.login === userLogin && "(Ty!)"}
          </Typography.Title>
        </>
      }
      placement="right"
      visible={visible}
      onClose={onModalClose}
      destroyOnClose
      footer={
        <Space direction="horizontal" size={40}>
          <Button onClick={handleLeaveChat} danger>
            Opuść czat
          </Button>
          <div>
            <Button onClick={toggleChatInviteVisible} type="primary">
              Zaproś
            </Button>
            <ChatMemberAddDialog
              visible={chatInviteVisible}
              onDialogCancel={toggleChatInviteVisible}
              onMemberAdded={handleNewChatMember}
            />
          </div>
        </Space>
      }
    >
      {selectedChat ? (
        <div>
          <Typography.Title level={5}>
            Członkowie: {selectedChat.members.length || 0}
          </Typography.Title>

          {selectedChat?.members.length > 0 ? (
            <List
              dataSource={selectedChat.members}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text>{item.login}</Typography.Text>
                </List.Item>
              )}
            ></List>
          ) : (
            <Empty description={<span>Samotny? Dodaj kogoś!</span>} />
          )}
        </div>
      ) : (
        <Spin />
      )}
    </Drawer>
  );
};

export default ChatSettingsDrawer;
