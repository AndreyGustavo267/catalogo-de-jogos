import { Modal, Typography } from "antd";
import {
  CloseOutlined,
  RightOutlined,
  StarFilled,
  WindowsOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const renderPlatformIconInModal = (plataforma) => {
  const platLower = plataforma.toLowerCase();
  if (platLower.includes("pc") || platLower.includes("windows")) {
    return (
      <WindowsOutlined
        key={plataforma}
        style={{ fontSize: "20px", color: "#66c0f4" }}
      />
    );
  }
  if (platLower.includes("mac")) {
    return (
      <AppleOutlined
        key={plataforma}
        style={{ fontSize: "22px", color: "#66c0f4" }}
      />
    );
  }
  if (platLower.includes("playstation") || platLower.includes("ps")) {
    return (
      <span
        key={plataforma}
        style={{
          color: "#66c0f4",
          fontSize: "15px",
          fontWeight: "900",
          letterSpacing: "-1px",
        }}
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
          color: "#66c0f4",
          fontSize: "15px",
          fontWeight: "900",
          letterSpacing: "-0.5px",
        }}
      >
        Xbox
      </span>
    );
  }
  return (
    <span
      key={plataforma}
      style={{ color: "#8f98a0", fontSize: "14px", fontWeight: "bold" }}
    >
      {plataforma}
    </span>
  );
};

export default function ModalDetalheJogo({ jogo, visible, onClose }) {
  const navigate = useNavigate();

  if (!jogo) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closeIcon={
        <CloseOutlined style={{ color: "#8f98a0", fontSize: "18px" }} />
      }
      centered
      width={700}
      className="steam-modal-content"
      styles={{
        mask: { background: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(1px)" },
        content: {
          color: "#fff",
          borderRadius: "8px",
          padding: "30px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* PARTE SUPERIOR: CAPA VERTICAL À ESQUERDA + INFOS À DIREITA */}
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
          {/* Capa estilo Pôster vertical do IMDb */}
          <img
            src={jogo.capa}
            alt={jogo.titulo}
            style={{
              width: "110px",
              aspectRatio: "2/3",
              objectFit: "cover",
              borderRadius: "6px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
            }}
          />

          {/* Detalhes do Bloco Superior Direito */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {/* Título e Seta */}
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
                flexWrap: "wrap",
                width: "fit-content",
              }}
              onMouseOver={(e) => {
                e.currentTarget.querySelector(".modal-title").style.color =
                  "#66c0f4";
                e.currentTarget.querySelector(".arrow-svg").style.color =
                  "#66c0f4";
              }}
              onMouseOut={(e) => {
                e.currentTarget.querySelector(".modal-title").style.color =
                  "#fff";
                e.currentTarget.querySelector(".arrow-svg").style.color =
                  "#fff";
              }}
            >
              <Title
                level={3}
                className="modal-title"
                style={{
                  color: "#fff",
                  margin: 0,
                  fontSize: "26px",
                  fontWeight: "700",
                  lineHeight: "1.2",
                  transition: "color 0.2s",
                }}
              >
                {jogo.titulo}
              </Title>
              <RightOutlined
                className="arrow-svg"
                style={{
                  fontSize: "26px", // Aumentado de 20px para 26px
                  color: "#fff",
                  transition: "color 0.2s",
                  strokeWidth: "40", // Deixa o traço do ícone mais espesso
                  stroke: "currentColor",
                }}
              />
            </div>

            {/* Metadados: Ano e Avaliações */}
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
                <Text strong style={{ color: "#fff" }}>
                  {jogo.notaMedia.toFixed(1)}/10
                </Text>
              </div>
            </div>

            {/* Linha da Desenvolvedora */}
            <div style={{ fontSize: "15px" }}>
              <Text style={{ color: "#8f98a0", marginRight: "6px" }}>
                Direção / Dev:
              </Text>
              <Text style={{ color: "#66c0f4", fontWeight: "600" }}>
                {jogo.desenvolvedoraId === "d1"
                  ? "Naughty Dog"
                  : jogo.desenvolvedoraId === "d2"
                    ? "Rockstar Games"
                    : "CD Projekt Red"}
              </Text>
            </div>
          </div>
        </div>

        {/* PARTE DO MEIO: DESCRIÇÃO DO FILME/JOGO */}
        <div>
          <Paragraph
            style={{
              color: "#fff",
              fontSize: "15px",
              lineHeight: "1.5",
              margin: 0,
            }}
          >
            {jogo.sinopse}
          </Paragraph>
        </div>

        {/* PARTE INFERIOR: SEÇÕES TEXTUAIS PURAS (SEM CAIXAS OU TITLES) */}

        {/* Categorias em Linha Reta */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: "15px" }}>
            Categorias:
          </Text>
          {jogo.generos.map((gen, index) => (
            <Text
              key={gen}
              style={{ color: "#66c0f4", fontSize: "15px", fontWeight: "500" }}
            >
              {gen}
              {index < jogo.generos.length - 1 ? "  •" : ""}
            </Text>
          ))}
        </div>

        {/* Plataformas Espaçadas Simples */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "14px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: "15px" }}>
            Plataformas disponíveis:
          </Text>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {jogo.plataformas.map((plat) => renderPlatformIconInModal(plat))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
