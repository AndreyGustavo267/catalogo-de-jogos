import { Typography, Row, Col, Space, Button, message, Grid } from "antd";
import { StarFilled, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import db from "../../assets/data.json";
import { AuthContext } from "../../contexts/AuthContext";

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export default function Top10Jogos() {
  // 1. A MÁGICA: Puxamos as funções prontas do nosso AuthContext!
  const { user, toggleFavorito, checkIsFavorito } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // (Opcional, mas recomendado) Trazendo de volta a responsividade do Grid que tínhamos feito
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const sortedGames = [...db.jogos].sort((a, b) => b.notaMedia - a.notaMedia);
  const top3 = sortedGames.slice(0, 3);
  const bottom7 = sortedGames.slice(3, 10);

  // 2. FUNÇÃO SIMPLIFICADA: O Contexto faz todo o trabalho de salvar no localStorage agora
  const handleToggleFavorito = (e, jogo) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      message.warning("Inicie sessão para adicionar jogos aos favoritos.");
      navigate("/login");
      return;
    }

    // Chama a função global que criámos no AuthContext
    const result = toggleFavorito(jogo);
    
    // Exibe a mensagem correta dependendo se adicionou ou removeu
    if (result.isFav) {
      message.success(result.message);
    } else {
      message.info(result.message);
    }
  };

  const renderTopCard = (jogo, rank, isFirst) => {
    if (!jogo) return null;

    // Usamos a função global do Contexto para ver se o coração deve ficar vermelho
    const isFav = checkIsFavorito(jogo.id);

    return (
      <Link
        key={jogo.id}
        to={`/jogo/${jogo.id}`}
        style={{ display: "block", height: "100%", textDecoration: "none" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            background: "#1a1f26",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.transform = "translateY(-4px)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              background: `url(${jogo.capa}) center/cover no-repeat`,
              position: "relative",
            }}
          ></div>

          <div
            style={{
              flex: 1,
              padding: "20px 16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                background: "#66c0f4",
                color: "#fff",
                width: "fit-content",
                padding: "2px 10px",
                borderRadius: "4px",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              #{rank}
            </div>

            <Title
              level={4}
              style={{
                color: "#fff",
                margin: "0 0 8px 0",
                fontSize: isFirst ? "22px" : "18px",
              }}
            >
              {jogo.titulo}
            </Title>

            <Space
              style={{
                color: "#8f98a0",
                fontSize: "13px",
                marginBottom: "12px",
              }}
            >
              <span>{new Date(jogo.dataLancamento).getFullYear()}</span>
              <span>•</span>
              <span>{jogo.generos[0]}</span>
            </Space>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <StarFilled style={{ color: "#f5c518", fontSize: "16px" }} />
              <Text strong style={{ color: "#fff", fontSize: "16px" }}>
                {jogo.notaMedia.toFixed(1)}
              </Text>
            </div>

            <Button
              type="text"
              icon={isFav ? <HeartFilled style={{ color: "#ff4d4f" }} /> : <HeartOutlined />}
              onClick={(e) => handleToggleFavorito(e, jogo)}
              style={{
                color: isFav ? "#ff4d4f" : "#66c0f4",
                padding: 0,
                justifyContent: "flex-start",
                marginBottom: "12px",
              }}
            >
              {isFav ? "Nos Favoritos" : "Marcar como favorito"}
            </Button>

            <Paragraph
              style={{
                color: "#c7d5e0",
                fontSize: "13px",
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: isFirst ? 4 : 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {jogo.sinopse}
            </Paragraph>
          </div>
        </div>
      </Link>
    );
  };

  const renderBottomCard = (jogo, rank) => {
    return (
      <Link
        key={jogo.id}
        to={`/jogo/${jogo.id}`}
        style={{ textDecoration: "none" }}
      >
        <div
          style={{
            background: "#1a1f26",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            transition: "transform 0.2s",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9", 
              background: `url(${jogo.capa}) center/cover no-repeat`,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                background: "#66c0f4",
                color: "#fff",
                padding: "2px 8px",
                borderBottomRightRadius: "4px",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              #{rank}
            </div>
          </div>

          <div
            style={{
              padding: "12px 8px",
              flex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: "13px",
                fontWeight: "600",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {jogo.titulo}
            </Text>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", paddingBottom: "60px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={10}>
          {renderTopCard(top3[0], 1, true)}
        </Col>

        <Col xs={24} lg={7}>
          {renderTopCard(top3[1], 2, false)}
        </Col>
        <Col xs={24} lg={7}>
          {renderTopCard(top3[2], 3, false)}
        </Col>
      </Row>
      
      {bottom7.length > 0 && (
        <div
          style={{
            display: "grid",
            // 3. Devolvi a responsividade para os telemóveis aqui!
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(7, 1fr)",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          {bottom7.map((jogo, index) => renderBottomCard(jogo, index + 4))}
        </div>
      )}
    </div>
  );
}