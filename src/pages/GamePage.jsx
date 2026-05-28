import { useParams } from "react-router-dom";
import db from "../assets/data.json";
import PainelJogo from "../components/jogo/PainelJogo";
import TabelaJogos from "../components/listagem-jogos/TabelaJogos";
import NotFoundPage from "../pages/NotFoundPage";


export default function GamePage() {
    const { id } = useParams();
    const jogoEncontrado = db.jogos.find((jogo) => jogo.id === id);

    if (jogoEncontrado) {
      const jogosDesenvolvedora = db.jogos.filter((j) => j.desenvolvedoraID === jogoEncontrado.desenvolvedoraID && j.id !== jogoEncontrado.id).slice(0, 5)

      return (
        <div style={{ maxWidth: "85rem", margin: "0 auto", paddingBottom: "40px" }}>

          <PainelJogo jogo={jogoEncontrado}/>

          {/* <div style={{ marginTop:"60px" }}>
            <title>Outros jogos da desenvolvedora {jogoEncontrado.desenvolvedoraID}</title>
            <TabelaJogos jogos={jogosDesenvolvedora} />
          </div> */}
        </div>
      );
    } else {
      return (
        <div>
          <NotFoundPage />
        </div>
      );
    }
}