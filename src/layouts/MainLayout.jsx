import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderMenu from "../components/layout/HeaderMenu";
import FooterMenu from "../components/layout/FooterMenu";
import BotaoVoltarInicio from "../components/layout/BotaoVoltarInicio";

const { Content, Footer } = Layout;

export default function MainLayout() {
  return (
    // Adicionamos o background: 'transparent' aqui nesta primeira linha
    <Layout style={{ minHeight: "100vh", background: "transparent" }}>
      <HeaderMenu />

      <Content style={{ padding: "40px 50px" }}>
        <Outlet />
      </Content>

      <FooterMenu />

      <BotaoVoltarInicio />
    </Layout>
  );
}
