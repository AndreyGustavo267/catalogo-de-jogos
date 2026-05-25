import { Modal, Typography, Divider } from "antd";
import { CloseOutlined, RightOutlined, StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import db from "../../assets/data.json";
import Generos from "../common/Generos";
import Plataformas from "../common/Plataformas";
import React from "react";

const { Title, Text, Paragraph } = Typography;

export default function ModalDetalheJogo({ jogo, visible, onClose }) {
  const navigate = useNavigate();

  if (!jogo) return null;

  const dev = db.desenvolvedoras.find((d) => d.id === jogo.desenvolvedoraId);
  const nomeDev = dev ? dev.nome : "Desconhecida";

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closeIcon={
        <CloseOutlined style={{ color: "#8f98a0", fontSize: "18px" }} />
      }
      centered
      width={750}
      cclassName="igdb-dark-modal"
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
            padding: "50px 40px 40px 40px",
            overflow: "visible",
          },
        })
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginTop: "10px",
        }}
      >
        {/* PARTE SUPERIOR: CAPA HORIZONTAL + INFOS */}
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
          <img
            src={jogo.capa}
            alt={jogo.titulo}
            style={{
              width: "220px",
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
              gap: "8px",
            }}
          >
            {/* Título e Seta clicável */}
            <div
              onClick={() => {
                onClose();
                navigate(`/jogo/${jogo.id}`);
              }}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "fit-content",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#66c0f4";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#fff";
              }}
            >
              <Title
                level={3}
                style={{
                  color: "inherit",
                  margin: 0,
                  fontSize: "26px",
                  fontWeight: "800",
                  transition: "color 0.2s",
                }}
              >
                {jogo.titulo}
              </Title>
              <RightOutlined
                style={{
                  fontSize: "22px",
                  color: "inherit",
                  strokeWidth: "30",
                  stroke: "currentColor",
                  transition: "color 0.2s",
                }}
              />
            </div>

            {/* Ano e Nota */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                color: "#8f98a0",
                fontSize: "15px",
              }}
            >
              <Text style={{ color: "#8f98a0" }}>
                {new Date(jogo.dataLancamento).getFullYear()}
              </Text>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <StarFilled style={{ color: "#f5c518", fontSize: "16px" }} />
                <Text strong style={{ color: "#fff", fontSize: "15px" }}>
                  {jogo.notaMedia.toFixed(1)}/10
                </Text>
              </div>
            </div>

            {/* Desenvolvedora */}
            <div style={{ marginTop: "4px" }}>
              <Text
                style={{
                  color: "#8f98a0",
                  fontSize: "15px",
                  marginRight: "6px",
                }}
              >
                Direção / Dev:
              </Text>
              <Text
                style={{
                  color: "#66c0f4",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                {nomeDev}
              </Text>
            </div>
          </div>
        </div>

        {/* SINOPSE */}
        <Paragraph
          style={{
            color: "#c7d5e0",
            fontSize: "15px",
            lineHeight: "1.6",
            margin: 0,
          }}
        >
          {jogo.sinopse}
        </Paragraph>

        {/* CATEGORIAS E PLATAFORMAS COM DIVIDERS */}
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

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Text
              style={{ color: "#fff", fontWeight: "700", fontSize: "15px" }}
            >
              Plataformas disponíveis:
            </Text>
            <Plataformas plataformas={jogo.plataformas} onClick={onClose} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
