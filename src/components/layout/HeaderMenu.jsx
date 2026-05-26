import { useState, useContext } from "react";
import {
  Layout,
  Input,
  Drawer,
  Row,
  Col,
  Typography,
  Space,
  Button,
  Dropdown,
  Avatar,
  message,
  Grid
} from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  TrophyOutlined,
  AppstoreOutlined,
  DesktopOutlined,
  StarOutlined,
  LogoutOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { GENEROS } from "../../utils/enums"; 

const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function HeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.lg; 
  const isSmallMobile = !screens.sm;

  const handleLogout = () => {
    logout();
    message.success("Você saiu da conta com sucesso!");
  };

  const showMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const handleSearch = (value) => {
    if (value.trim() !== "") {
      navigate(`/jogos?busca=${encodeURIComponent(value)}`);
      closeMenu();
    }
  };

  const colTitleStyle = {
    color: "#fff",
    marginTop: 0,
    marginBottom: "24px",
    fontSize: "26px",
    fontWeight: "800",
  };

  const containerStyle = {
    maxWidth: "1300px",
    margin: "0 auto",
    width: "100%",
  };

  const userMenuItems = [
    {
      key: "perfil",
      icon: <UserOutlined aria-hidden="true" />,
      label: (
        <Link to="/perfil?tab=1" style={{ color: "#c7d5e0" }}>
          Meu Perfil
        </Link>
      ),
    },
    {
      key: "favoritos",
      icon: <HeartOutlined aria-hidden="true" />,
      label: (
        <Link to="/perfil?tab=3" style={{ color: "#c7d5e0" }}>
          Meus Favoritos
        </Link>
      ),
    },
    { type: "divider" },
    {
      key: "logout",
      danger: true,
      icon: <LogoutOutlined aria-hidden="true" />,
      label: "Sair da conta",
      onClick: handleLogout,
    },
  ];

  const meioCategorias = Math.ceil(GENEROS.length / 2);
  const categoriasColuna1 = GENEROS.slice(0, meioCategorias);
  const categoriasColuna2 = GENEROS.slice(meioCategorias);

  return (
    <>
      <style>{`
        .mega-menu-link {
          color: #c7d5e0;
          display: block;
          margin-bottom: 16px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .mega-menu-link:hover {
          color: #fff;
        }
        .user-dropdown-btn {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px 8px;
          border-radius: 24px;
          transition: background 0.3s;
          background: transparent;
          border: none;
        }
        .user-dropdown-btn:hover {
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>

      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#171a21",
          padding: isMobile ? "0 16px" : "0 50px", 
          height: "auto",
          minHeight: "80px",
          flexWrap: isMobile ? "wrap" : "nowrap", 
          gap: isMobile ? "12px" : "0",
          paddingTop: isMobile ? "12px" : "0",
          paddingBottom: isMobile ? "12px" : "0"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", flex: isMobile ? "none" : 1 }}>
          <Space size={isMobile ? "middle" : "large"} style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Link to="/" aria-label="Ir para a página inicial" style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/src/assets/images/logo.png"
                alt="IGDb Logo"
                style={{
                  height: isSmallMobile ? "35px" : "45px", 
                  borderRadius: "4px",
                  display: "block",
                }}
              />
            </Link>
            
            <button
              onClick={showMenu}
              aria-label="Abrir menu principal"
              aria-expanded={isMenuOpen}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "18px",
                fontWeight: "800",
                padding: 0
              }}
            >
              <MenuOutlined aria-hidden="true" style={{ fontSize: "22px" }} />
              {!isMobile && "Menu"}
            </button>
          </Space>
        </div>

        <div
          style={{
            flex: isMobile ? "1 1 100%" : 2, 
            order: isMobile ? 3 : 2, 
            display: "flex",
            justifyContent: "center",
            maxWidth: isMobile ? "100%" : "1000px",
            padding: isMobile ? "0" : "0 24px",
          }}
        >
          <Input.Search
            placeholder="Pesquisar jogos, categorias..."
            enterButton
            size="large"
            aria-label="Campo de pesquisa de jogos"
            style={{ width: "100%" }}
            onSearch={handleSearch}
          />
        </div>

        <div
          style={{
            display: "flex",
            flex: isMobile ? "none" : 1,
            order: isMobile ? 2 : 3,
            justifyContent: "flex-end",
            alignItems: "center",
            gap: isMobile ? "16px" : "30px",
          }}
        >
          {user && (
            <Link
              to="/perfil?tab=2"
              aria-label="Ver minhas avaliações"
              style={{
                color: "#fff",
                fontWeight: "800",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <StarOutlined aria-hidden="true" style={{ fontSize: "20px", color: "#66c0f4" }} />
              {!isMobile && "Minhas Avaliações"}
            </Link>
          )}

          {user ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <button aria-label="Menu da conta do usuário" className="user-dropdown-btn">
                <Avatar
                  style={{
                    backgroundColor: "#66c0f4",
                    color: "#0a141d",
                    fontWeight: "bold",
                  }}
                >
                  {user.nome.charAt(0).toUpperCase()}
                </Avatar>
                {!isSmallMobile && (
                  <span style={{ color: "#fff", fontWeight: "800", fontSize: "15px" }}>
                    {user.nome.split(" ")[0]}
                  </span>
                )}
              </button>
            </Dropdown>
          ) : (
            <Link to="/login">
              <Button
                type="primary"
                style={{
                  background: "#66c0f4",
                  color: "#0a141d",
                  border: "none",
                  borderRadius: "24px",
                  fontWeight: "800",
                  padding: isMobile ? "0 16px" : "0 24px",
                  height: "40px",
                  fontSize: isMobile ? "14px" : "15px",
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </Header>

      <Drawer
        placement="top"
        closable={false}
        onClose={closeMenu}
        open={isMenuOpen}
        height="auto"
        styles={{ body: { background: "#1b2838", padding: "0" } }}
      >
        <div style={{ padding: isMobile ? "20px" : "30px 40px", borderBottom: "1px solid #2a475e" }}>
          <div style={{ ...containerStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link to="/" onClick={closeMenu} aria-label="Ir para a página inicial" style={{ display: "flex", alignItems: "center" }}>
              <img src="/src/assets/images/logo.png" alt="IGDb Logo" style={{ height: isMobile ? "40px" : "60px", borderRadius: "6px" }} />
            </Link>
            <Button
              shape="circle"
              aria-label="Fechar menu"
              icon={<CloseOutlined aria-hidden="true" style={{ fontSize: "20px" }} />}
              onClick={closeMenu}
              style={{ background: "#66c0f4", color: "#000", border: "none", width: "50px", height: "50px" }}
            />
          </div>
        </div>

        <nav aria-label="Navegação do Mega Menu" style={{ padding: isMobile ? "30px 20px" : "60px 40px" }}>
          <div style={containerStyle}>
            <Row gutter={[40, 48]} justify="start">
              <Col xs={24} md={6}>
                <Title level={2} style={colTitleStyle}>
                  <TrophyOutlined aria-hidden="true" style={{ color: "#66c0f4", marginRight: "12px" }} /> Jogos
                </Title>
                <Link to="/jogos?ordem=nota&limite=50" onClick={closeMenu} className="mega-menu-link">Top 50 Melhores Jogos</Link>
                <Link to="/jogos?modelo=gratuito&ordem=nota&limite=10" onClick={closeMenu} className="mega-menu-link">Top 10 Gratuitos</Link>
                <Link to="/jogos?modelo=pago&ordem=nota&limite=10" onClick={closeMenu} className="mega-menu-link">Top 10 Pagos</Link>
                <Link to="/jogos?ordem=recentes&limite=20" onClick={closeMenu} className="mega-menu-link">Lançamentos (Top 20)</Link>
              </Col>

              <Col xs={24} md={12}>
                <Title level={2} style={colTitleStyle}>
                  <AppstoreOutlined aria-hidden="true" style={{ color: "#66c0f4", marginRight: "12px" }} /> Categorias
                </Title>
                <Row>
                  <Col span={12}>
                    {categoriasColuna1.map((cat) => (
                      <Link key={cat} to={`/jogos?categorias=${encodeURIComponent(cat)}`} onClick={closeMenu} className="mega-menu-link">{cat}</Link>
                    ))}
                  </Col>
                  <Col span={12}>
                    {categoriasColuna2.map((cat) => (
                      <Link key={cat} to={`/jogos?categorias=${encodeURIComponent(cat)}`} onClick={closeMenu} className="mega-menu-link">{cat}</Link>
                    ))}
                  </Col>
                </Row>
              </Col>

              <Col xs={24} md={6}>
                <Title level={2} style={colTitleStyle}>
                  <DesktopOutlined aria-hidden="true" style={{ color: "#66c0f4", marginRight: "12px" }} /> Plataformas
                </Title>
                <Link to="/jogos?plataformas=PC" onClick={closeMenu} className="mega-menu-link">PC (Windows)</Link>
                <Link to="/jogos?plataformas=PlayStation%205" onClick={closeMenu} className="mega-menu-link">PlayStation 5</Link>
                <Link to="/jogos?plataformas=PlayStation%204" onClick={closeMenu} className="mega-menu-link">PlayStation 4</Link>
                <Link to="/jogos?plataformas=Xbox%20Series%20X%2FS" onClick={closeMenu} className="mega-menu-link">Xbox Series X/S</Link>
                <Link to="/jogos?plataformas=Switch" onClick={closeMenu} className="mega-menu-link">Nintendo Switch</Link>
              </Col>
            </Row>
          </div>
        </nav>
      </Drawer>
    </>
  );
}