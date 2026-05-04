import { Layout, Menu } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";

const { Header, Content, Footer } = Layout;

export default function MainLayout() {
  const location = useLocation();

  const menuItems = [{ key: "/", label: <Link to="/">Top 50</Link> }];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{ display: "flex", alignItems: "center", background: "#171a21" }}
      >
        <div
          style={{
            background: "#f5c518",
            color: "#000",
            padding: "2px 8px",
            borderRadius: "4px",
            fontWeight: "900",
            fontSize: "20px",
            marginRight: "32px",
            letterSpacing: "-0.5px",
          }}
        >
          IGDb
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1, background: "transparent" }}
        />
      </Header>

      <Content style={{ padding: "40px 50px" }}>
        <Outlet />
      </Content>

      <Footer
        style={{ textAlign: "center", background: "#171a21", color: "#66c0f4" }}
      >
        IGDb ©{new Date().getFullYear()} - Catálogo de Jogos (Projeto SPODWE2)
      </Footer>
    </Layout>
  );
}
