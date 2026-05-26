import CarrosselDestaques from "../components/home/CarrosselDestaques";
import CarrosselCategorias from "../components/home/CarrosselCategorias";
import Top10Jogos from "../components/home/Top10Jogos";
import { Typography } from "antd";

const { Title } = Typography;

export default function HomePage() {
  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}>
      
      <section aria-label="Destaques Recentes">
        <CarrosselDestaques />
      </section>

      <section aria-labelledby="titulo-categorias" style={{ marginTop: "40px" }}>
        <Title
          id="titulo-categorias"
          level={2}
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
      </section>

      <section aria-labelledby="titulo-top10" style={{ marginTop: "60px", paddingBottom: "60px" }}>
        <Title
          id="titulo-top10"
          level={2}
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
      </section>
      
    </main>
  );
}