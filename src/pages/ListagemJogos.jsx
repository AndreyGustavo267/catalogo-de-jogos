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
      novosParametros.delete(chave); // Limpa o parâmetro se for vazio ou "todos"
    }
    setSearchParams(novosParametros);
  };

  let jogosFiltrados = [...db.jogos];

  // 1. Filtro de Busca
  if (buscaFiltro) {
    jogosFiltrados = jogosFiltrados.filter((j) =>
      j.titulo.toLowerCase().includes(buscaFiltro.toLowerCase()),
    );
  }

  // 2. Filtro de Categoria
  if (categoriasAtivas.length > 0) {
    jogosFiltrados = jogosFiltrados.filter((j) =>
      j.generos.some((g) => categoriasAtivas.includes(g)),
    );
  }

  // 3. Filtro de Plataforma
  if (plataformasAtivas.length > 0) {
    jogosFiltrados = jogosFiltrados.filter((j) =>
      j.plataformas.some((p) => plataformasAtivas.includes(p)),
    );
  }

  // 4. Filtro de Preço (Modelo de Negócio)
  if (modeloParam !== "todos") {
    jogosFiltrados = jogosFiltrados.filter(
      (j) => j.modeloNegocio === modeloParam,
    );
  }

  // 5. Ordenação
  if (ordemParam === "nota") {
    jogosFiltrados.sort((a, b) => b.notaMedia - a.notaMedia);
  } else if (ordemParam === "recentes") {
    jogosFiltrados.sort(
      (a, b) => new Date(b.dataLancamento) - new Date(a.dataLancamento),
    );
  } else if (ordemParam === "alfabetica") {
    jogosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
  }

  // 6. Aplicação do Limite
  if (limiteParam !== "todos") {
    const limiteNum = parseInt(limiteParam, 10);
    // Só corta a lista se for um número válido
    if (!isNaN(limiteNum) && limiteNum > 0) {
      jogosFiltrados = jogosFiltrados.slice(0, limiteNum);
    }
  }

  // Textos Dinâmicos
  let tituloPagina = buscaFiltro
    ? `Resultados para "${buscaFiltro}"`
    : "Explorar Jogos";
  let subtituloPagina = `Exibindo ${jogosFiltrados.length} resultados.`;

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "40px 20px 80px 20px",
      }}
    >
      {/* Título movido para cá para garantir o alinhamento perfeito do Grid abaixo */}
      <div style={{ marginBottom: "32px" }}>
        <Title
          level={2}
          style={{ color: "#fff", fontSize: "36px", marginBottom: "8px" }}
        >
          {tituloPagina}
        </Title>
        <Text style={{ color: "#8f98a0", fontSize: "16px" }}>
          {subtituloPagina}
        </Text>
      </div>

      <Row gutter={[40, 0]}>
        <Col xs={24} lg={18}>
          <TabelaJogos jogos={jogosFiltrados} />
        </Col>

        <Col xs={24} lg={6}>
          <FiltrosLaterais
            categoriasAtivas={categoriasAtivas}
            plataformasAtivas={plataformasAtivas}
            ordemAtual={ordemParam}
            modeloAtual={modeloParam}
            limiteAtual={limiteParam}
            onChangeFiltro={handleAtualizarFiltro}
          />
        </Col>
      </Row>
    </div>
  );
}
