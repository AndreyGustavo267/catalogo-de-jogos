import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Typography, Tabs, List, Row, Col, Space, Card, Avatar, Button, Modal, Form, Input, message } from "antd";
import { StarFilled, UserOutlined, MailOutlined, CrownOutlined, EditOutlined, LockOutlined } from "@ant-design/icons";
import { AuthContext } from "../contexts/AuthContext";
import db from "../assets/data.json";

const { Title, Text, Paragraph } = Typography;

export default function PerfilPage() {
  const { user, atualizarPerfil } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  const handleUpdate = (values) => {
    const result = atualizarPerfil(values);
    if (result.success) {
      message.success("Perfil atualizado com sucesso!");
      setIsModalVisible(false);
    }
  };

  const minhasAvaliacoes = db.avaliacoes.filter((avaliacao) => avaliacao.usuarioId === user?.id);
  const listaAvaliacoes = minhasAvaliacoes.map((aval) => {
    const jogoInfo = db.jogos.find((j) => j.id === aval.jogoId);
    return { ...aval, jogo: jogoInfo };
  });

  const meusFavoritos = db.jogos.filter((jogo) => user?.jogosFavoritosIds?.includes(jogo.id));

  const items = [
    {
      key: "1",
      label: "Meus Dados",
      children: (
        <Card style={{ background: "rgba(26, 31, 38, 0.5)", borderColor: "#2a475e", marginTop: "16px" }}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Space size="middle" align="center">
                <Avatar size={64} style={{ backgroundColor: "#66c0f4", color: "#0a141d", fontSize: "24px", fontWeight: "bold" }}>
                  {user?.nome?.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <Title level={3} style={{ color: "#fff", margin: 0 }}>{user?.nome}</Title>
                  <Text style={{ color: "#8f98a0" }}>Membro da Comunidade</Text>
                </div>
              </Space>
              
              <Button 
                type="primary" 
                icon={<EditOutlined />} 
                onClick={() => {
                  form.setFieldsValue({ nome: user?.nome, email: user?.email });
                  setIsModalVisible(true);
                }}
                style={{ background: "#2a475e", borderColor: "#2a475e", color: "#fff" }}
              >
                Editar Perfil
              </Button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
              <Text style={{ color: "#c7d5e0", fontSize: "16px" }}>
                <UserOutlined style={{ marginRight: "10px", color: "#66c0f4" }} /> 
                <strong>Nome:</strong> {user?.nome}
              </Text>
              <Text style={{ color: "#c7d5e0", fontSize: "16px" }}>
                <MailOutlined style={{ marginRight: "10px", color: "#66c0f4" }} /> 
                <strong>E-mail:</strong> {user?.email}
              </Text>
            </div>
          </Space>
        </Card>
      ),
    },
    {
      key: "2",
      label: `Minhas Avaliações (${listaAvaliacoes.length})`,
      children: (
        <div style={{ marginTop: "16px" }}>
          <List
            itemLayout="horizontal"
            dataSource={listaAvaliacoes}
            locale={{ emptyText: <Text style={{ color: "#8f98a0" }}>Você ainda não avaliou nenhum jogo.</Text> }}
            renderItem={(item) => (
              <div style={{ background: "rgba(26, 31, 38, 0.5)", borderRadius: "8px", marginBottom: "16px", padding: "20px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <Row gutter={[24, 16]}>
                  <Col xs={24} sm={6} md={4}>
                    <img src={item.jogo?.capa} alt={item.jogo?.titulo} style={{ width: "100%", borderRadius: "4px", objectFit: "cover" }} />
                  </Col>
                  <Col xs={24} sm={18} md={20}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Title level={4} style={{ color: "#fff", margin: 0 }}>{item.jogo?.titulo}</Title>
                      <Space style={{ background: "rgba(245, 197, 24, 0.1)", padding: "4px 12px", borderRadius: "16px" }}>
                        <StarFilled style={{ color: "#f5c518", fontSize: "16px" }} />
                        <Text strong style={{ color: "#f5c518", fontSize: "16px" }}>{item.nota.toFixed(1)}</Text>
                      </Space>
                    </div>
                    <Text style={{ color: "#8f98a0", fontSize: "13px", display: "block", marginBottom: "12px" }}>
                      Avaliado em: {new Date(item.data).toLocaleDateString("pt-BR")}
                    </Text>
                    <Paragraph style={{ color: "#c7d5e0", fontSize: "15px", margin: 0, fontStyle: "italic" }}>
                      "{item.comentario}"
                    </Paragraph>
                  </Col>
                </Row>
              </div>
            )}
          />
        </div>
      ),
    },
    {
      key: "3",
      label: `Meus Favoritos (${meusFavoritos.length})`,
      children: (
        <div style={{ marginTop: "16px" }}>
          <Row gutter={[16, 16]}>
            {meusFavoritos.length > 0 ? (
              meusFavoritos.map((jogo) => (
                <Col xs={12} sm={8} md={6} key={jogo.id}>
                  <Link to={`/jogo/${jogo.id}`} style={{ textDecoration: "none" }}>
                    <Card
                      hoverable
                      cover={<img alt={jogo.titulo} src={jogo.capa} style={{ height: "100px", objectFit: "cover" }} />}
                      style={{ background: "#1a1f26", borderColor: "#2a475e", overflow: "hidden" }}
                      bodyStyle={{ padding: "12px" }}
                    >
                      <Card.Meta 
                        title={<span style={{ color: "#fff" }}>{jogo.titulo}</span>} 
                        description={<span style={{ color: "#8f98a0" }}>{new Date(jogo.dataLancamento).getFullYear()}</span>} 
                      />
                    </Card>
                  </Link>
                </Col>
              ))
            ) : (
              <Text style={{ color: "#8f98a0" }}>Você ainda não adicionou jogos aos favoritos.</Text>
            )}
          </Row>
        </div>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
      <div style={{ marginBottom: "30px" }}>
        <Title level={2} style={{ color: "#fff", margin: 0 }}>Meu Perfil</Title>
        <Text style={{ color: "#8f98a0", fontSize: "16px" }}>Gerencie sua conta e suas atividades no IGDb.</Text>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} size="large" />

      <Modal
        title="Editar Perfil"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
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
            label={<Text strong>Nome Completo</Text>}
            rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
          >
            <Input prefix={<UserOutlined style={{ color: "#8f98a0" }} />} />
          </Form.Item>

          <Form.Item
            name="email"
            label={<Text strong>E-mail</Text>}
            rules={[
              { required: true, message: "Por favor, insira seu e-mail!" },
              { type: "email", message: "Insira um e-mail válido!" }
            ]}
          >
            <Input prefix={<MailOutlined style={{ color: "#8f98a0" }} />} />
          </Form.Item>

          <Form.Item
            name="senha"
            label={<Text strong>Nova Senha</Text>}
            extra="Deixe em branco se não quiser alterar a senha."
          >
            <Input.Password prefix={<LockOutlined style={{ color: "#8f98a0" }} />} placeholder="Nova senha" />
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
    </div>
  );
}
