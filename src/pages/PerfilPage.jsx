import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Typography, Tabs, List, Row, Col, Space, Card, Avatar, Button, Modal, Form, Input, message, Grid } from "antd";
import { StarFilled, UserOutlined, MailOutlined, EditOutlined, LockOutlined, HeartFilled } from "@ant-design/icons";
import { AuthContext } from "../contexts/AuthContext";
import db from "../assets/data.json";

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid; 

export default function PerfilPage() {
  const { user, atualizarPerfil, favoritos, toggleFavorito } = useContext(AuthContext);  
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab && ["1", "2", "3"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    navigate(`/perfil?tab=${key}`, { replace: true });
  };
  
  const handleUpdate = (values) => {
    const result = atualizarPerfil(values);
    if (result.success) {
      message.success("Perfil atualizado com sucesso!");
      setIsModalVisible(false);
    }
  };

  const handleRemoveFavorito = (e, jogo) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    toggleFavorito(jogo);
    message.info(`"${jogo.titulo}" foi removido dos favoritos.`);
  };

  const minhasAvaliacoes = db.avaliacoes.filter((avaliacao) => avaliacao.usuarioId === user?.id);
  const listaAvaliacoes = minhasAvaliacoes.map((aval) => {
    const jogoInfo = db.jogos.find((j) => j.id === aval.jogoId);
    return { ...aval, jogo: jogoInfo };
  });

  const meusIdsFavoritos = (favoritos || [])
  .filter((fav) => fav.usuarioId === user?.id)
  .map((fav) => fav.jogoId);

  const meusFavoritos = db.jogos.filter((jogo) => meusIdsFavoritos.includes(jogo.id));

  const items = [
    {
      key: "1",
      label: isMobile ? "Dados" : "Meus Dados",
      children: (
        <Card style={{ background: "rgba(26, 31, 38, 0.5)", borderColor: "#2a475e", marginTop: "16px" }}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", flexWrap: "wrap", gap: "16px" }}>
              <Space size="middle" align="center">
                <Avatar size={isMobile ? 50 : 64} style={{ backgroundColor: "#66c0f4", color: "#0a141d", fontSize: isMobile ? "20px" : "24px", fontWeight: "bold" }}>
                  {user?.nome ? user.nome.charAt(0).toUpperCase() : <UserOutlined aria-hidden="true" />}
                </Avatar>
                <div>
                  <Title level={2} style={{ color: "#fff", margin: 0, fontSize: isMobile ? "20px" : "24px" }}>{user?.nome}</Title>
                  <Text style={{ color: "#8f98a0", fontSize: isMobile ? "13px" : "14px" }}>Membro da Comunidade</Text>
                </div>
              </Space>
              
              <Button 
                type="primary" 
                icon={<EditOutlined aria-hidden="true" />} 
                onClick={() => {
                  form.setFieldsValue({ nome: user?.nome, email: user?.email });
                  setIsModalVisible(true);
                }}
                style={{ background: "#2a475e", borderColor: "#2a475e", color: "#fff", width: isMobile ? "100%" : "auto" }}
              >
                Editar Perfil
              </Button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
              <Text style={{ color: "#c7d5e0", fontSize: isMobile ? "14px" : "16px" }}>
                <UserOutlined aria-hidden="true" style={{ marginRight: "10px", color: "#66c0f4" }} /> 
                <strong>Nome:</strong> {user?.nome}
              </Text>
              <Text style={{ color: "#c7d5e0", fontSize: isMobile ? "14px" : "16px", wordBreak: "break-all" }}>
                <MailOutlined aria-hidden="true" style={{ marginRight: "10px", color: "#66c0f4" }} /> 
                <strong>E-mail:</strong> {user?.email}
              </Text>
            </div>
          </Space>
        </Card>
      ),
    },
    {
      key: "2",
      label: isMobile ? `Avaliações (${listaAvaliacoes.length})` : `Minhas Avaliações (${listaAvaliacoes.length})`,
      children: (
        <section aria-label="Lista das suas avaliações" style={{ marginTop: "16px" }}>
          <List
            itemLayout="horizontal"
            dataSource={listaAvaliacoes}
            locale={{ emptyText: <Text style={{ color: "#8f98a0" }}>Você ainda não avaliou nenhum jogo.</Text> }}
            renderItem={(item) => (
              <div style={{ background: "rgba(26, 31, 38, 0.5)", borderRadius: "8px", marginBottom: "16px", padding: isMobile ? "16px" : "20px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <Row gutter={[isMobile ? 0 : 24, 16]}>
                  
                  {/* COLUNA DA CAPA DO JOGO COM LINK */}
                  <Col xs={24} sm={6} md={4}>
                    <Link to={`/jogo/${item.jogoId}`} aria-label={`Ver detalhes de ${item.jogo?.titulo}`}>
                      <img 
                        src={item.jogo?.capa} 
                        alt={`Capa do jogo ${item.jogo?.titulo}`} 
                        style={{ 
                          width: "100%", 
                          borderRadius: "4px", 
                          objectFit: "cover", 
                          aspectRatio: isMobile ? "16/9" : "auto", 
                          marginBottom: isMobile ? "12px" : "0",
                          transition: "opacity 0.2s" 
                        }} 
                        onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")}
                        onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                      />
                    </Link>
                  </Col>

                  {/* COLUNA DO CONTEÚDO E TÍTULO */}
                  <Col xs={24} sm={18} md={20}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "8px" }}>
                      
                      {/* TÍTULO COM LINK */}
                      <Link to={`/jogo/${item.jogoId}`} style={{ textDecoration: "none" }}>
                        <Title 
                          level={3} 
                          style={{ 
                            color: "#fff", 
                            margin: 0, 
                            fontSize: isMobile ? "18px" : "20px",
                            transition: "color 0.2s"
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.color = "#66c0f4")}
                          onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
                        >
                          {item.jogo?.titulo}
                        </Title>
                      </Link>

                      <Space style={{ background: "rgba(245, 197, 24, 0.1)", padding: "4px 12px", borderRadius: "16px" }}>
                        <StarFilled aria-hidden="true" style={{ color: "#f5c518", fontSize: "14px" }} />
                        <Text strong aria-label={`Sua nota foi ${item.nota.toFixed(1)}`} style={{ color: "#f5c518", fontSize: "14px" }}>{item.nota.toFixed(1)}</Text>
                      </Space>
                    </div>
                    
                    <Text style={{ color: "#8f98a0", fontSize: "13px", display: "block", marginBottom: "12px" }}>
                      Avaliado em: {new Date(item.data).toLocaleDateString("pt-BR")}
                    </Text>
                    
                    <Paragraph style={{ color: "#c7d5e0", fontSize: isMobile ? "14px" : "15px", margin: 0, fontStyle: "italic" }}>
                      "{item.comentario}"
                    </Paragraph>
                  </Col>
                </Row>
              </div>
            )}
          />
        </section>
      ),
    },
    {
      key: "3",
      label: isMobile ? `Favoritos (${meusFavoritos.length})` : `Meus Favoritos (${meusFavoritos.length})`,
      children: (
        <section aria-label="Lista dos seus jogos favoritos" style={{ marginTop: "16px" }}>
          <Row gutter={[isMobile ? 12 : 16, isMobile ? 12 : 16]}>
            {meusFavoritos.length > 0 ? (
              meusFavoritos.map((jogo) => (
                <Col xs={12} sm={8} md={6} key={jogo.id}>
                  <Link to={`/jogo/${jogo.id}`} style={{ textDecoration: "none", display: "block" }} aria-label={`Ver detalhes de ${jogo.titulo}`}>
                    <Card
                      hoverable
                      cover={
                        <div style={{ position: "relative" }}>
                          <img alt={`Capa do jogo ${jogo.titulo}`} src={jogo.capa} style={{ height: isMobile ? "110px" : "140px", width: "100%", objectFit: "cover", display: "block" }} />
                          <Button
                            type="text"
                            icon={<HeartFilled aria-hidden="true" style={{ fontSize: isMobile ? "14px" : "16px" }} />}
                            onClick={(e) => handleRemoveFavorito(e, jogo)}
                            aria-label={`Remover ${jogo.titulo} dos favoritos`}
                            style={{
                              position: "absolute",
                              bottom: "6px",
                              right: "6px",
                              background: "rgba(0, 0, 0, 0.7)",
                              color: "#ff4d4f",
                              border: "none",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: isMobile ? "30px" : "36px",
                              height: isMobile ? "30px" : "36px",
                              padding: 0,
                              zIndex: 2
                            }}
                          />
                        </div>
                      }
                      style={{ background: "#1a1f26", borderColor: "#2a475e", overflow: "hidden" }}
                      bodyStyle={{ padding: isMobile ? "8px" : "12px" }}
                    >
                      <Card.Meta 
                        title={<span style={{ color: "#fff", fontSize: isMobile ? "13px" : "16px", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{jogo.titulo}</span>} 
                        description={<span style={{ color: "#8f98a0", fontSize: isMobile ? "12px" : "14px" }}>{new Date(jogo.dataLancamento).getFullYear()}</span>} 
                      />
                    </Card>
                  </Link>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <div style={{ textAlign: "center", padding: isMobile ? "20px" : "40px", background: "rgba(26, 31, 38, 0.5)", borderRadius: "8px", border: "1px dashed #2a475e" }}>
                  <HeartFilled style={{ fontSize: "40px", color: "#2a475e", marginBottom: "16px" }} />
                  <Title level={4} style={{ color: "#8f98a0", margin: 0, fontSize: isMobile ? "16px" : "20px" }}>Você ainda não tem jogos favoritos.</Title>
                  <Text style={{ color: "#8f98a0", fontSize: isMobile ? "13px" : "14px" }}>Navegue pelo catálogo e clique no coração para salvá-los aqui!</Text>
                </div>
              </Col>
            )}
          </Row>
        </section>
      ),
    },
  ];

  return (
    <main aria-labelledby="titulo-pagina-perfil" style={{ maxWidth: "1000px", margin: isMobile ? "20px auto" : "40px auto", padding: isMobile ? "0 12px" : "0 20px" }}>
      <style>{`
        .ant-tabs-nav-operations {
          display: none !important;
        }
        .ant-tabs-nav-list {
          flex: 1;
          display: flex;
          justify-content: ${isMobile ? "space-between" : "flex-start"};
          width: 100%;
        }
      `}</style>

      <div style={{ marginBottom: "20px" }}>
        <Title id="titulo-pagina-perfil" level={1} style={{ color: "#fff", margin: 0, fontSize: isMobile ? "26px" : "32px" }}>Meu Perfil</Title>
        <Text style={{ color: "#8f98a0", fontSize: isMobile ? "14px" : "16px" }}>Gerencie sua conta e suas atividades no IGDb.</Text>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} size={isMobile ? "small" : "large"} />

      <Modal
        title={<span id="titulo-modal-edicao">Editar Perfil</span>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        aria-labelledby="titulo-modal-edicao"
        styles={{ 
          body: { padding: "10px 0" } 
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          size="large"
          style={{ marginTop: "20px" }}
        >
          <Form.Item
            name="nome"
            label={<Text style={{ color: "#c7d5e0" }}>Nome Completo</Text>}
            rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
          >
            <Input autoFocus prefix={<UserOutlined aria-hidden="true" style={{ color: "#8f98a0" }} />} />
          </Form.Item>

          <Form.Item
            name="email"
            label={<Text style={{ color: "#c7d5e0" }}>E-mail</Text>}
            rules={[
              { required: true, message: "Por favor, insira seu e-mail!" },
              { type: "email", message: "Insira um e-mail válido!" }
            ]}
          >
            <Input prefix={<MailOutlined aria-hidden="true" style={{ color: "#8f98a0" }} />} />
          </Form.Item>

          <Form.Item
            name="senha"
            label={<Text style={{ color: "#c7d5e0" }}>Nova Senha</Text>}
            extra={<span style={{ color: "#8f98a0" }}>Deixe em branco se não quiser alterar a senha.</span>}
          >
            <Input.Password prefix={<LockOutlined aria-hidden="true" style={{ color: "#8f98a0" }} />} placeholder="Nova senha" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: "30px", textAlign: "right" }}>
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit" style={{ background: "#66c0f4", color: "#0a141d", fontWeight: "bold" }}>
                Salvar Alterações
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
}