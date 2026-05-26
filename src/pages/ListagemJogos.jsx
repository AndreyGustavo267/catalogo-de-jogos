import { useSearchParams } from "react-router-dom";
import { Row, Col, Typography } from "antd";
import TabelaJogos from "../components/listagem-jogos/TabelaJogos";
import FiltrosLaterais from "../components/listagem-jogos/FiltrosLaterais";
import db from "../assets/data.json";

const { Title, Text } = Typography;

export default function ListagemJogos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const buscaFiltro = searchParams.get("busca");
  const categoriasParam = searchParams.get("categorias");
  const plataformasParam = searchParams.get("plataformas");
  const ordemParam = searchParams.get("ordem") || "nota";
  const modeloParam = searchParams.get("modelo") || "todos";
  const limiteParam = searchParams.get("limite") || "todos";
  const categoriasAtivas = categoriasParam ? categoriasParam.split(",") : [];
  const plataformasAtivas = plataformasParam ? plataformasParam.split(",") : [];
  const handleAtualizarFiltro = (chave, valor) => {
    const novosParametros = new URLSearchParams(searchParams);
    if (valor && valor !== "todos" && valor.length > 0) {
      novosParametros.set(
        chave,
        Array.isArray(valor) ? valor.join(",") : valor,
      );
    } else {
      novosParametros.delete(chave);
    }
    setSearchParams(novosParametros);
  };

  let jogosFiltrados = [...db.jogos];

  if (buscaFiltro) {
    jogosFiltrados = jogosFiltrados.filter((j) =>
      j.titulo.toLowerCase().includes(buscaFiltro.toLowerCase()),
    );
  }

  if (categoriasAtivas.length > 0) {
    jogosFiltrados = jogosFiltrados.filter((j) =>
      j.generos.some((g) => categoriasAtivas.includes(g)),
    );
  }

  if (plataformasAtivas.length > 0) {
    jogosFiltrados = jogosFiltrados.filter((j) =>
      j.plataformas.some((p) => plataformasAtivas.includes(p)),
    );
  }

  if (modeloParam !== "todos") {
    jogosFiltrados = jogosFiltrados.filter(
      (j) => j.modeloNegocio === modeloParam,
    );
  }

  if (ordemParam === "nota") {
    jogosFiltrados.sort((a, b) => b.notaMedia - a.notaMedia);
  } else if (ordemParam === "recentes") {
    jogosFiltrados.sort(
      (a, b) => new Date(b.dataLancamento) - new Date(a.dataLancamento),
    );
  } else if (ordemParam === "alfabetica") {
    jogosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
  }

  if (limiteParam !== "todos") {
    const limiteNum = parseInt(limiteParam, 10);
    // Só corta a lista se for um número válido
    if (!isNaN(limiteNum) && limiteNum > 0) {
      jogosFiltrados = jogosFiltrados.slice(0, limiteNum);
    }
  }

  let tituloPagina = buscaFiltro
    ? `Resultados para "${buscaFiltro}"`
    : "Explorar Jogos";
  let subtituloPagina = `Exibindo ${jogosFiltrados.length} resultados.`;

  return (
    <main
      aria-labelledby="titulo-listagem-jogos"
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "40px 20px 80px 20px",
      }}
    >
      <div style={{ marginBottom: "32px" }}>
        <Title
          id="titulo-listagem-jogos"
          level={1}
          style={{ color: "#fff", fontSize: "36px", margin: "0 0 8px 0" }}
        >
          {tituloPagina}
        </Title>
        <Text style={{ color: "#8f98a0", fontSize: "16px" }}>
          {subtituloPagina}
        </Text>
      </div>

      <Row gutter={[40, 24]}>

        <Col xs={{ span: 24, order: 2 }} lg={{ span: 18, order: 1 }}>
          <section aria-label="Lista de jogos filtrados">
            <TabelaJogos jogos={jogosFiltrados} />
          </section>
        </Col>

        <Col xs={{ span: 24, order: 1 }} lg={{ span: 6, order: 2 }}>
          <aside aria-label="Filtros e ordenação">
            <FiltrosLaterais
              categoriasAtivas={categoriasAtivas}
              plataformasAtivas={plataformasAtivas}
              ordemAtual={ordemParam}
              modeloAtual={modeloParam}
              limiteAtual={limiteParam}
              onChangeFiltro={handleAtualizarFiltro}
            />
          </aside>
        </Col>
        
      </Row>
    </main>
  );
}