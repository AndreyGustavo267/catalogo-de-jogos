import React, { useState, useContext, useEffect } from "react";
import { Modal, Typography, Rate, Input, Button, message } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import db from "../../assets/data.json";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function ModalAvaliacoes({ jogo, visible, onClose }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");

  useEffect(() => {
    if (visible) {
      setNota(0);
      setComentario("");
    }
  }, [visible]);

  const handleAvaliar = () => {
    if (!user) {
      message.warning("Você precisa estar logado para avaliar um jogo.");
      navigate("/login");
      return;
    }

    if (nota === 0) {
      message.error("Por favor, selecione uma nota de 1 a 10.");
      return;
    }

    const novaAvaliacao = {
      id: "a" + Date.now(),
      usuarioId: user.id,
      jogoId: jogo.id,
      nota: nota,
      comentario: comentario.trim(),
      data: new Date().toISOString(),
    };

    db.avaliacoes.push(novaAvaliacao);

    const avaliacoesDoJogo = db.avaliacoes.filter((a) => a.jogoId === jogo.id);
    const soma = avaliacoesDoJogo.reduce((acc, curr) => acc + curr.nota, 0);
    jogo.notaMedia = soma / avaliacoesDoJogo.length;

    message.success("Avaliação salva com sucesso!");
    onClose();
  };

  if (!jogo) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={750}
      closeIcon={<span style={{ color: "#8f98a0", fontSize: "20px" }}>✕</span>}
      className="modal-avaliacao-igdb"
      wrapClassName="modal-avaliacao-igdb"
      rootClassName="modal-avaliacao-igdb"
      styles={{
        mask: {
          background: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(4px)",
        },
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
      <style>
        {`
          .modal-avaliacao-igdb .ant-modal-content { background: transparent !important; box-shadow: none !important; }
          .modal-avaliacao-igdb .ant-rate-star-zero svg { color: rgba(255, 255, 255, 0.1) !important; }
          .modal-avaliacao-igdb .ant-modal-close { top: 24px !important; right: 24px !important; }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          top: "-70px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <StarFilled
          style={{
            fontSize: "110px",
            color: "#5799ef",
            filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.6))",
          }}
        />
        <span
          style={{
            position: "absolute",
            color: "#fff",
            fontSize: "26px",
            fontWeight: "900",
            marginTop: "6px",
          }}
        >
          {nota > 0 ? nota : "?"}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <Text
          style={{
            color: "#f5c518",
            fontWeight: "800",
            letterSpacing: "2px",
            fontSize: "14px",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          Sua Avaliação
        </Text>

        <Title
          level={2}
          style={{
            color: "#fff",
            margin: "0 0 30px 0",
            fontSize: "32px",
            fontWeight: "800",
            textAlign: "center",
            lineHeight: "1.2",
          }}
        >
          {jogo.titulo}
        </Title>

        <Rate
          count={10}
          value={nota}
          onChange={setNota}
          style={{
            color: "#5799ef",
            fontSize: "38px",
            marginBottom: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "4px",
          }}
        />

        <TextArea
          rows={4}
          placeholder="Escreva uma breve análise (Opcional)"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            color: "#c7d5e0",
            marginBottom: "30px",
            resize: "none",
            fontSize: "16px",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
          }}
        />

        <Button
          type="primary"
          onClick={handleAvaliar}
          disabled={nota === 0}
          style={{
            width: "100%",
            height: "54px",
            borderRadius: "27px",
            fontSize: "18px",
            fontWeight: "700",
            backgroundColor:
              nota === 0 ? "rgba(255, 255, 255, 0.08)" : "#3a7bc8",
            borderColor: "transparent",
            color: nota === 0 ? "rgba(255, 255, 255, 0.3)" : "#fff",
            transition: "all 0.3s ease",
          }}
        >
          Avaliar
        </Button>
      </div>
    </Modal>
  );
}
