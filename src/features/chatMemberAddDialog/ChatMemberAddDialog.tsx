import { Form, Input, notification } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { ChatInviteDto, chatsService } from "../../core/api/chatsService";
import { useAppSelector } from "../../core/store/hooks";

interface ChatMemberAddDialogProps {
  visible: boolean;
  onMemberAdded: () => any;
  onDialogCancel: () => any;
}

const ChatMemberAddDialog: React.FC<ChatMemberAddDialogProps> = ({
  visible,
  onMemberAdded,
  onDialogCancel,
}) => {
  const selectedChat = useAppSelector((x) => x.chatsSlice.selectedChat);
  const [form] = Form.useForm<ChatInviteDto>();

  const onSubmit = (data: ChatInviteDto) => {
    if (!selectedChat) return;
    chatsService
      .inviteToChat({
        chatId: selectedChat.id,
        userLogin: data.userLogin,
      })
      .then((chat) => {
        notification.success({
          placement: "bottomRight",
          message: `Dodano do czatu uzytkownika ${data.userLogin}`,
        });
        onMemberAdded();
      })
      .catch((err) => {
        notification.error({
          placement: "bottomRight",
          message: `${err}`,
        });
      });
  };

  return (
    <Modal
      title="Nowe zaproszenie"
      visible={visible}
      onCancel={onDialogCancel}
      destroyOnClose
      okText="Zaproś"
      cancelText="Anuluj"
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();
          onSubmit(values);
        });
      }}
    >
      <Form form={form} onFinish={onSubmit} size="large">
        <Form.Item
          label="Login"
          name="userLogin"
          rules={[
            {
              required: true,
              message: "Musisz uzupełnić to pole",
            },
            {
              min: 6,
              message: "Login musi mieć co najmniej 6 znaków",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChatMemberAddDialog;
