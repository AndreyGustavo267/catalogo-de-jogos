import { Carousel, Grid } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;
const categorias = [
  { nome: "Ação", img: "https://placehold.co/400x400/171a21/66c0f4?text=Acao" },
  { nome: "Sobrevivência", img: "https://placehold.co/400x400/2a475e/66c0f4?text=Sobrevivencia" },
  { nome: "Mundo Aberto", img: "https://placehold.co/400x400/1b2838/66c0f4?text=Mundo+Aberto" },
  { nome: "Aventura", img: "https://placehold.co/400x400/171a21/66c0f4?text=Aventura" },
  { nome: "RPG", img: "https://placehold.co/400x400/2a475e/66c0f4?text=RPG" },
  { nome: "Hack and Slash", img: "https://placehold.co/400x400/1b2838/66c0f4?text=Hack+Slash" },
  { nome: "Metroidvania", img: "https://placehold.co/400x400/171a21/66c0f4?text=Metroidvania" },
  { nome: "Indie", img: "https://placehold.co/400x400/2a475e/66c0f4?text=Indie" },
  { nome: "Terror", img: "https://placehold.co/400x400/1b2838/66c0f4?text=Terror" },
  { nome: "Estratégia", img: "https://placehold.co/400x400/171a21/66c0f4?text=Estrategia" },
];
const CategoryLeftArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      aria-label="Ver categorias anteriores"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "100%",
        left: "-20px",
        zIndex: 2,
        background: "linear-gradient(to right, rgba(23, 26, 33, 0.9) 0%, transparent 100%)",
        border: "none",
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      <LeftOutlined aria-hidden="true" style={{ fontSize: "24px", color: "#fff" }} />
    </button>
  );
};

const CategoryRightArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      aria-label="Ver próximas categorias"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "100%",
        right: "-20px",
        zIndex: 2,
        background: "linear-gradient(to left, rgba(23, 26, 33, 0.9) 0%, transparent 100%)",
        border: "none",
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      <RightOutlined aria-hidden="true" style={{ fontSize: "24px", color: "#fff" }} />
    </button>
  );
};

export default function CategoryCarousel() {
  const screens = useBreakpoint();
  let slidesToShow = 4;
  if (screens.xs) slidesToShow = 1; 
  else if (screens.sm && !screens.md) slidesToShow = 2;
  else if (screens.md && !screens.lg) slidesToShow = 3; 

  return (
    <section aria-label="Navegar por Categorias" style={{ width: "100%", margin: "0 auto", paddingBottom: "40px" }}>
      
      <style>{`
        .category-card {
          height: 240px;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.4);
          transition: transform 0.3s ease;
        }
        .category-card:hover {
          transform: scale(1.03);
        }
      `}</style>

      <Carousel
        arrows
        prevArrow={<CategoryLeftArrow />}
        nextArrow={<CategoryRightArrow />}
        slidesToShow={slidesToShow} 
        slidesToScroll={slidesToShow} 
        className="steam-carousel" 
      >
        {categorias.map((cat) => (
          <div key={cat.nome}>
            <div style={{ padding: "0 12px" }}>
              <Link 
                to={`/jogos?categoria=${encodeURIComponent(cat.nome)}`}
                aria-label={`Ver jogos da categoria ${cat.nome}`}
              >
                <div className="category-card">
                  <img 
                    src={cat.img} 
                    alt="" 
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(to top, rgba(27, 40, 56, 0.8) 0%, rgba(27, 40, 56, 0.2) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      aria-hidden="true"
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
    </section>
  );
}