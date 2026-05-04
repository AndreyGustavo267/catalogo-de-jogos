import { Table, Typography, Space, Rate } from "antd";
import { StarFilled } from "@ant-design/icons";
import db from "../assets/data.json";

const { Title, Text } = Typography;

export default function TopGames() {
  const dataSource = db.jogos.map((jogo, index) => ({
    key: jogo.id,
    rank: index + 1,
    capa: jogo.capa,
    titulo: jogo.titulo,
    ano: new Date(jogo.dataLancamento).getFullYear(),
    nota: jogo.notaMedia,
  }));

  const columns = [
    {
      title: "Rank & Título",
      dataIndex: "titulo",
      key: "titulo",
      render: (text, record) => (
        <Space size="middle">
          <Text type="secondary" style={{ fontSize: "16px" }}>
            {record.rank}.
          </Text>
          <img
            src={record.capa}
            alt={`Capa do jogo ${text}`}
            style={{ width: 50, borderRadius: 4 }}
          />
          <Space direction="vertical" size={0}>
            <Text strong style={{ fontSize: "16px", color: "#fff" }}>
              {text}
            </Text>
            <Text type="secondary">{record.ano}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Avaliação IGDb",
      dataIndex: "nota",
      key: "nota",
      align: "right",
      render: (nota) => (
        <Space size="small">
          <StarFilled style={{ color: "#f5c518", fontSize: "18px" }} />
          <Text strong style={{ fontSize: "16px" }}>
            {nota.toFixed(1)}
          </Text>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", paddingTop: "20px" }}>
      <Title level={2} style={{ color: "#fff", marginBottom: "24px" }}>
        Top 50 Melhores Jogos
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: "24px" }}>
        Conforme avaliado pelos usuários do IGDb.
      </Text>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="key"
      />
    </div>
  );
}
