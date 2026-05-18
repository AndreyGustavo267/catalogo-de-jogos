import { useState } from "react";
import {
  Layout,
  Input,
  Drawer,
  Row,
  Col,
  Typography,
  Space,
  Button,
} from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  TrophyOutlined,
  AppstoreOutlined,
  DesktopOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

export default function HeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  // Textos maiores e com a nova fonte
  const linkStyle = {
    color: "#c7d5e0",
    display: "block",
    marginBottom: "16px",
    fontSize: "18px",
    fontWeight: "600",
  };

  const colTitleStyle = {
    color: "#fff",
    marginTop: 0,
    marginBottom: "24px",
    fontSize: "28px",
    fontWeight: "800",
  };

  // Container para centralizar o conteúdo do menu expandido
  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  };

  return (
    <>
      {/* BARRA SUPERIOR MINIMIZADA */}
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#171a21",
          padding: "0 50px",
          height: "80px",
        }}
      >
        {/* BLOCO ESQUERDO: Logo e Menu */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          <Space
            size="large"
            style={{ display: "flex", flex: 1, justifyContent: "center" }}
          >
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/src/assets/images/logo.png"
                alt="IGDb Logo"
                style={{
                  height: "45px",
                  borderRadius: "4px",
                  display: "block",
                }}
              />
            </Link>
            <div
              onClick={showMenu}
              style={{
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "18px",
                fontWeight: "800",
              }}
            >
              <MenuOutlined style={{ fontSize: "22px" }} />
              Menu
            </div>
          </Space>
        </div>

        {/* BLOCO CENTRAL: Barra de Pesquisa */}
        <div
          style={{
            flex: 2,
            display: "flex",
            justifyContent: "center",
            maxWidth: "1000px",
            padding: "0 24px",
          }}
        >
          <Input.Search
            placeholder="Pesquisar jogos, categorias, plataformas..."
            enterButton
            size="large"
            style={{ width: "100%" }}
          />
        </div>

        {/* BLOCO DIREITO: Minhas Avaliações e Botão de Login */}
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <Link
            to="/minhas-avaliacoes"
            style={{
              color: "#fff",
              fontWeight: "800",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <StarOutlined style={{ fontSize: "20px", color: "#f5c518" }} />
            Minhas avaliações
          </Link>

          <Link to="/login">
            <Button
              type="primary"
              style={{
                background: "#66c0f4",
                color: "#0a141d",
                border: "none",
                borderRadius: "24px",
                fontWeight: "800",
                padding: "0 24px",
                height: "40px",
                fontSize: "15px",
              }}
            >
              Faça Login
            </Button>
          </Link>
        </div>
      </Header>

      {/* MENU EXPANDIDO */}
      <Drawer
        placement="top"
        closable={false}
        onClose={closeMenu}
        open={isMenuOpen}
        height="60vh"
        styles={{
          body: { background: "#1b2838", padding: "0" },
        }}
      >
        {/* Cabeçalho do Menu Expandido */}
        <div
          style={{ padding: "30px 40px", borderBottom: "1px solid #2a475e" }}
        >
          <div
            style={{
              ...containerStyle,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src="/src/assets/images/logo.png"
              alt="IGDb Logo"
              style={{ height: "60px", borderRadius: "6px" }}
            />
            {/* Botão de Fechar Maior */}
            <Button
              shape="circle"
              icon={<CloseOutlined style={{ fontSize: "20px" }} />}
              onClick={closeMenu}
              style={{
                background: "#66c0f4",
                color: "#000",
                border: "none",
                width: "50px",
                height: "50px",
              }}
            />
          </div>
        </div>

        {/* Conteúdo das Colunas */}
        <div style={{ padding: "60px 40px" }}>
          <div style={containerStyle}>
            <Row gutter={[64, 48]} justify="start">
              <Col xs={24} md={8}>
                <Title level={3} style={colTitleStyle}>
                  <TrophyOutlined
                    style={{ color: "#66c0f4", marginRight: "12px" }}
                  />
                  Jogos
                </Title>
                <Link to="/jogos" onClick={closeMenu} style={linkStyle}>
                  Top 50 Melhores Jogos
                </Link>
                <Link to="/" style={linkStyle} onClick={closeMenu}>
                  Top 10 Gratuitos
                </Link>
                <Link to="/" style={linkStyle} onClick={closeMenu}>
                  Top 10 Pagos
                </Link>
              </Col>

              <Col xs={24} md={8}>
                <Title level={3} style={colTitleStyle}>
                  <AppstoreOutlined
                    style={{ color: "#66c0f4", marginRight: "12px" }}
                  />
                  Categorias
                </Title>
                <Link to="/" style={linkStyle} onClick={closeMenu}>
                  Ação e Aventura
                </Link>
                <Link to="/" style={linkStyle} onClick={closeMenu}>
                  RPG
                </Link>
                <Link to="/" style={linkStyle} onClick={closeMenu}>
                  Sobrevivência
                </Link>
                <Link to="/" style={linkStyle} onClick={closeMenu}>
                  Mundo Aberto
                </Link>
                <Link to="/" style={linkStyle} onClick={closeMenu}>
                  Indie
                </Link>
              </Col>

              <Col xs={24} md={8}>
                <Title level={3} style={colTitleStyle}>
                  <DesktopOutlined
                    style={{ color: "#66c0f4", marginRight: "12px" }}
                  />
                  Plataformas
                </Title>
                <Link to="/" style={linkStyle} onClick={closeMenu}>
                  PC (Windows)
                </Link>
                <Link to="/" style={linkStyle} onClick={closeMenu}>
                  PlayStation 5
                </Link>
                <Link to="/" style={linkStyle} onClick={closeMenu}>
                  PlayStation 4
                </Link>
                <Link to="/" style={linkStyle} onClick={closeMenu}>
                  Xbox Series X|S
                </Link>
                <Link to="/" style={linkStyle} onClick={closeMenu}>
                  Nintendo Switch
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      </Drawer>
    </>
  );
}
