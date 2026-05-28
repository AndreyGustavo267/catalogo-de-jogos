import { Carousel, Typography, Space } from "antd";
import { LeftOutlined, RightOutlined, StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import db from "../../assets/data.json";

// 1. IMPORTAMOS OS COMPONENTES PADRONIZADOS
import Generos from "../common/Generos";
import Plataformas from "../common/Plataformas";

const { Title, Text } = Typography;

// Seta Esquerda Customizada
const CustomLeftArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "100%",
        left: 0,
        zIndex: 2,
        borderTopLeftRadius: "25px",
        borderBottomLeftRadius: "25px",
        background:
          "linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 100%)",
      }}
      onClick={onClick}
    >
      <LeftOutlined style={{ fontSize: "32px", color: "#fff", opacity: 0.8 }} />
    </div>
  );
};

// Seta Direita Customizada
const CustomRightArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "100%",
        right: 0,
        zIndex: 2,
        borderTopRightRadius: "25px",
        borderBottomRightRadius: "25px",
        background:
          "linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 100%)",
      }}
      onClick={onClick}
    >
      <RightOutlined
        style={{ fontSize: "32px", color: "#fff", opacity: 0.8 }}
      />
    </div>
  );
};

// A FUNÇÃO renderPlatformIcon FOI TOTALMENTE DELETADA DAQUI!

export default function CarrosselDestaques() {
  // Ordenar os jogos pela data de lançamento (mais recentes primeiro) e pegar os 5 primeiros
  const top5Games = [...db.jogos]
    .sort((a, b) => new Date(b.dataLancamento) - new Date(a.dataLancamento))
    .slice(0, 5);

  return (
    <div style={{ width: "100%", margin: "0 auto", paddingBottom: "50px" }}>
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
        Destaques Recentes
      </Title>

      <Carousel
        autoplay
        effect="fade"
        arrows
        prevArrow={<CustomLeftArrow />}
        nextArrow={<CustomRightArrow />}
        className="steam-carousel"
      >
        {top5Games.map((jogo) => (
          <div key={jogo.id}>
            <div
              style={{
                display: "flex",
                height: "450px",
                width: "100%",
                backgroundColor: "#0a141d",
                borderRadius: "25px",
                border: "2px solid rgba(255, 255, 255, 0.05)",
                overflow: "hidden",
                textDecoration: "none",
              }}
            >
              {/* LADO ESQUERDO: Imagem do Jogo que funciona como Link para os detalhes */}
              <Link
                to={`/jogo/${jogo.id}`}
                style={{
                  flex: "0 0 65%",
                  background: `url(${jogo.capa}) center/cover no-repeat`,
                  display: "block",
                }}
              />

              {/* LADO DIREITO: Painel de Informações com Gradiente */}
              <div
                style={{
                  flex: "0 0 35%",
                  padding: "40px 32px",
                  background:
                    "linear-gradient(to right, #0e151d 0%, #16202d 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* Título Clicável */}
                <Link to={`/jogo/${jogo.id}`}>
                  <Title
                    level={2}
                    style={{
                      color: "#fff",
                      marginTop: 0,
                      marginBottom: "28px",
                      fontSize: "34px",
                      lineHeight: "1.1",
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "#66c0f4")
                    }
                    onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
                  >
                    {jogo.titulo}
                  </Title>
                </Link>

                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: "100%" }}
                >
                  {/* Avaliação */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    <Text style={{ color: "#c7d5e0", fontSize: "18px" }}>
                      Avaliação IGDb:
                    </Text>
                    <StarFilled
                      style={{ color: "#f5c518", fontSize: "26px" }}
                    />{" "}
                    <Text strong style={{ color: "#fff", fontSize: "26px" }}>
                      {jogo.notaMedia.toFixed(1)}
                    </Text>
                  </div>

                  {/* 2. SUBSTITUÍMOS O MAP DE TAGS ANTIGO PELO NOSSO COMPONENTE */}
                  <div>
                    <Generos generos={jogo.generos} />
                  </div>

                  {/* 3. SUBSTITUÍMOS OS ÍCONES MANUAIS PELO NOSSO COMPONENTE */}
                  <div style={{ marginTop: "24px" }}>
                    <Text
                      style={{
                        color: "#7a858f",
                        fontSize: "15px",
                        display: "block",
                        marginBottom: "12px",
                        fontWeight: "600",
                      }}
                    >
                      Já disponível para:
                    </Text>
                    <div>
                      <Plataformas plataformas={jogo.plataformas} />
                    </div>
                  </div>
                </Space>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
