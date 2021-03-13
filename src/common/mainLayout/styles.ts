import { Layout } from "antd";
import styled from "styled-components";

export const SiteLayout = styled(Layout)`
  height: 100vh;
`;

export const HamburgerSider = styled(Layout.Sider).attrs({
  breakpoint: "lg",
  theme: "light",
  collapsedWidth: "0",
  trigger: null,
})``;

export const SiteLogo = styled.div`
  height: 32px;
  background: rgba(24, 144, 255, 0.6);
  margin: 16px;
`;

export const SiteHeader = styled(Layout.Header)`
  padding: 0;
  background: #fff;
`;

export const ContentContainer = styled(Layout.Content)`
  margin: 16px 16px 0;
  height: 100%;
`;

export const SiteContent = styled.div`
  height: 100%;
  background: rgba(255, 255, 255);
  margin: 8px;
  padding: 24px;
  min-height: 360px;
`;

export const SiteFooter = styled(Layout.Footer)`
  text-align: center;
  margin: 0;
`;
