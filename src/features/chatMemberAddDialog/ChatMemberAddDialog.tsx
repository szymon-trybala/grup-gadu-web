import { Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { ChatInviteDto } from "../../core/api/chatsService";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import { invoke } from "../../core/store/middlewares/signalr/invoke";

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
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector((x) => x.chatsSlice.selectedChat);
  const [form] = Form.useForm<ChatInviteDto>();

  const onSubmit = (data: ChatInviteDto) => {
    if (!selectedChat) return;
    dispatch(invoke.invite(data.userLogin, selectedChat.id));
    onMemberAdded();
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
