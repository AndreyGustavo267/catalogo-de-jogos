import { Typography, Space, Grid } from "antd";
import { StarFilled } from "@ant-design/icons";
import Generos from "../common/Generos";
import Plataformas from "../common/Plataformas";

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export default function PainelJogo({ jogo }) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <section aria-labelledby="titulo-painel-jogo" style={{ width: "100%", margin: "0 auto", paddingBottom: "50px" }}>
      <div style={{ margin: "10px 0" }}>
        <Title
          id="titulo-painel-jogo"
          level={1}
          style={{
            color: "#fff",
            marginTop: 0,
            marginBottom: "16px",
            fontSize: isMobile ? "24px" : "32px", 
            lineHeight: "1.1",
          }}
        >
          {jogo.titulo}
        </Title>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          minHeight: "500px",
          width: "100%",
          backgroundColor: "#0a141d",
          borderRadius: "25px",
          overflow: "hidden",
        }}
      >
        <img
          src={jogo.capa}
          alt={`Capa principal de ${jogo.titulo}`}
          style={{
            flex: isMobile ? "none" : "0 0 65%",
            width: isMobile ? "100%" : "65%",
            height: isMobile ? "250px" : "auto", 
            objectFit: "cover",
            display: "block"
          }}
        />

        <div
          style={{
            flex: isMobile ? "none" : "0 0 35%",
            width: isMobile ? "100%" : "35%",
            padding: isMobile ? "24px 20px" : "30px",
            background: isMobile 
              ? "linear-gradient(to bottom, #0e151d 0%, #16202d 100%)" 
              : "linear-gradient(to right, #0e151d 0%, #16202d 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src={jogo.capa}
            alt=""
            aria-hidden="true"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              marginBottom: "20px",
              display: isMobile ? "none" : "block",
            }}
          />

          <Paragraph
            style={{
              color: "#c7d5e0",
              fontSize: "15px",
              lineHeight: "1.5",
              marginBottom: "24px",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {jogo.sinopse}
          </Paragraph>

          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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

            <div style={{ marginTop: isMobile ? "0px" : "12px" }}>
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
    </section>
  );
}