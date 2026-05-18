import { Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

export default function PrivacidadePage() {
  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", color: "#c7d5e0" }}>
      <Title level={1} style={{ color: "#fff" }}>Política de Privacidade</Title>
      <Divider style={{ borderColor: "#2a475e" }} />
      <Paragraph style={{ color: "#c7d5e0", fontSize: "16px", lineHeight: "1.8" }}>
        A sua privacidade é importante para nós. É política do IGDb respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site.
      </Paragraph>
      <Paragraph style={{ color: "#c7d5e0", fontSize: "16px", lineHeight: "1.8" }}>
        Solicitamos informações pessoais, como e-mail e nome, apenas quando realmente precisamos delas para lhe fornecer uma experiência personalizada (como salvar suas avaliações).
      </Paragraph>
    </div>
  );
}