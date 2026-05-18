import CarrosselDestaques from "../components/home/CarrosselDestaques";
import CarrosselCategorias from "../components/home/CarrosselCategorias";
import Top10Jogos from "../components/home/Top10Jogos";
import { Typography } from "antd";

const { Title } = Typography;

export default function HomePage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <CarrosselDestaques />

      <div style={{ marginTop: "20px" }}>
        <Title
          level={4}
          style={{
            color: "#fff",
            borderLeft: "4px solid #f5c518",
            paddingLeft: "12px",
            marginBottom: "24px",
            fontSize: "28px",
            fontWeight: "normal",
          }}
        >
          Categorias
        </Title>
        <CarrosselCategorias />
      </div>

      {/* Seção Top 10 */}
      <div style={{ marginTop: "60px" }}>
        <Title
          level={4}
          style={{
            color: "#fff",
            borderLeft: "4px solid #f5c518",
            paddingLeft: "12px",
            marginBottom: "24px",
            fontSize: "28px",
            fontWeight: "normal",
          }}
        >
          Top 10 no IGDb esta semana
        </Title>
        <Top10Jogos />
      </div>
    </div>
  );
}
