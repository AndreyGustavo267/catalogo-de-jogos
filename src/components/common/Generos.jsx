import { Link } from "react-router-dom";
import { Space } from "antd";

export default function Generos({ generos, onClick }) {
  return (
    <>
      <style>{`
        .genero-tag-link {
          background: linear-gradient(180deg, #1f3042 0%, #15202b 100%);
          color: #66c0f4;
          padding: 4px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          border: 1px solid #28445e;
          box-shadow: 0 3px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
          transition: all 0.2s ease-in-out;
          display: inline-block;
        }
        .genero-tag-link:hover {
          background: linear-gradient(180deg, #2a435a 0%, #1a2735 100%);
          color: #fff;
          border-color: #66c0f4;
          box-shadow: 0 4px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15);
          transform: translateY(-1px);
        }
      `}</style>

      <Space size={[8, 8]} wrap>
        {generos.map((gen) => (
          <Link
            key={gen}
            to={`/jogos?categorias=${encodeURIComponent(gen)}`}
            onClick={onClick}
            className="genero-tag-link"
            aria-label={`Filtrar jogos pelo gênero ${gen}`}
          >
            {gen}
          </Link>
        ))}
      </Space>
    </>
  );
}