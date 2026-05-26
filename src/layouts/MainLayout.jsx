import { Layout, Grid } from "antd";
import { Outlet } from "react-router-dom";
import HeaderMenu from "../components/layout/HeaderMenu";
import FooterMenu from "../components/layout/FooterMenu";
import BotaoVoltarInicio from "../components/layout/BotaoVoltarInicio";

const { Content } = Layout;
const { useBreakpoint } = Grid;

export default function MainLayout() {
  const screens = useBreakpoint();
  const isMobile = !screens.sm;
  
  return (
    <Layout style={{ minHeight: "100vh", background: "transparent" }}>
      <HeaderMenu />

      <Content style={{ padding: isMobile ? "24px 16px" : "40px 50px" }}>
        <Outlet />
      </Content>

      <FooterMenu />

      <BotaoVoltarInicio />
    </Layout>
  );
}