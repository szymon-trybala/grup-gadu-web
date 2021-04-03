import { Form, Input, notification } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { ChatCreateDto, chatsService } from "../../core/api/chatsService";

interface ChatAddDialogProps {
  visible: boolean;
  onChatAdded: () => any;
  onDialogCancel: () => any;
}

const ChatAddDialog: React.FC<ChatAddDialogProps> = ({
  visible,
  onChatAdded,
  onDialogCancel,
  children
}) => {
  const [form] = Form.useForm<ChatCreateDto>();

  const onSubmit = (data: ChatCreateDto) => {
    chatsService
      .createChat(data)
      .then((chat) => {
        notification.success({
          placement: "bottomRight",
          message: "Utworzono nowy czat",
        });
        onChatAdded();
      })
      .catch((err) => {
        notification.error({
          placement: "bottomRight",
          message: `${err}`,
        });
      });
  };

  return (
    <>
    {children}
    <Modal
      title="Nowy czat"
      visible={visible}
      onCancel={onDialogCancel}
      destroyOnClose
      okText="Utwórz czat"
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
          label="Nazwa"
          name="name"
          rules={[
            {
              required: true,
              message: "Musisz uzupełnić to pole",
            },
            {
              min: 4,
              message: "Nazwa czatu musi mieć co najmniej 4 znaki",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
    </>
   
  );
};

export default ChatAddDialog;
