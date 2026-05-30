import {
    Typography,
    Space,
    Carousel,
    Grid,
    Button,
    message,
    List,
    Avatar
} from "antd";
import {
    StarFilled,
    StarOutlined,
    HeartFilled,
    HeartOutlined,
    LeftOutlined,
    RightOutlined,
    UserOutlined
} from "@ant-design/icons";
import Generos from "../common/Generos";
import Plataformas from "../common/Plataformas";
import db from "../../assets/data.json";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ModalAvaliacoes from "../listagem-jogos/ModalAvaliacoes";

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const CustomLeftArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            aria-label="Imagem anterior"
            style={{
                ...style,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "60px",
                height: "100%",
                left: 0,
                zIndex: 2,
                background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 100%)",
                border: "none",
                cursor: "pointer"
            }}
            onClick={onClick}
        >
            <LeftOutlined aria-hidden="true" style={{ fontSize: "32px", color: "#fff", opacity: 0.8 }} />
        </button>
    );
};

const CustomRightArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            aria-label="Próxima imagem"
            style={{
                ...style,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "60px",
                height: "100%",
                right: 0,
                zIndex: 2,
                background: "linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 100%)",
                border: "none",
                cursor: "pointer"
            }}
            onClick={onClick}
        >
            <RightOutlined aria-hidden="true" style={{ fontSize: "32px", color: "#fff", opacity: 0.8 }} />
        </button>
    );
};

export default function PainelJogo({ jogo }) {
    const desenvolvedoraEncontrada = db.desenvolvedoras.find((dev) => dev.id === jogo.desenvolvedoraId);
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const navigate = useNavigate();

    const { user, toggleFavorito, checkIsFavorito } = useContext(AuthContext);
    const [isModalAvaliacaoVisible, setIsModalAvaliacaoVisible] = useState(false);

    const isFav = checkIsFavorito(jogo.id);

    const handleFavoritar = () => {
        if (!user) {
            message.warning("Inicie sessão para adicionar este jogo aos favoritos.");
            navigate("/login");
            return;
        }
        const result = toggleFavorito(jogo);
        if (result.isFav) message.success(result.message);
        else message.info(result.message);
    };

    const handleAvaliar = () => {
        if (!user) {
            message.warning("Inicie sessão para avaliar este jogo.");
            navigate("/login");
            return;
        }
        setIsModalAvaliacaoVisible(true);
    };

    const avaliacoesDoJogo = db.avaliacoes
        .filter((aval) => aval.jogoId === jogo.id)
        .sort((a, b) => new Date(b.data) - new Date(a.data));

    return (
        <section aria-labelledby="titulo-painel-jogo" style={{ width: "100%", margin: "0 auto", paddingBottom: "50px" }}>

            <div style={{ margin: "10px 0" }}>
                <Title
                    id="titulo-painel-jogo"
                    level={1}
                    style={{
                        color: "#fff",
                        marginTop: 0,
                        marginBottom: "16px",
                        fontSize: isMobile ? "24px" : "32px",
                        lineHeight: "1.1",
                    }}
                >
                    {jogo.titulo}
                </Title>
            </div>

            <div style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                minHeight: isMobile ? "auto" : "500px",
                width: "100%",
                backgroundColor: "#0a141d",
                borderRadius: "25px",
                overflow: "hidden",
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.6)",
                aspectRatio: isMobile ? "auto" : "21/9"
            }}>

                <div style={{
                    flex: isMobile ? "none" : "0 0 65%",
                    width: isMobile ? "100%" : "65%",
                    overflow: "hidden",
                    backgroundColor: "#000"
                }}>
                    {jogo.outrasMidias && jogo.outrasMidias.length > 0 ? (
                        <Carousel
                            autoplay
                            effect="fade"
                            arrows
                            prevArrow={<CustomLeftArrow />}
                            nextArrow={<CustomRightArrow />}
                            className="steam-carousel"
                        >
                            {jogo.outrasMidias.map((midiaUrl, index) => (
                                <div key={index}>
                                    <img
                                        src={midiaUrl}
                                        alt={`Captura de ecrã ${index + 1} do jogo ${jogo.titulo}`}
                                        style={{
                                            width: "100%",
                                            aspectRatio: isMobile ? "16/9" : "1.52/1",
                                            objectFit: "cover",
                                            display: "block"
                                        }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <img
                            src={jogo.capa}
                            alt={`Capa do jogo ${jogo.titulo}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                    )}
                </div>

                <div style={{
                    flex: isMobile ? "none" : "0 0 35%",
                    width: isMobile ? "100%" : "35%",
                    padding: isMobile ? "24px 20px" : "24px",
                    background: isMobile
                        ? "linear-gradient(to bottom, #0e151d 0%, #16202d 100%)"
                        : "linear-gradient(to right, #0e151d 0%, #16202d 100%)",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                }}>

                    <img
                        src={jogo.capa}
                        alt=""
                        aria-hidden="true"
                        style={{
                            flexShrink: 0,
                            width: "100%",
                            aspectRatio: "16/9",
                            objectFit: "cover",
                            borderRadius: "10px",
                            marginBottom: "16px",
                            display: isMobile ? "none" : "block"
                        }}
                    />

                    <div style={{ marginBottom: "16px" }}>
                        <p style={{ color: "#c7d5e0", fontSize: "15px", lineHeight: "1.5", margin: 0 }}>
                            {jogo.sinopse}
                        </p>
                    </div>

                    <div>
                        <p style={{ fontSize: "14px", color: "#8f98a0", margin: 0 }}>
                            Direção / Dev: {" "}
                            <Link
                                to={`/jogos?ordem=nota&desenvolvedora=${desenvolvedoraEncontrada.id}`}
                                aria-label={`Ver mais jogos da desenvolvedora ${desenvolvedoraEncontrada.nome}`}
                                style={{ color: "#66c0f4", transition: "color 0.2s" }}
                                onMouseOver={(e) => (e.currentTarget.style.color = "#008BE8")}
                                onMouseOut={(e) => (e.currentTarget.style.color = "#66c0f4")}>
                                {desenvolvedoraEncontrada.nome}
                            </Link>
                        </p>
                    </div>

                    <Space direction="vertical" size="middle" style={{ width: "100%", flexShrink: 0, marginTop: "16px" }}>

                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <Text style={{ color: "#c7d5e0", fontSize: "18px" }}>Avaliação IGDb:</Text>
                            <StarFilled aria-hidden="true" style={{ color: "#f5c518", fontSize: "26px" }} />
                            <Text strong aria-label={`A nota é ${jogo.notaMedia.toFixed(1)}`} style={{ color: "#fff", fontSize: "26px" }}>
                                {jogo.notaMedia.toFixed(1)}
                            </Text>
                        </div>

                        <div style={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            gap: "12px",
                            marginTop: "8px",
                            marginBottom: "12px"
                        }}>
                            <Button
                                type={isFav ? "default" : "primary"}
                                icon={isFav ? <HeartFilled aria-hidden="true" style={{ color: "#ff4d4f" }} /> : <HeartOutlined aria-hidden="true" />}
                                onClick={handleFavoritar}
                                style={{
                                    flex: 1,
                                    background: isFav ? "rgba(255, 77, 79, 0.1)" : "#66c0f4",
                                    borderColor: isFav ? "#ff4d4f" : "#66c0f4",
                                    color: isFav ? "#ff4d4f" : "#0a141d",
                                    fontWeight: "bold",
                                    height: "44px"
                                }}
                            >
                                {isFav ? "Nos Favoritos" : "Favoritar"}
                            </Button>

                            <Button
                                icon={<StarOutlined aria-hidden="true" style={{ color: "#5799ef" }} />}
                                onClick={handleAvaliar}
                                style={{
                                    flex: 1,
                                    background: "transparent",
                                    borderColor: "#2a475e",
                                    color: "#fff",
                                    height: "44px"
                                }}
                            >
                                Avaliar
                            </Button>
                        </div>

                        <div>
                            <Generos generos={jogo.generos} />
                        </div>

                        <div style={{ marginTop: "4px" }}>
                            <Text
                                style={{
                                    color: "#7a858f",
                                    fontSize: "15px",
                                    display: "block",
                                    marginBottom: "12px",
                                    fontWeight: "600",
                                }}
                            >
                                Já disponível para:
                            </Text>
                            <div>
                                <Plataformas plataformas={jogo.plataformas} />
                            </div>
                        </div>

                    </Space>
                </div>
            </div>

            {/*AVALIAÇÕES DA COMUNIDADE */}
            <div style={{ marginTop: "60px" }}>
                <Title level={2} style={{ color: "#fff", marginBottom: "24px", fontSize: isMobile ? "24px" : "28px" }}>
                    Avaliações da Comunidade ({avaliacoesDoJogo.length})
                </Title>

                <List
                    itemLayout="horizontal"
                    dataSource={avaliacoesDoJogo}
                    locale={{
                        emptyText: <Text style={{ color: "#8f98a0", fontSize: "16px" }}>Ninguém avaliou este jogo ainda. Seja o primeiro a deixar a sua opinião!</Text>
                    }}
                    renderItem={(aval) => {
                        const usuarioDaAvaliacao = db.usuarios?.find(u => u.id === aval.usuarioId);
                        const nomeUsuario = usuarioDaAvaliacao?.nome || "Membro da Comunidade";

                        return (
                            <div style={{
                                background: "rgba(26, 31, 38, 0.5)",
                                borderRadius: "8px",
                                marginBottom: "16px",
                                padding: isMobile ? "20px" : "24px",
                                border: "1px solid rgba(255, 255, 255, 0.05)"
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>

                                    {/* Perfil de quem avaliou */}
                                    <Space size="middle" align="center">
                                        <Avatar size={48} style={{ backgroundColor: "#2a475e", color: "#66c0f4", fontWeight: "bold", fontSize: "20px" }}>
                                            {nomeUsuario.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <div>
                                            <Text style={{ color: "#fff", margin: 0, fontSize: "16px", fontWeight: "bold", display: "block" }}>
                                                {nomeUsuario}
                                            </Text>
                                            <Text style={{ color: "#8f98a0", fontSize: "13px" }}>
                                                {new Date(aval.data).toLocaleDateString("pt-BR")}
                                            </Text>
                                        </div>
                                    </Space>

                                    {/* Nota dada */}
                                    <Space style={{ background: "rgba(245, 197, 24, 0.1)", padding: "4px 12px", borderRadius: "16px" }}>
                                        <StarFilled aria-hidden="true" style={{ color: "#f5c518", fontSize: "16px" }} />
                                        <Text strong style={{ color: "#f5c518", fontSize: "16px" }}>{aval.nota.toFixed(1)}</Text>
                                    </Space>
                                </div>

                                {/* Comentário escrito */}
                                <Paragraph style={{ color: "#c7d5e0", fontSize: "15px", margin: 0, fontStyle: aval.comentario ? "normal" : "italic" }}>
                                    {aval.comentario || <span style={{ opacity: 0.6 }}>O utilizador deixou apenas a nota sem comentário.</span>}
                                </Paragraph>
                            </div>
                        );
                    }}
                />
            </div>

            <ModalAvaliacoes
                jogo={jogo}
                visible={isModalAvaliacaoVisible}
                onClose={() => setIsModalAvaliacaoVisible(false)}
            />
        </section>
    );
}