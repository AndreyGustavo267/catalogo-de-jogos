import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../contexts/AuthContext";

const { Title, Text } = Typography;

export default function RegistroPage() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      const result = register(values.nome, values.email, values.senha);
      if (result.success) {
        message.success("Conta criada com sucesso! Bem-vindo!");
        navigate("/");
      } else {
        message.error(result.message);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <main aria-labelledby="titulo-registro" style={{ maxWidth: "400px", margin: "80px auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Title id="titulo-registro" level={1} style={{ color: "#fff", fontSize: "30px", marginBottom: "8px" }}>
          Criar Conta
        </Title>
        <Text style={{ color: "#8f98a0", fontSize: "16px" }}>
          Junte-se ao IGDb para avaliar jogos
        </Text>
      </div>

      <Form name="register_form" layout="vertical" onFinish={onFinish} size="large">
        
        <Form.Item
          name="nome"
          label={<span style={{ color: "#c7d5e0" }}>Nome Completo</span>}
          rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
        >
          <Input
            autoFocus 
            prefix={<UserOutlined aria-hidden="true" style={{ color: "#8f98a0" }} />}
            placeholder="Seu nome completo"
            style={{ background: "#1b2838", borderColor: "#2a475e", color: "#fff" }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span style={{ color: "#c7d5e0" }}>E-mail</span>}
          rules={[
            { required: true, message: "Por favor, insira seu e-mail!" },
            { type: "email", message: "Insira um e-mail válido!" }
          ]}
        >
          <Input
            prefix={<MailOutlined aria-hidden="true" style={{ color: "#8f98a0" }} />}
            placeholder="E-mail (ex: novo@email.com)"
            style={{ background: "#1b2838", borderColor: "#2a475e", color: "#fff" }}
          />
        </Form.Item>

        <Form.Item
          name="senha"
          label={<span style={{ color: "#c7d5e0" }}>Senha</span>}
          rules={[
            { required: true, message: "Por favor, crie uma senha!" },
            { min: 6, message: "A senha deve ter pelo menos 6 caracteres." }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined aria-hidden="true" style={{ color: "#8f98a0" }} />}
            placeholder="Crie uma senha segura"
            style={{ background: "#1b2838", borderColor: "#2a475e", color: "#fff" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{
              background: "#66c0f4",
              color: "#0a141d",
              fontWeight: "800",
              border: "none",
              height: "45px",
              fontSize: "16px",
              marginTop: "10px"
            }}
          >
            Cadastrar
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Text style={{ color: "#8f98a0" }}>Já tem uma conta? </Text>
          <Link to="/login" style={{ color: "#66c0f4", fontWeight: "bold" }}>
            Faça login aqui.
          </Link>
        </div>
      </Form>
    </main>
  );
}