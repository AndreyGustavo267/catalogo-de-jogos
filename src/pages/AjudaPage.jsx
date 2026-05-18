import { Typography, Collapse, Divider } from "antd";

const { Title, Paragraph } = Typography;

export default function AjudaPage() {
  const items = [
    {
      key: '1',
      label: <strong style={{ color: "#fff" }}>Como faço para avaliar um jogo?</strong>,
      children: <p style={{ color: "#8f98a0" }}>Você precisa criar uma conta e estar logado. Depois, basta clicar no botão "Avaliar" na lista de jogos.</p>,
    },
    {
      key: '2',
      label: <strong style={{ color: "#fff" }}>O IGDb é gratuito?</strong>,
      children: <p style={{ color: "#8f98a0" }}>Sim! Este é um projeto de código aberto e totalmente gratuito para a comunidade.</p>,
    },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", color: "#c7d5e0" }}>
      <Title level={1} style={{ color: "#fff" }}>Central de Ajuda</Title>
      <Divider style={{ borderColor: "#2a475e" }} />
      <Paragraph style={{ color: "#c7d5e0", fontSize: "16px", marginBottom: "30px" }}>
        Como podemos ajudar você hoje? Confira nossas dúvidas frequentes abaixo:
      </Paragraph>
      
      <Collapse 
        items={items} 
        style={{ background: "#1a1f26", borderColor: "#2a475e" }}
        expandIconPosition="end"
      />
    </div>
  );
}