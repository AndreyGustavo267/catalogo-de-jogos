import { Typography, Space, Tag, Carousel } from "antd";
import {
    StarFilled,
    // WindowsOutlined,
    // AppleOutlined,
    LeftOutlined,
    RightOutlined,
} from "@ant-design/icons";

import Generos from "../common/Generos";
import Plataformas from "../common/Plataformas";
import db from "../../assets/data.json";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

// --- SETAS CUSTOMIZADAS DO CARROSSEL ---
const CustomLeftArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
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
            }}
            onClick={onClick}
        >
            <LeftOutlined style={{ fontSize: "32px", color: "#fff", opacity: 0.8 }} />
        </div>
    );
};

const CustomRightArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
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
            }}
            onClick={onClick}
        >
            <RightOutlined style={{ fontSize: "32px", color: "#fff", opacity: 0.8 }} />
        </div>
    );
};

export default function PainelJogo({ jogo }) {
    const desenvolvedoraEncontrada = db.desenvolvedoras.find((dev) => dev.id === jogo.desenvolvedoraId);
    return (
        <div style={{ width: "100%", margin: "0 auto", paddingBottom: "40px" }}>
            {/* TÍTULO */}
            <div style={{ margin: "10px" }}>
                <Title level={2} style={{ color: "#fff", marginTop: 0, marginBottom: "10px", fontSize: "25px", lineHeight: "1.1" }}>
                    {jogo.titulo}
                </Title>
            </div>

            {/* CAIXA PRINCIPAL BLINDADA (21/9) */}
            <div style={{ 
                display: "flex", 
                aspectRatio: "21/9",
                width: "100%", 
                backgroundColor: "#0a141d", 
                borderRadius: "25px", 
                overflow: "hidden" ,
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.6)"
            }}>
                
                {/* LADO ESQUERDO (65%): Imagem Grande do Jogo! */}
                <div style={{ flex: "0 0 65%", overflow: "hidden", backgroundColor: "#000" }}>
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
                                    <div
                                        style={{
                                            width: "100%",
                                            /* Como esse lado ocupa 65% de 21/9, a proporção interna dele é aproximadamente 1.52/1 */
                                            aspectRatio: "1.52/1", 
                                            background: `url(${midiaUrl}) center/cover no-repeat`,
                                        }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        /* Fallback: se o jogo não tiver o array "outrasMidias", mostra a capa normal */
                        <div style={{ width: "100%", height: "100%", background: `url(${jogo.capa}) center/cover no-repeat` }} />
                    )}
                </div>

                {/* LADO DIREITO (35%): Painel de informações intacto */}
                <div style={{ 
                    flex: "0 0 35%", 
                    padding: "24px", 
                    background: "linear-gradient(to right, #0e151d 0%, #16202d 100%)", 
                    display: "flex", 
                    flexDirection: "column" 
                }}>
                
                    {/* BANNER MENOR */}
                    <img 
                        src={jogo.capa} 
                        alt={`Banner de ${jogo.titulo}`} 
                        style={{ 
                            flexShrink: 0,
                            width: "100%", 
                            aspectRatio: "16/9",
                            objectFit: "cover",
                            borderRadius: "10px", 
                            marginBottom: "16px" 
                        }} 
                    />

                    {/* SINOPSE */}
                    <div style={{ flex: 1, overflow: "auto", marginBottom: "16px", paddingRight: "10px" }}>
                        <p 
                            style={{ 
                                color: "#c7d5e0", 
                                fontSize: "15px", 
                                lineHeight: "1.5", 
                                margin: 0
                        }}>
                            {jogo.sinopse}
                        </p>
                    </div>
                    

                    {/* DESENVOLVEDOR */}
                    <div>
                        <p style={{fontSize: "14px"}}>
                            Direção / Dev: {" "}
                            <Link 
                                to={ `/jogos?ordem=nota&desenvolvedora=${desenvolvedoraEncontrada.id}`} 
                                style={{ color:"#66c0f4", transition: "color 0.2s" }} 
                                onMouseOver={(e) => (e.currentTarget.style.color = "#008BE8")} 
                                onMouseOut={(e) => (e.currentTarget.style.color = "#66c0f4")}>
                                    {desenvolvedoraEncontrada.nome}
                            </Link> 
                        </p>
                    </div>

                    {/* RODAPÉ DE INFOS */}
                    <Space direction="vertical" size="middle" style={{ width: "100%", flexShrink: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <Text style={{ color: "#c7d5e0", fontSize: "18px" }}>Avaliação IGDb:</Text>
                            <StarFilled style={{ color: "#f5c518", fontSize: "26px" }} />
                            <Text strong style={{ color: "#fff", fontSize: "26px" }}>{jogo.notaMedia.toFixed(1)}</Text>
                        </div>

                        <div>
                            <Generos generos={jogo.generos} />
                        </div>

                        <div style={{ marginTop: "24px" }}>
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
        </div>
    );
}