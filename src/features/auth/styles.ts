import { Layout } from "antd";
import styled from "styled-components";

export const AuthLayout = styled(Layout)`
  height: 100vh;
`;

export const AuthContainer = styled(Layout.Content)`
  margin: 128px 128px 0;
  height: 100%;
`;

export const AuthContent = styled.div`
  background: rgba(255, 255, 255);
  margin: 8px;
  padding: 48px 64px 16px;
`;

export const AuthFooter = styled(Layout.Footer)`
  margin: 0;
  text-align: center;
`;

export const AuthRegisterInfo = styled.p`
  text-align: center;
`;