import { useState } from "react";
import { Typography, Row, Col, Space, Button, List } from "antd";
import {
  StarFilled,
  StarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import ModalDetalheJogo from "./ModalDetalheJogo";
import Plataformas from "../common/Plataformas";
import ModalAvaliacoes from "./ModalAvaliacoes";

const { Title, Text } = Typography;

export default function TabelaJogos({ jogos }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const [modalAvaliacaoVisible, setModalAvaliacaoVisible] = useState(false);
  const [jogoParaAvaliar, setJogoParaAvaliar] = useState(null);

  const handleOpenDetails = (jogo) => {
    setSelectedGame(jogo);
    setModalVisible(true);
  };

  const handleOpenRate = (jogo) => {
    setJogoParaAvaliar(jogo);
    setModalAvaliacaoVisible(true);
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
                  <Link to={`/jogo/${jogo.id}`}>
                    <img
                      src={jogo.capa}
                      alt={jogo.titulo}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Link>
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
                      pointerEvents: "none",
                    }}
                  >
                    #{index + 1}
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={12} md={13}>
                <Space direction="vertical" size={6} style={{ width: "100%" }}>
                  <Link
                    to={`/jogo/${jogo.id}`}
                    style={{ display: "inline-block" }}
                  >
                    <Title
                      level={3}
                      style={{
                        color: "#fff",
                        margin: 0,
                        fontSize: "22px",
                        fontWeight: "700",
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

                  <Space size="large" style={{ alignItems: "center" }}>
                    <Text style={{ color: "#8f98a0", fontSize: "15px" }}>
                      {new Date(jogo.dataLancamento).getFullYear()}
                    </Text>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <Plataformas plataformas={jogo.plataformas} />
                    </div>
                  </Space>
                </Space>
              </Col>
              <Col xs={24} sm={6} md={6} style={{ textAlign: "right" }}>
                <Row justify="end" align="middle" gutter={[24, 0]}>
                  <Col style={{ textAlign: "center", minWidth: "60px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
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
                        onClick={() => handleOpenRate(jogo)}
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
      <ModalAvaliacoes
        jogo={jogoParaAvaliar}
        visible={modalAvaliacaoVisible}
        onClose={() => setModalAvaliacaoVisible(false)}
      />
    </div>
  );
}
