import { useState, useEffect } from "react";
import { Button } from "antd";
import { UpOutlined } from "@ant-design/icons"; // Ícone de setinha simples estilo ">" virado para cima

export default function BotaoVoltarInicio() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "30px", // Mais colado com a parte de cima da tela
        left: "50%",
        // A mágica da animação acontece aqui: desce 50px se invisível e volta pro 0 quando visível
        transform: `translateX(-50%) translateY(${isVisible ? "0" : "-50px"})`,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none", // Impede que o botão invisível seja clicado
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", // Curva de animação com leve "pulo" elástico
        zIndex: 999,
      }}
    >
      <Button
        type="primary"
        icon={<UpOutlined style={{ strokeWidth: "40", stroke: "#0a141d" }} />} // Engrossa levemente a setinha
        onClick={scrollToTop}
        style={{
          background: "rgba(102, 192, 244, 0.85)", // Azul claro com 15% de transparência para não tampar a tela
          color: "#0a141d", // Azul bem escuro/quase preto para a letra
          border: "none", // Sem nenhum contorno
          borderRadius: "24px",
          padding: "0 24px",
          height: "40px",
          fontSize: "15px",
          fontWeight: "800",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)", // Sombra sutil
        }}
      >
        Voltar ao início
      </Button>
    </div>
  );
}
