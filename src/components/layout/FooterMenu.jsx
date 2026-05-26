import { useContext } from "react";
import { Row, Col, Typography, Button, Grid } from "antd";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const { Text } = Typography;
const { useBreakpoint } = Grid;

export default function FooterMenu() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const hideLoginButton =
    location.pathname === "/login" || location.pathname === "/registro" || user;

  const titleStyle = {
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "24px",
    marginTop: 0,
  };

  return (
    <footer
      style={{
        background: "#171a21",
        padding: isMobile ? "60px 20px 40px 20px" : "80px 10vw 60px 10vw",
        borderTop: "2px solid #2a475e",
      }}
    >
      <style>{`
        .footer-link {
          color: #c7d5e0;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s;
          display: block;
          margin-bottom: 12px;
        }
        .footer-link:hover {
          color: #66c0f4; /* Azul Steam para links externos */
        }
        .footer-link-internal:hover {
          color: #fff; /* Branco para links internos institucionais */
        }
      `}</style>

      {!hideLoginButton && (
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <Link to="/login">
            <Button
              size="large"
              style={{
                background: "#f5c518",
                color: "#0a141d",
                border: "none",
                height: "auto",
                minHeight: "60px",
                borderRadius: "30px",
                fontSize: isMobile ? "16px" : "20px",
                fontWeight: "900",
                padding: isMobile ? "16px 24px" : "0 50px",
                boxShadow: "0 4px 15px rgba(245, 197, 24, 0.3)",
                whiteSpace: "normal", 
              }}
            >
              Faça login para obter mais acesso
            </Button>
          </Link>
        </div>
      )}

      <Row gutter={[40, 40]} justify="space-between">
        <Col xs={24} md={6} style={{ textAlign: isMobile ? "center" : "left" }}>
          <img
            src="/src/assets/images/logo.png"
            alt="Logotipo do IGDb" 
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

        <Col xs={24} md={6} style={{ textAlign: isMobile ? "center" : "left" }}>
          <h3 style={titleStyle}>Desenvolvedores</h3>

          <a
            href="https://www.linkedin.com/in/andrey-gustavo-s-dos-santos-6691a333a/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <LinkedinOutlined aria-hidden="true" style={{ marginRight: "8px", fontSize: "18px" }} />
            Andrey Gustavo
          </a>

          <a
            href="https://www.linkedin.com/in/elton-lima-araujo/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <LinkedinOutlined aria-hidden="true" style={{ marginRight: "8px", fontSize: "18px" }} />
            Elton Araujo
          </a>

          <a
            href="https://www.linkedin.com/in/joao-gustavo-dos-santos/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <LinkedinOutlined aria-hidden="true" style={{ marginRight: "8px", fontSize: "18px" }} />
            João Gustavo
          </a>
        </Col>

        <Col xs={24} md={6} style={{ textAlign: isMobile ? "center" : "left" }}>
          <h3 style={titleStyle}>Projeto</h3>
          <a
            href="https://github.com/AndreyGustavo267/catalogo-de-jogos"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <GithubOutlined aria-hidden="true" style={{ marginRight: "8px", fontSize: "18px" }} />
            Repositório no GitHub
          </a>
        </Col>

        <Col xs={24} md={6} style={{ textAlign: isMobile ? "center" : "left" }}>
          <h3 style={titleStyle}>Institucional</h3>
          <Link to="/sobre" className="footer-link footer-link-internal">
            Sobre o IGDb
          </Link>
          <Link to="/ajuda" className="footer-link footer-link-internal">
            Central de Ajuda
          </Link>
          <Link to="/termos" className="footer-link footer-link-internal">
            Termos de Uso
          </Link>
          <Link to="/privacidade" className="footer-link footer-link-internal">
            Privacidade
          </Link>
        </Col>
      </Row>
    </footer>
  );
}