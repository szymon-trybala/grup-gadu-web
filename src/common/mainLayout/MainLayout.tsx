import { Avatar, Badge, Layout, Menu } from "antd";
import React from "react";
import {
  ContentContainer,
  HamburgerSider,
  SiteContent,
  SiteFooter,
  SiteLayout,
  SiteLogo,
} from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../core/store/rootReducer";

const MainLayout: React.FC = ({ children }) => {
  const groups = useSelector((state: RootState) => state.groupsSlice);

  return (
    <SiteLayout>
      <HamburgerSider>
        <SiteLogo />
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          {groups.map((g) => (
            <Menu.Item
              key={g.id}
              icon={
                <Badge count={g.unread} size="small">
                  <Avatar size={27}>{g.name.slice(0, 1)}</Avatar>
                </Badge>
              }
            >
              {g.name}
            </Menu.Item>
          ))}
        </Menu>
      </HamburgerSider>
      <Layout>
        <ContentContainer>
          <SiteContent>{children}</SiteContent>
        </ContentContainer>
        <SiteFooter>Grup-Gadu ©2021 Loniek & Treffon & Trybała</SiteFooter>
      </Layout>
    </SiteLayout>
  );
};

export default MainLayout;
