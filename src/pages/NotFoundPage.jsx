import { Typography, Button } from "antd";
import { FrownOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

export default function NotFoundPage() {
  return (
    <main
      aria-labelledby="titulo-404"
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <FrownOutlined 
        aria-hidden="true" 
        style={{ fontSize: "80px", color: "#2a475e", marginBottom: "24px" }} 
      />

      <Title
        id="titulo-404"
        level={1}
        style={{ 
          color: "#fff", 
          fontSize: "64px", 
          margin: "0 0 8px 0", 
          fontWeight: "900",
          letterSpacing: "4px"
        }}
      >
        404
      </Title>

      <Title
        level={2}
        style={{ color: "#66c0f4", margin: "0 0 24px 0", fontSize: "24px" }}
      >
        Página Não Encontrada
      </Title>

      <Text 
        style={{ 
          color: "#8f98a0", 
          fontSize: "16px", 
          maxWidth: "500px", 
          marginBottom: "40px",
          lineHeight: "1.6"
        }}
      >
        Ops! Parece que se perdeu no catálogo. A página que está a procurar não existe, foi movida ou o link está quebrado.
      </Text>

      <Link to="/" aria-label="Voltar para a página inicial">
        <Button
          type="primary"
          size="large"
          icon={<HomeOutlined aria-hidden="true" />}
          style={{
            background: "#66c0f4",
            color: "#0a141d",
            border: "none",
            fontWeight: "800",
            height: "50px",
            padding: "0 32px",
            borderRadius: "25px",
            fontSize: "16px",
            boxShadow: "0 4px 15px rgba(102, 192, 244, 0.3)",
          }}
        >
          Voltar para o Início
        </Button>
      </Link>
    </main>
  );
}