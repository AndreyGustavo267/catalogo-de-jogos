import { Carousel, Typography, Space, Grid } from "antd";
import { LeftOutlined, RightOutlined, StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import db from "../../assets/data.json";
import Generos from "../common/Generos";
import Plataformas from "../common/Plataformas";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const CustomLeftArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      aria-label="Destaque anterior"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "100%",
        left: 0,
        zIndex: 2,
        background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 100%)",
        border: "none",
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      <LeftOutlined aria-hidden="true" style={{ fontSize: "32px", color: "#fff", opacity: 0.8 }} />
    </button>
  );
};

const CustomRightArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      aria-label="Próximo destaque"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "100%",
        right: 0,
        zIndex: 2,
        background: "linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 100%)",
        border: "none",
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      <RightOutlined aria-hidden="true" style={{ fontSize: "32px", color: "#fff", opacity: 0.8 }} />
    </button>
  );
};

export default function CarrosselDestaques() {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const top5Games = [...db.jogos]
    .sort((a, b) => new Date(b.dataLancamento) - new Date(a.dataLancamento))
    .slice(0, 5);

  return (
    <div style={{ width: "100%", margin: "0 auto", paddingBottom: "60px" }}>
      <Title
        level={2}
        style={{
          color: "#fff",
          borderLeft: "4px solid #f5c518",
          paddingLeft: "12px",
          marginBottom: "24px",
          fontSize: "28px",
          fontWeight: "normal",
          marginTop: 0
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
                flexDirection: isMobile ? "column" : "row", 
                height: isMobile ? "auto" : "450px",
                minHeight: isMobile ? "500px" : "auto",
                width: "100%",
                backgroundColor: "#0a141d",
                borderRadius: "25px",
                border: "5px solid rgba(255, 255, 255, 0.05)",
                overflow: "hidden",
                textDecoration: "none",
              }}
            >
              <Link
                to={`/jogo/${jogo.id}`}
                aria-label={`Ver página do jogo ${jogo.titulo}`}
                style={{
                  flex: isMobile ? "none" : "0 0 65%",
                  width: isMobile ? "100%" : "65%",
                  height: isMobile ? "250px" : "100%",
                  display: "block",
                }}
              >
                <img 
                  src={jogo.capa} 
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
                />
              </Link>

              <div
                style={{
                  flex: isMobile ? "none" : "0 0 35%",
                  width: isMobile ? "100%" : "35%",
                  padding: isMobile ? "24px 20px" : "40px 32px",
                  background: isMobile 
                    ? "linear-gradient(to bottom, #0e151d 0%, #16202d 100%)" 
                    : "linear-gradient(to right, #0e151d 0%, #16202d 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Link to={`/jogo/${jogo.id}`} style={{ textDecoration: "none" }}>
                  <Title
                    level={3} 
                    className="destaque-titulo-link"
                    style={{
                      margin: 0,
                      marginBottom: "28px",
                      fontSize: isMobile ? "28px" : "34px",
                      lineHeight: "1.1",
                    }}
                  >
                    {jogo.titulo}
                  </Title>
                </Link>

                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: "100%" }}
                >
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
                    <StarFilled aria-hidden="true" style={{ color: "#f5c518", fontSize: "26px" }} />
                    <Text strong aria-label={`Nota ${jogo.notaMedia.toFixed(1)}`} style={{ color: "#fff", fontSize: "26px" }}>
                      {jogo.notaMedia.toFixed(1)}
                    </Text>
                  </div>

                  <div>
                    <Generos generos={jogo.generos} />
                  </div>

                  <div style={{ marginTop: isMobile ? "12px" : "24px" }}>
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