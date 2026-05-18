import { Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

export default function TermosPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", color: "#c7d5e0" }}>
      <Title level={1} style={{ color: "#fff" }}>Termos de Uso</Title>
      <Divider style={{ borderColor: "#2a475e" }} />
      <Paragraph style={{ color: "#c7d5e0", fontSize: "16px", lineHeight: "1.8" }}>
        Ao acessar e utilizar o IGDb, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.
      </Paragraph>
      <Title level={4} style={{ color: "#66c0f4", marginTop: "24px" }}>1. Uso de Licença</Title>
      <Paragraph style={{ color: "#c7d5e0", fontSize: "16px", lineHeight: "1.8" }}>
        É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site IGDb, apenas para visualização transitória pessoal e não comercial.
      </Paragraph>
    </div>
  );
}