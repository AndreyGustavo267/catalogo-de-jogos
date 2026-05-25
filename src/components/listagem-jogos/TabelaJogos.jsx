import { useState } from "react"; // <-- Certifique-se de importar o useState
import { Typography, Row, Col, Space, Button, List } from "antd";
import {
  StarFilled,
  StarOutlined,
  InfoCircleOutlined,
  WindowsOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import ModalDetalheJogo from "./ModalDetalheJogo";

const { Title, Text } = Typography;

// Reutilizando nossa lógica de ícones da Steam
const renderPlatformIcon = (plataforma) => {
  const platLower = plataforma.toLowerCase();

  if (platLower.includes("pc") || platLower.includes("windows")) {
    return (
      <WindowsOutlined
        key={plataforma}
        style={{ fontSize: "20px", color: "#8f98a0" }}
        title={plataforma}
      />
    );
  }
  if (platLower.includes("mac")) {
    return (
      <AppleOutlined
        key={plataforma}
        style={{ fontSize: "22px", color: "#8f98a0", marginBottom: "2px" }}
        title={plataforma}
      />
    );
  }
  if (platLower.includes("playstation") || platLower.includes("ps")) {
    return (
      <span
        key={plataforma}
        style={{
          color: "#8f98a0",
          fontSize: "14px",
          fontWeight: "900",
          letterSpacing: "-1px",
        }}
        title={plataforma}
      >
        PS
      </span>
    );
  }
  if (platLower.includes("xbox")) {
    return (
      <span
        key={plataforma}
        style={{
          color: "#8f98a0",
          fontSize: "14px",
          fontWeight: "900",
          letterSpacing: "-0.5px",
        }}
        title={plataforma}
      >
        Xbox
      </span>
    );
  }

  return (
    <span
      key={plataforma}
      style={{ color: "#8f98a0", fontSize: "13px", fontWeight: "bold" }}
      title={plataforma}
    >
      {plataforma}
    </span>
  );
};

export default function TabelaJogos({ jogos, titulo, subtitulo }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleOpenDetails = (jogo) => {
    setSelectedGame(jogo);
    setModalVisible(true);
  };

  const handleOpenRate = (jogoId) => {
    console.log("Abrir modal de avaliação do jogo:", jogoId);
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={jogos}
        locale={{
          emptyText: (
            <Text style={{ color: "#8f98a0", fontSize: "16px" }}>
              Nenhum jogo encontrado com estes filtros.
            </Text>
          ),
        }}
        renderItem={(jogo, index) => (
          <div
            style={{
              background: "rgba(26, 31, 38, 0.5)",
              borderRadius: "8px",
              marginBottom: "12px",
              padding: "14px 20px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <Row gutter={[24, 16]} align="middle">
              {/* COLUNA 1: CAPA HORIZONTAL E RANK */}
              <Col xs={24} sm={6} md={5}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/9",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={jogo.capa}
                    alt={jogo.titulo}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      background: "#0060f0",
                      color: "#fff",
                      padding: "2px 10px",
                      fontWeight: "bold",
                      fontSize: "14px",
                      borderBottomRightRadius: "4px",
                    }}
                  >
                    #{index + 1}
                  </div>
                </div>
              </Col>

              {/* COLUNA 2: TÍTULO, ANO E ÍCONES DE PLATAFORMAS */}
              <Col xs={24} sm={12} md={13}>
                <Space direction="vertical" size={6} style={{ width: "100%" }}>
                  <Title
                    level={3}
                    style={{
                      color: "#fff",
                      margin: 0,
                      fontSize: "22px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpenDetails(jogo.id)}
                    onMouseOver={(e) => (e.target.style.color = "#66c0f4")}
                    onMouseOut={(e) => (e.target.style.color = "#fff")}
                  >
                    {jogo.titulo}
                  </Title>

                  <Space size="large" style={{ alignItems: "center" }}>
                    <Text style={{ color: "#8f98a0", fontSize: "15px" }}>
                      {new Date(jogo.dataLancamento).getFullYear()}
                    </Text>

                    {/* Alinhamento de ícones horizontal igual ao carrossel */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      {jogo.plataformas.map((plat) => renderPlatformIcon(plat))}
                    </div>
                  </Space>
                </Space>
              </Col>

              {/* COLUNA 3: NOTA, BOTÃO AVALIAR E BOTÃO DETALHES */}
              <Col xs={24} sm={6} md={6} style={{ textAlign: "right" }}>
                <Row justify="end" align="middle" gutter={[24, 0]}>
                  {/* Bloco de Avaliação Média */}
                  <Col style={{ textAlign: "center", minWidth: "60px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContext: "flex-end",
                        gap: "6px",
                      }}
                    >
                      <StarFilled
                        style={{ color: "#f5c518", fontSize: "18px" }}
                      />
                      <Text strong style={{ color: "#fff", fontSize: "18px" }}>
                        {jogo.notaMedia.toFixed(1)}
                      </Text>
                    </div>
                  </Col>

                  {/* Ações interativas em formato de botões de texto discretos (estilo IMDb) */}
                  <Col>
                    <Space size="middle">
                      <Button
                        type="text"
                        icon={<StarOutlined style={{ color: "#5799ef" }} />}
                        style={{
                          color: "#5799ef",
                          fontWeight: "600",
                          padding: "0 4px",
                        }}
                        onClick={() => handleOpenRate(jogo.id)}
                      >
                        Avaliar
                      </Button>

                      <Button
                        type="text"
                        icon={
                          <InfoCircleOutlined style={{ color: "#8f98a0" }} />
                        }
                        style={{ color: "#8f98a0", padding: "0 4px" }}
                        onClick={() => handleOpenDetails(jogo)}
                      >
                        Detalhes
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      />
      <ModalDetalheJogo
        jogo={selectedGame}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}
