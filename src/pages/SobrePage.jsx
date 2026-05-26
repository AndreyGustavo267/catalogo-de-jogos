import { Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

export default function SobrePage() {
  return (
    <main 
      aria-labelledby="titulo-sobre" 
      style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", color: "#c7d5e0" }}
    >
      <Title id="titulo-sobre" level={1} style={{ color: "#fff" }}>
        Sobre o IGDb
      </Title>
      
      <Divider style={{ borderColor: "#2a475e" }} />
      
      <Paragraph style={{ color: "#c7d5e0", fontSize: "16px", lineHeight: "1.8" }}>
        O <strong>Internet Game Database (IGDb)</strong> é um projeto acadêmico desenvolvido para a disciplina SPODWE2. Nosso objetivo é criar um catálogo colaborativo onde os usuários podem descobrir, avaliar e registrar seus jogos favoritos.
      </Paragraph>
      
      <Paragraph style={{ color: "#c7d5e0", fontSize: "16px", lineHeight: "1.8" }}>
        Inspirado em gigantes como IMDb e Steam, o IGDb traz uma interface escura e moderna, focada em destacar a arte gráfica dos jogos e facilitar a navegação do usuário.
      </Paragraph>
    </main>
  );
}