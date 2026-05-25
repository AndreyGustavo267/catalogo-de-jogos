import { Link } from "react-router-dom";
import { Space } from "antd";

export default function Generos({ generos, onClick }) {
  return (
    <Space size={[8, 8]} wrap>
      {generos.map((gen) => (
        <Link
          key={gen}
          to={`/jogos?categorias=${encodeURIComponent(gen)}`}
          onClick={onClick}
          style={{
            background: "linear-gradient(180deg, #1f3042 0%, #15202b 100%)",
            color: "#66c0f4", // Azul Steam padrão
            padding: "4px 14px",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: "700",
            textDecoration: "none",
            border: "1px solid #28445e",
            boxShadow:
              "0 3px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
            transition: "all 0.2s ease-in-out",
            display: "inline-block",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(180deg, #2a435a 0%, #1a2735 100%)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "#66c0f4";
            e.currentTarget.style.boxShadow =
              "0 4px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(180deg, #1f3042 0%, #15202b 100%)";
            e.currentTarget.style.color = "#66c0f4";
            e.currentTarget.style.borderColor = "#28445e";
            e.currentTarget.style.boxShadow =
              "0 3px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {gen}
        </Link>
      ))}
    </Space>
  );
}
