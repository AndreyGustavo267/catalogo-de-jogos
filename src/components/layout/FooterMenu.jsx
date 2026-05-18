import { Row, Col, Typography, Button, Space } from "antd";
import {
  GithubOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text } = Typography;

export default function FooterMenu() {
  // Estilo padronizado para os 4 grandes links das colunas
  const linkStyle = {
    color: "#c7d5e0",
    fontSize: "22px", // Fonte bem grande
    fontWeight: "600",
    textDecoration: "none",
    transition: "color 0.3s",
  };

  // Estilo padronizado para os ícones sociais gigantes
  const iconStyle = {
    color: "#fff",
    fontSize: "40px", // Ícones enormes
    transition: "color 0.3s",
  };

  return (
    <footer
      style={{
        background: "#171a21",
        padding: "100px 10vw 80px 10vw", // Paddings gigantes para ocupar boa parte da tela
        borderTop: "2px solid #2a475e",
      }}
    >
      {/* 1. BOTÃO DE LOGIN CENTRALIZADO (Estilo IMDb) */}
      <div style={{ textAlign: "center", marginBottom: "100px" }}>
        <Link to="/login">
          <Button
            size="large"
            style={{
              background: "#f5c518",
              color: "#000",
              border: "none",
              height: "65px",
              borderRadius: "35px", // Botão bem arredondado
              fontSize: "22px",
              fontWeight: "900",
              padding: "0 50px",
              boxShadow: "0 4px 15px rgba(245, 197, 24, 0.3)",
            }}
          >
            Faça login para obter mais acesso
          </Button>
        </Link>
      </div>

      {/* 2. AS 4 COLUNAS DE LINKS (Estilo Steam enxuto) */}
      <Row
        justify="space-around"
        align="middle"
        style={{ marginBottom: "80px", textAlign: "center" }}
      >
        <Col xs={24} md={6} style={{ marginBottom: "20px" }}>
          <Link
            to="/"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.color = "#fff")}
            onMouseOut={(e) => (e.target.style.color = "#c7d5e0")}
          >
            Sobre o IGDb
          </Link>
        </Col>
        <Col xs={24} md={6} style={{ marginBottom: "20px" }}>
          <Link
            to="/"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.color = "#fff")}
            onMouseOut={(e) => (e.target.style.color = "#c7d5e0")}
          >
            Central de Ajuda
          </Link>
        </Col>
        <Col xs={24} md={6} style={{ marginBottom: "20px" }}>
          <Link
            to="/"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.color = "#fff")}
            onMouseOut={(e) => (e.target.style.color = "#c7d5e0")}
          >
            Termos de Uso
          </Link>
        </Col>
        <Col xs={24} md={6} style={{ marginBottom: "20px" }}>
          <Link
            to="/"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.color = "#fff")}
            onMouseOut={(e) => (e.target.style.color = "#c7d5e0")}
          >
            Privacidade
          </Link>
        </Col>
      </Row>

      {/* Linha divisória sutil */}
      <div
        style={{
          height: "1px",
          background: "rgba(42, 71, 94, 0.5)",
          marginBottom: "60px",
        }}
      />

      {/* 3. LOGO GIGANTE E REDES SOCIAIS */}
      <Row justify="space-between" align="middle">
        {/* Esquerda: Logo e Copyright */}
        <Col>
          <img
            src="/src/assets/images/logo.png"
            alt="IGDb Logo"
            style={{
              height: "80px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />
          <div style={{ display: "block" }}>
            <Text style={{ color: "#7a858f", fontSize: "16px" }}>
              © {new Date().getFullYear()} IGDb. Todos os direitos reservados.
            </Text>
          </div>
          <div style={{ display: "block", marginTop: "4px" }}>
            <Text style={{ color: "#7a858f", fontSize: "14px" }}>
              Catálogo de Jogos - Projeto SPODWE2
            </Text>
          </div>
        </Col>

        {/* Direita: 4 Redes Sociais */}
        <Col>
          <Space size={40}>
            {" "}
            <a
              href="https://github.com/AndreyGustavo267/catalogo-de-jogos"
              target="_blank"
              rel="noopener noreferrer"
              style={iconStyle}
              onMouseOver={(e) => (e.currentTarget.style.color = "#66c0f4")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
            >
              <GithubOutlined />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={iconStyle}
              onMouseOver={(e) => (e.currentTarget.style.color = "#66c0f4")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
            >
              <TwitterOutlined />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={iconStyle}
              onMouseOver={(e) => (e.currentTarget.style.color = "#66c0f4")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
            >
              <YoutubeOutlined />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={iconStyle}
              onMouseOver={(e) => (e.currentTarget.style.color = "#66c0f4")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
            >
              <InstagramOutlined />
            </a>
          </Space>
        </Col>
      </Row>
    </footer>
  );
}
