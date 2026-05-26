import { useState } from "react";
import { Typography, Row, Col, Space, Button, List, Grid } from "antd";
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
const { useBreakpoint } = Grid;

export default function TabelaJogos({ jogos }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalAvaliacaoVisible, setModalAvaliacaoVisible] = useState(false);
  const [jogoParaAvaliar, setJogoParaAvaliar] = useState(null);
  const screens = useBreakpoint();
  const isMobile = !screens.sm;
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
      <style>{`
        .tabela-titulo-link {
          color: #fff;
          transition: color 0.2s;
        }
        .tabela-titulo-link:hover {
          color: #66c0f4 !important;
        }
      `}</style>

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
                  <Link to={`/jogo/${jogo.id}`} aria-label={`Ver detalhes do jogo ${jogo.titulo}`}>
                    <img
                      src={jogo.capa}
                      alt={`Capa de ${jogo.titulo}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Link>
                  <div
                    aria-label={`Ranking de busca: número ${index + 1}`}
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

              <Col xs={24} sm={12} md={13} style={{ textAlign: isMobile ? "center" : "left" }}>
                <Space direction="vertical" size={6} style={{ width: "100%" }}>
                  <Link
                    to={`/jogo/${jogo.id}`}
                    style={{ display: "inline-block", textDecoration: "none" }}
                  >
                    <Title
                      level={3}
                      className="tabela-titulo-link"
                      style={{
                        margin: 0,
                        fontSize: "22px",
                        fontWeight: "700",
                      }}
                    >
                      {jogo.titulo}
                    </Title>
                  </Link>

                  <Space 
                    size="large" 
                    style={{ 
                      alignItems: "center", 
                      justifyContent: isMobile ? "center" : "flex-start",
                      width: "100%"
                    }}
                  >
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

              <Col xs={24} sm={6} md={6} style={{ textAlign: isMobile ? "center" : "right" }}>
                <Row justify={isMobile ? "center" : "end"} align="middle" gutter={[24, 12]}>
                  <Col style={{ textAlign: "center", minWidth: "60px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <StarFilled aria-hidden="true" style={{ color: "#f5c518", fontSize: "18px" }} />
                      <Text strong aria-label={`Nota média: ${jogo.notaMedia.toFixed(1)}`} style={{ color: "#fff", fontSize: "18px" }}>
                        {jogo.notaMedia.toFixed(1)}
                      </Text>
                    </div>
                  </Col>
                  
                  <Col>
                    <Space size="middle">
                      <Button
                        type="text"
                        aria-label={`Avaliar o jogo ${jogo.titulo}`}
                        icon={<StarOutlined aria-hidden="true" style={{ color: "#5799ef" }} />}
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
                        aria-label={`Ver detalhes de ${jogo.titulo}`}
                        icon={
                          <InfoCircleOutlined aria-hidden="true" style={{ color: "#8f98a0" }} />
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