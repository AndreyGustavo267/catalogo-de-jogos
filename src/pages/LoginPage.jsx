import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { AuthContext } from "../contexts/AuthContext";

const { Title, Text } = Typography;

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      const result = login(values.email, values.senha);
      if (result.success) {
        message.success("Login realizado com sucesso!");
        navigate("/");
      } else {
        message.error(result.message);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <main aria-labelledby="titulo-login" style={{ maxWidth: "400px", margin: "80px auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        
        <Title id="titulo-login" level={1} style={{ color: "#fff", fontSize: "30px", marginBottom: "8px" }}>
          Iniciar Sessão
        </Title>
        <Text style={{ color: "#8f98a0", fontSize: "16px" }}>
          Use sua conta do IGDb para continuar
        </Text>
      </div>

      <Form
        name="login_form"
        layout="vertical"
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="email"
          label={<span style={{ color: "#c7d5e0" }}>E-mail</span>}
          rules={[
            { required: true, message: "Por favor, insira seu e-mail!" },
            { type: "email", message: "Insira um e-mail válido!" }
          ]}
        >
          <Input
            autoFocus
            prefix={<MailOutlined aria-hidden="true" style={{ color: "#8f98a0" }} />}
            placeholder="Seu e-mail"
            style={{ 
              background: "#1b2838", 
              borderColor: "#2a475e", 
              color: "#fff" 
            }}
          />
        </Form.Item>

        <Form.Item
          name="senha"
          label={<span style={{ color: "#c7d5e0" }}>Senha</span>}
          rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
        >
          <Input.Password
            prefix={<LockOutlined aria-hidden="true" style={{ color: "#8f98a0" }} />}
            placeholder="Sua senha"
            style={{ 
              background: "#1b2838", 
              borderColor: "#2a475e", 
              color: "#fff" 
            }}
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
            Entrar
          </Button>
        </Form.Item>
        
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Text style={{ color: "#8f98a0" }}>Não tem uma conta? </Text>
          <Link to="/registro" style={{ color: "#66c0f4", fontWeight: "bold" }}>
            Cadastre-se aqui.
          </Link>
        </div>
      </Form>
    </main>
  );
}