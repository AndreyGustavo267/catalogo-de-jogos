import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import imgAcao from "../../assets/images/categorias/acao.png"
import imgSobrevivencia from "../../assets/images/categorias/sobrevivencia.png"
import imgMundoAberto from "../../assets/images/categorias/mundo_aberto.png"
import imgAventura from "../../assets/images/categorias/aventura.png"
import imgRPG from "../../assets/images/categorias/rpg.png"
import imgHAS from "../../assets/images/categorias/hack_and_slash.png"
import imgMetroidvania from "../../assets/images/categorias/metroidvania.png"
import imgIndie from "../../assets/images/categorias/indie.png"
import imgTerror from "../../assets/images/categorias/terror.png"
import imgEstrategia from "../../assets/images/categorias/estrategia.png"


const categorias = [
  { nome: "Ação", 
    img: imgAcao 
  },
  {
    nome: "Sobrevivência",
    img: imgSobrevivencia,
  },
  {
    nome: "Mundo Aberto",
    img: imgMundoAberto,
  },
  {
    nome: "Aventura",
    img: imgAventura,
  },
  { nome: "RPG", 
    img: imgRPG
  },
  {
    nome: "Hack and Slash",
    img: imgHAS,
  },
  {
    nome: "Metroidvania",
    img: imgMetroidvania,
  },
  {
    nome: "Indie",
    img: imgIndie,
  },
  {
    nome: "Terror",
    img: imgTerror,
  },
  {
    nome: "Estratégia",
    img: imgEstrategia,
  },
];

const CategoryLeftArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "100%",
        left: "-20px",
        zIndex: 2,
        background:
          "linear-gradient(to right, rgba(23, 26, 33, 0.9) 0%, transparent 100%)",
      }}
      onClick={onClick}
    >
      <LeftOutlined style={{ fontSize: "24px", color: "#fff" }} />
    </div>
  );
};

const CategoryRightArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "100%",
        right: "-20px",
        zIndex: 2,
        background:
          "linear-gradient(to left, rgba(23, 26, 33, 0.9) 0%, transparent 100%)",
      }}
      onClick={onClick}
    >
      <RightOutlined style={{ fontSize: "24px", color: "#fff" }} />
    </div>
  );
};

export default function CategoryCarousel() {
  return (
    <div style={{ width: "100%", margin: "0 auto", paddingBottom: "40px" }}>
      <Carousel
        arrows
        prevArrow={<CategoryLeftArrow />}
        nextArrow={<CategoryRightArrow />}
        slidesToShow={4} // Mostra 4 categorias por vez
        slidesToScroll={4} // Passa 4 de uma vez ao clicar na seta
        className="steam-carousel" // Reutilizamos a classe para pegar a correção das barrinhas limpas!
      >
        {categorias.map((cat) => (
          <div key={cat.nome}>
            {/* O padding aqui é o que cria o "gap" entre os cards no Ant Design */}
            <div style={{ padding: "0 12px" }}>
              <Link to={`/jogos?categorias=${encodeURIComponent(cat.nome)}`}>
                <div
                  style={{
                    height: "240px",
                    borderRadius: "8px",
                    background: `url(${cat.img}) center/cover no-repeat`,
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                    transition: "transform 0.3s ease",
                  }}
                  // Efeito de hover simples via in-line (o ideal seria CSS, mas funciona perfeitamente para SPA)
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  {/* Overlay Escuro / Azulado com a "Etiqueta" Branca da Steam */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(to top, rgba(27, 40, 56, 0.8) 0%, rgba(27, 40, 56, 0.2) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* A Etiqueta Branca */}
                    <div
                      style={{
                        background: "#fff",
                        padding: "8px 20px",
                        borderRadius: "4px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                      }}
                    >
                      <span
                        style={{
                          color: "#1b2838",
                          fontWeight: "900",
                          fontSize: "16px",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                        }}
                      >
                        {cat.nome}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
