import { useParams } from "react-router-dom";
import db from "../assets/data.json";
import PainelJogo from "../components/jogo/PainelJogo";

export default function GamePage() {
    const { id } = useParams();
    const jogoEncontrado = db.jogos.find((jogo) => jogo.id === id);

    if (jogoEncontrado) {
      return (
        <PainelJogo jogo={jogoEncontrado}/>
      );
    } else {
      return (
        <h1>Jogo inexistente</h1>
      );
    }
}