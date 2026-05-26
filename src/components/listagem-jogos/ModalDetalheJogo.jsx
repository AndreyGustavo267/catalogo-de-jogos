import React from "react";
import { Modal, Typography, Divider, Grid } from "antd";
import { CloseOutlined, RightOutlined, StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import db from "../../assets/data.json";
import Generos from "../common/Generos";
import Plataformas from "../common/Plataformas";

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export default function ModalDetalheJogo({ jogo, visible, onClose }) {
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  if (!jogo) return null;

  const dev = db.desenvolvedoras.find((d) => d.id === jogo.desenvolvedoraId);
  const nomeDev = dev ? dev.nome : "Desconhecida";

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closeIcon={
        <CloseOutlined aria-label="Fechar detalhes do jogo" style={{ color: "#8f98a0", fontSize: "18px" }} />
      }
      centered
      width={750}
      className="igdb-dark-modal"
      wrapClassName="igdb-dark-modal"
      styles={{
        mask: { background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(2px)" },
      }}
      modalRender={(node) =>
        React.cloneElement(node, {
          style: {
            ...node.props.style,
            background: "linear-gradient(180deg, #1e2c3a 0%, #0d131a 100%)",
            boxShadow:
              "0 0 80px rgba(87, 153, 239, 0.15), 0 20px 50px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
            padding: isMobile ? "40px 20px 30px 20px" : "50px 40px 40px 40px",
            overflow: "visible",
          },
        })
      }
    >
      <style>{`
        .link-titulo-jogo {
          color: #fff;
          text-decoration: none;
          transition: color 0.2s;
        }
        .link-titulo-jogo:hover {
          color: #66c0f4;
        }
      `}</style>

      <section
        aria-labelledby="modal-titulo-detalhe"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginTop: "10px",
        }}
      >
        <div style={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row",
          gap: "24px", 
          alignItems: isMobile ? "center" : "flex-start",
          textAlign: isMobile ? "center" : "left"
        }}>
          <img
            src={jogo.capa}
            alt={`Capa do jogo ${jogo.titulo}`}
            style={{
              width: isMobile ? "100%" : "220px",
              maxWidth: "350px", 
              aspectRatio: "16/9",
              objectFit: "cover",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          />

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: isMobile ? "center" : "flex-start", 
              gap: "8px",
            }}
          >
            <Link
              to={`/jogo/${jogo.id}`}
              onClick={onClose}
              className="link-titulo-jogo"
              aria-label={`Ver página completa de ${jogo.titulo}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "center" : "flex-start",
                gap: "12px",
                width: "fit-content",
              }}
            >
              <Title
                id="modal-titulo-detalhe"
                level={2} 
                style={{
                  color: "inherit",
                  margin: 0,
                  fontSize: "26px",
                  fontWeight: "800",
                }}
              >
                {jogo.titulo}
              </Title>
              <RightOutlined
                aria-hidden="true"
                style={{
                  fontSize: "22px",
                  color: "inherit",
                  strokeWidth: "30",
                  stroke: "currentColor",
                }}
              />
            </Link>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "center" : "flex-start",
                gap: "16px",
                color: "#8f98a0",
                fontSize: "15px",
                flexWrap: "wrap",
              }}
            >
              <Text style={{ color: "#8f98a0" }}>
                {new Date(jogo.dataLancamento).getFullYear()}
              </Text>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <StarFilled aria-hidden="true" style={{ color: "#f5c518", fontSize: "16px" }} />
                <Text strong aria-label={`Nota ${jogo.notaMedia.toFixed(1)} de 10`} style={{ color: "#fff", fontSize: "15px" }}>
                  {jogo.notaMedia.toFixed(1)}/10
                </Text>
              </div>
            </div>

            <div style={{ marginTop: "4px" }}>
              <Text style={{ color: "#8f98a0", fontSize: "15px", marginRight: "6px" }}>
                Direção / Dev:
              </Text>
              <Text style={{ color: "#66c0f4", fontSize: "15px", fontWeight: "600" }}>
                {nomeDev}
              </Text>
            </div>
          </div>
        </div>

        <Paragraph
          style={{
            color: "#c7d5e0",
            fontSize: "15px",
            lineHeight: "1.6",
            margin: 0,
            textAlign: isMobile ? "center" : "left", 
          }}
        >
          {jogo.sinopse}
        </Paragraph>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Divider
            style={{
              borderColor: "rgba(255, 255, 255, 0.08)",
              margin: "16px 0",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-start",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: "15px",
                marginRight: "8px",
              }}
            >
              Categorias:
            </Text>
            <Generos generos={jogo.generos} onClick={onClose} />
          </div>

          <Divider
            style={{
              borderColor: "rgba(255, 255, 255, 0.08)",
              margin: "16px 0",
            }}
          />

          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: isMobile ? "center" : "flex-start",
            flexWrap: "wrap", 
            gap: "16px" 
          }}>
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: "15px" }}>
              Plataformas disponíveis:
            </Text>
            <Plataformas plataformas={jogo.plataformas} onClick={onClose} />
          </div>
        </div>
      </section>
    </Modal>
  );
}