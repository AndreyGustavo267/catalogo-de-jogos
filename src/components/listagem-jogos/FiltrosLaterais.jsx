import { Typography, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function FiltrosLaterais() {
  return (
    <div
      style={{
        background: "#1a1f26",
        borderRadius: "8px",
        padding: "24px",
        border: "1px solid #2a475e",
        minHeight: "300px",
        marginTop: "86px",
      }}
    >
      <Space size="middle" style={{ marginBottom: "20px" }}>
        <FilterOutlined style={{ color: "#66c0f4", fontSize: "18px" }} />
        <Title level={4} style={{ color: "#fff", margin: 0, fontSize: "18px" }}>
          Refinar Resultados
        </Title>
      </Space>

      <Paragraph
        style={{ color: "#8f98a0", fontSize: "14px", fontStyle: "italic" }}
      >
        Painel de filtros
      </Paragraph>
    </div>
  );
}
