import { useParams, Link } from "react-router-dom";
import { Typography, Button } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import db from "../assets/data.json";
import PainelJogo from "../components/jogo/PainelJogo";

const { Title, Text } = Typography;

export default function GamePage() {
    const { id } = useParams();
    const jogoEncontrado = db.jogos.find((jogo) => jogo.id === id);

    if (jogoEncontrado) {
      return (
        <PainelJogo jogo={jogoEncontrado} />
      );
    } 
    
    return (
      <main 
        aria-labelledby="titulo-jogo-inexistente"
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          minHeight: "50vh",
          padding: "40px 20px",
          textAlign: "center" 
        }}
      >
        <FrownOutlined aria-hidden="true" style={{ fontSize: "64px", color: "#66c0f4", marginBottom: "24px" }} />
        
        <Title id="titulo-jogo-inexistente" level={1} style={{ color: "#fff", margin: 0 }}>
          Jogo não encontrado
        </Title>
        
        <Text style={{ color: "#8f98a0", fontSize: "16px", display: "block", marginTop: "12px", marginBottom: "32px" }}>
          Ops! O jogo que você está procurando não existe ou foi removido do catálogo.
        </Text>
        
        <Link to="/">
          <Button 
            type="primary" 
            size="large" 
            style={{ 
              background: "#66c0f4", 
              color: "#0a141d", 
              fontWeight: "bold", 
              border: "none",
              borderRadius: "24px",
              padding: "0 32px",
              height: "45px"
            }}
          >
            Voltar ao Catálogo
          </Button>
        </Link>
      </main>
    );
}