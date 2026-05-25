import { Typography, Space } from "antd";
import { StarFilled } from "@ant-design/icons";

import Generos from "../common/Generos";
import Plataformas from "../common/Plataformas";

const { Title, Text, Paragraph } = Typography;

export default function PainelJogo({ jogo }) {
  return (
    <div style={{ width: "100%", margin: "0 auto", paddingBottom: "50px" }}>
      <div style={{ margin: "10px" }}>
        <Title
          level={2}
          style={{
            color: "#fff",
            marginTop: 0,
            marginBottom: "10px",
            fontSize: "25px",
            lineHeight: "1.1",
          }}
        >
          {jogo.titulo}
        </Title>
      </div>
      <div
        style={{
          display: "flex",
          minHeight: "500px",
          width: "100%",
          backgroundColor: "#0a141d",
          borderRadius: "25px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            flex: "0 0 65%",
            background: `url(${jogo.capa}) center/cover no-repeat`,
          }}
        />
        <div
          style={{
            flex: "0 0 35%",
            padding: "30px",
            background: "linear-gradient(to right, #0e151d 0%, #16202d 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src={jogo.capa}
            alt={`Banner de ${jogo.titulo}`}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              marginBottom: "20px",
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
            {/* Avaliação */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Text style={{ color: "#c7d5e0", fontSize: "18px" }}>
                Avaliação IGDb:
              </Text>
              <StarFilled style={{ color: "#f5c518", fontSize: "26px" }} />
              <Text strong style={{ color: "#fff", fontSize: "26px" }}>
                {jogo.notaMedia.toFixed(1)}
              </Text>
            </div>
            <div>
              <Generos generos={jogo.generos} />
            </div>
            <div style={{ marginTop: "12px" }}>
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
  );
}
