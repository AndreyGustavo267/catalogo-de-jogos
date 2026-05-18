import { useContext } from "react";
import { Row, Col, Typography, Button } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const { Text } = Typography;

export default function FooterMenu() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const hideLoginButton = location.pathname === "/login" || location.pathname === "/registro" || user;

  const linkStyle = {
    color: "#c7d5e0",
    fontSize: "15px",
    fontWeight: "500",
    textDecoration: "none",
    transition: "color 0.3s",
    display: "block",
    marginBottom: "12px",
  };

  const titleStyle = {
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "24px",
  };

  return (
    <footer
      style={{
        background: "#171a21",
        padding: "80px 10vw 60px 10vw",
        borderTop: "2px solid #2a475e",
      }}
    >
      {!hideLoginButton && (
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <Link to="/login">
            <Button
              size="large"
              style={{
                background: "#f5c518",
                color: "#0a141d",
                border: "none",
                height: "60px",
                borderRadius: "30px",
                fontSize: "20px",
                fontWeight: "900",
                padding: "0 50px",
                boxShadow: "0 4px 15px rgba(245, 197, 24, 0.3)",
              }}
            >
              Faça login para obter mais acesso
            </Button>
          </Link>
        </div>
      )}

      <Row gutter={[40, 40]} justify="space-between">
        
        <Col xs={24} md={6}>
          <img
            src="/src/assets/images/logo.png"
            alt="IGDb Logo"
            style={{
              height: "70px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />
          <div style={{ display: "block" }}>
            <Text style={{ color: "#7a858f", fontSize: "14px" }}>
              © {new Date().getFullYear()} IGDb. Todos os direitos reservados.
            </Text>
          </div>
          <div style={{ display: "block", marginTop: "4px" }}>
            <Text style={{ color: "#7a858f", fontSize: "14px" }}>
              Catálogo de Jogos - Projeto SPODWE2
            </Text>
          </div>
        </Col>

        <Col xs={24} md={6}>
          <div style={titleStyle}>Desenvolvedores</div>
          <a href="#" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseOver={(e) => (e.target.style.color = "#66c0f4")} onMouseOut={(e) => (e.target.style.color = "#c7d5e0")}>
            <LinkedinOutlined style={{ marginRight: "8px", fontSize: "18px" }} /> Andrey Gustavo
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseOver={(e) => (e.target.style.color = "#66c0f4")} onMouseOut={(e) => (e.target.style.color = "#c7d5e0")}>
            <LinkedinOutlined style={{ marginRight: "8px", fontSize: "18px" }} /> Elton Araujo
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseOver={(e) => (e.target.style.color = "#66c0f4")} onMouseOut={(e) => (e.target.style.color = "#c7d5e0")}>
            <LinkedinOutlined style={{ marginRight: "8px", fontSize: "18px" }} /> João Gustavo
          </a>
        </Col>

        <Col xs={24} md={6}>
          <div style={titleStyle}>Projeto</div>
          <a
            href="https://github.com/AndreyGustavo267/catalogo-de-jogos"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.color = "#66c0f4")}
            onMouseOut={(e) => (e.target.style.color = "#c7d5e0")}
          >
            <GithubOutlined style={{ marginRight: "8px", fontSize: "18px" }} /> Repositório no GitHub
          </a>
        </Col>

        <Col xs={24} md={6}>
          <div style={titleStyle}>Institucional</div>
          <Link to="/sobre" style={linkStyle} onMouseOver={(e) => (e.target.style.color = "#fff")} onMouseOut={(e) => (e.target.style.color = "#c7d5e0")}>Sobre o IGDb</Link>
          <Link to="/ajuda" style={linkStyle} onMouseOver={(e) => (e.target.style.color = "#fff")} onMouseOut={(e) => (e.target.style.color = "#c7d5e0")}>Central de Ajuda</Link>
          <Link to="/termos" style={linkStyle} onMouseOver={(e) => (e.target.style.color = "#fff")} onMouseOut={(e) => (e.target.style.color = "#c7d5e0")}>Termos de Uso</Link>
          <Link to="/privacidade" style={linkStyle} onMouseOver={(e) => (e.target.style.color = "#fff")} onMouseOut={(e) => (e.target.style.color = "#c7d5e0")}>Privacidade</Link>
        </Col>

      </Row>
    </footer>
  );
}