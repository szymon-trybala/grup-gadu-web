import { Button, Form, Input, notification } from "antd";
import React from "react";
import { authService, RegisterDto } from "../../core/api/authService";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AuthContainer, AuthContent, AuthFooter, AuthLayout } from "./styles";
import { useHistory } from "react-router";
import { routes } from "../../core/router/routes";

const Register: React.FC = () => {
  const [form] = Form.useForm<RegisterDto>();
  const history = useHistory();

  const submitButtonLayout = {
    wrapperCol: {
      offset: 11,
    },
  };

  const onSubmit = (data: RegisterDto) => {
    authService
      .register(data)
      .then((user) => {
        notification.success({
          placement: "bottomRight",
          message: `Zarejestrowano się. Witaj, ${user.login}`,
        });
        history.push(routes.chat);
      })
      .catch((err) => {
        notification.error({
          placement: "bottomRight",
          message: `${err}`,
        });
      });
  };

  return (
    <AuthLayout>
      <AuthContainer>
        <AuthContent>
          <Form
            form={form}
            onFinish={onSubmit}
            size="large"
            style={{ backgroundColor: "white" }}
          >
            <Form.Item
              label="Login"
              name="login"
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
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              label="Hasło"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Musisz uzupełnić to pole",
                },
                {
                  min: 6,
                  message: "Hasło musi mieć co najmniej 6 znaków",
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item shouldUpdate {...submitButtonLayout}>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                >
                  Zarejestruj się
                </Button>
              )}
            </Form.Item>
          </Form>
        </AuthContent>
      </AuthContainer>
      <AuthFooter>Grup-Gadu ©2021 Loniek & Treffon & Trybała</AuthFooter>
    </AuthLayout>
  );
};

export default Register;
