import { Table, Typography, Space } from "antd"; // Removido o import 'Rate' que não estava em uso
import { StarFilled } from "@ant-design/icons";
import db from "../assets/data.json";

const { Title, Text } = Typography;

export default function TopGames() {
  const top50Jogos = [...db.jogos]
    .sort((a, b) => b.notaMedia - a.notaMedia)
    .slice(0, 50);

  const dataSource = top50Jogos.map((jogo, index) => ({
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
          <Text type="secondary" style={{ fontSize: "16px", minWidth: "24px" }}>
            {record.rank}.
          </Text>
          <img
            src={record.capa}
            alt={`Capa do jogo ${text}`}
            style={{ width: 50, borderRadius: 4, objectFit: "cover" }}
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
          <StarFilled aria-hidden="true" style={{ color: "#f5c518", fontSize: "18px" }} />
          <Text strong style={{ fontSize: "16px", color: "#fff" }}>
            {nota.toFixed(1)}
          </Text>
        </Space>
      ),
    },
  ];

  return (
    <main aria-labelledby="titulo-top-games" style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 20px" }}>
      
      <Title id="titulo-top-games" level={1} style={{ color: "#fff", marginBottom: "8px", fontSize: "32px" }}>
        Top 50 Melhores Jogos
      </Title>
      
      <Text type="secondary" style={{ display: "block", marginBottom: "32px", fontSize: "16px" }}>
        Conforme avaliado pelos usuários do IGDb.
      </Text>

      <section aria-label="Tabela de classificação">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey="key"
          scroll={{ x: 'max-content' }} 
        />
      </section>
    </main>
  );
}