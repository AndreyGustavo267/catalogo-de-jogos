import { Typography, Space, Tag } from "antd";
import {
    StarFilled,
    WindowsOutlined,
    AppleOutlined,
  } from "@ant-design/icons";

  const { Title, Text } = Typography

  const renderPlatformIcon = (plataforma) => {
    const platLower = plataforma.toLowerCase();

    if (platLower.includes("pc") || platLower.includes("windows")) {
        return <WindowsOutlined key={plataforma} style={{ fontSize: "22px", color: "8f98a0" }} title={plataforma} />;
    }
    if (platLower.includes("mac")) {
        return <AppleOutlined key={plataforma} style={{ fontSize: "24px", color: "8f98a0", marginBottom: "2px" }} title={plataforma} />;
    }
    if (platLower.includes("playstation")) {
        return <span key={plataforma} style={{ color: "8f98a0", fontSize: "16px", fontWeight: "900", letterSpacing: "-1px" }} title={plataforma}>PS</span>;
    }
    if (platLower.includes("xbox")) {
        return <span key={plataforma} style={{ color: "8f98a0", fontSize: "16px", fontWeight: "900", letterSpacing: "-0.5px" }} title={plataforma}>Xbox</span>;
    }
    return <span key={plataforma} style={{ color: "8f98a0", fontSize: "14px", fontWeight: "bold" }} title={plataforma}>{plataforma}</span>;
  };

  export default function PainelJogo({ jogo }) {
    return (
        <div style={{ width: "100%", margin: "0 auto", paddingBottom: "50px" }}>
            <div style={{ margin: "10px"}}>

                <Title level={2} style={{ color: "#fff", marginTop: 0, marginBottom: "10px", fontSize: "25px", lineHeight: "1.1" }}>
                    {jogo.titulo}
                </Title>
            </div>
            <div style={{ display: "flex", height: "450px", width: "100%", backgroundColor: "#0a141d", borderRadius: "25px", overflow: "hidden" }}>
                
                {/* Imagem do Jogo */}
                <div style={{ flex: "0 0 65%", background: `url(${jogo.capa}) center/cover no-repeat` }} />

                {/* Painel de Informações */}
                <div style={{ flex: "0 0 35%", padding: "40px 32px", background: "linear-gradient(to right, #0e151d 0%, #16202d 100%)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    
                    <Title level={2} style={{ color: "#fff", marginTop: 0, marginBottom: "28px", fontSize: "34px", lineHeight: "1.1" }}>
                        {jogo.titulo}
                    </Title>

                    <Space direction="vertical" size="large" style={{ width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                            <Text style={{ color: "#c7d5e0", fontSize: "18px" }}>Avaliação IGDb:</Text>
                            <StarFilled style={{ color: "#f5c518", fontSize: "26px" }} />
                            <Text strong style={{ color: "#fff", fontSize: "26px" }}>{jogo.notaMedia.toFixed(1)}</Text>
                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                            {jogo.generos.map((genero) => (
                                <Tag key={genero} color="processing" style={{ background: "rgba(102, 192, 244, 0.15)", border: "none", color: "#66c0f4", padding: "6px 12px", fontSize: "14px", margin: 0 }}>
                                    {genero}
                                </Tag>
                            ))}
                        </div>

                        <div style={{ marginTop: "24px" }}>
                            <Text style={{ color: "#7a858f", fontSize: "15px", display: "block", marginBottom: "12px", fontWeight: "600" }}>Já disponível para:</Text>
                            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                {jogo.plataformas.map((plat) => renderPlatformIcon(plat))}
                            </div>
                        </div>
                    </Space>

                </div>
            </div>
        </div>
    )
  }