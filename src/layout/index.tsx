import Navigation from "./Navigation";
import Menu from "./Menu";
import Content from "./Content";
import Header from "./Header";
import { Layout as AntdLayout } from "antd";
export default function Layout() {
  return (
    <AntdLayout style={{ height: "100vh" }}>
      <AntdLayout style={{ height: 60, lineHeight: '60px' }}>
        <Header></Header>
      </AntdLayout>
      <AntdLayout style={{ height: 'calc(100vh - 60px)' }}>
        <AntdLayout.Sider>
          <Menu />
        </AntdLayout.Sider>
        <AntdLayout style={{ padding: "24px", boxSizing: 'border-box' }}>
          <Navigation />
          <AntdLayout.Content>
            <Content />
          </AntdLayout.Content>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  );
}
