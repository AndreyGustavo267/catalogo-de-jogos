import { useSearchParams } from "react-router-dom";
import { Row, Col } from "antd";
import TabelaJogos from "../components/listagem-jogos/TabelaJogos";
import FiltrosLaterais from "../components/listagem-jogos/FiltrosLaterais";
import db from "../assets/data.json";

export default function ListagemJogos() {
  const [searchParams] = useSearchParams();
  const categoriaFiltro = searchParams.get("categoria");
  const buscaFiltro = searchParams.get("busca");

  let jogosFiltrados = [...db.jogos];
  let tituloPagina = "Top 50 Melhores Jogos";
  let subtituloPagina = "Conforme avaliado pelos usuários do IGDb.";

  if (categoriaFiltro) {
    jogosFiltrados = jogosFiltrados.filter((j) =>
      j.generos.some((g) => g.toLowerCase() === categoriaFiltro.toLowerCase()),
    );
    tituloPagina = `Jogos de ${categoriaFiltro}`;
    subtituloPagina = `Lista de títulos marcados como ${categoriaFiltro}.`;
  } else if (buscaFiltro) {
    jogosFiltrados = jogosFiltrados.filter((j) =>
      j.titulo.toLowerCase().includes(buscaFiltro.toLowerCase()),
    );
    tituloPagina = `Resultados para: "${buscaFiltro}"`;
    subtituloPagina = `Encontramos ${jogosFiltrados.length} títulos correspondentes.`;
  } else {
    jogosFiltrados.sort((a, b) => b.notaMedia - a.notaMedia);
    jogosFiltrados = jogosFiltrados.slice(0, 50);
  }

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "40px 20px 80px 20px",
      }}
    >
      <Row gutter={[40, 0]}>
        {/* Tabela do IMDb ocupando 75% da largura */}
        <Col xs={24} lg={18}>
          <TabelaJogos
            jogos={jogosFiltrados}
            titulo={tituloPagina}
            subtitulo={subtituloPagina}
          />
        </Col>

        {/* Filtros da Steam ocupando 25% da largura */}
        <Col xs={24} lg={6}>
          <FiltrosLaterais />
        </Col>
      </Row>
    </div>
  );
}
