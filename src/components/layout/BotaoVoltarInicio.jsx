import { useState, useEffect } from "react";
import { Button } from "antd";
import { UpOutlined } from "@ant-design/icons";

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
      aria-hidden={!isVisible}
      style={{
        position: "fixed",
        top: "30px", 
        left: "50%",
        transform: `translateX(-50%) translateY(${isVisible ? "0" : "-50px"})`,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        visibility: isVisible ? "visible" : "hidden",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", 
        zIndex: 999,
      }}
    >
      <Button
        type="primary"
        aria-label="Voltar ao início da página"
        icon={<UpOutlined aria-hidden="true" style={{ strokeWidth: "40", stroke: "#0a141d" }} />} 
        onClick={scrollToTop}
        tabIndex={isVisible ? 0 : -1}
        style={{
          background: "rgba(102, 192, 244, 0.85)", 
          color: "#0a141d", 
          border: "none", 
          borderRadius: "24px",
          padding: "0 24px",
          height: "40px",
          fontSize: "15px",
          fontWeight: "800",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)", 
        }}
      >
        Voltar ao início
      </Button>
    </div>
  );
}