import { Typography, Space, Checkbox, Radio, Divider, InputNumber } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { GENEROS, PLATAFORMAS, MODELOS_NEGOCIO } from "../../utils/enums";
import "./FiltrosLaterais.css";

const { Title, Text } = Typography;

export default function FiltrosLaterais({
  categoriasAtivas,
  plataformasAtivas,
  ordemAtual,
  modeloAtual,
  limiteAtual,
  onChangeFiltro,
}) {
  return (
    <aside
      aria-labelledby="titulo-filtros"
      className="painel-filtros-steam"
      style={{
        background: "#16202d",
        padding: "20px",
        borderTop: "4px solid #66c0f4",
        borderRadius: "4px",
      }}
    >
      <Space size="small" style={{ marginBottom: "24px" }}>
        <FilterOutlined aria-hidden="true" style={{ color: "#66c0f4", fontSize: "18px" }} />
        
        <Title
          id="titulo-filtros"
          level={2}
          style={{
            color: "#fff",
            margin: 0,
            fontSize: "18px",
            textTransform: "uppercase",
          }}
        >
          Filtrar e Ordenar
        </Title>
      </Space>

      <div style={{ marginBottom: "24px" }}>
        <Text
          id="label-ordenar"
          style={{
            color: "#66c0f4",
            fontWeight: "bold",
            display: "block",
            marginBottom: "12px",
          }}
        >
          ORDENAR POR
        </Text>
        <Radio.Group
          aria-labelledby="label-ordenar"
          onChange={(e) => onChangeFiltro("ordem", e.target.value)}
          value={ordemAtual}
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <Radio value="nota">
            <span style={{ color: "#c7d5e0" }}>Maior Nota</span>
          </Radio>
          <Radio value="recentes">
            <span style={{ color: "#c7d5e0" }}>Mais Recentes</span>
          </Radio>
          <Radio value="alfabetica">
            <span style={{ color: "#c7d5e0" }}>Ordem Alfabética</span>
          </Radio>
        </Radio.Group>
      </div>

      <Divider style={{ borderColor: "#2a475e", margin: "16px 0" }} />

      <div style={{ marginBottom: "24px" }}>
        <Text
          id="label-preco"
          style={{
            color: "#66c0f4",
            fontWeight: "bold",
            display: "block",
            marginBottom: "12px",
          }}
        >
          PREÇO
        </Text>
        <Radio.Group
          aria-labelledby="label-preco"
          onChange={(e) => onChangeFiltro("modelo", e.target.value)}
          value={modeloAtual}
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          {MODELOS_NEGOCIO.map((modelo) => (
            <Radio key={modelo.value} value={modelo.value}>
              <span style={{ color: "#c7d5e0" }}>{modelo.label}</span>
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <Divider style={{ borderColor: "#2a475e", margin: "16px 0" }} />

      <div style={{ marginBottom: "24px" }}>
        <Text
          id="label-generos"
          style={{
            color: "#66c0f4",
            fontWeight: "bold",
            display: "block",
            marginBottom: "12px",
          }}
        >
          GÊNEROS
        </Text>
        <Checkbox.Group
          aria-labelledby="label-generos"
          options={GENEROS}
          value={categoriasAtivas}
          onChange={(valores) => onChangeFiltro("categorias", valores)}
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        />
      </div>

      <Divider style={{ borderColor: "#2a475e", margin: "16px 0" }} />

      <div style={{ marginBottom: "24px" }}>
        <Text
          id="label-plataformas"
          style={{
            color: "#66c0f4",
            fontWeight: "bold",
            display: "block",
            marginBottom: "12px",
          }}
        >
          PLATAFORMAS
        </Text>
        <Checkbox.Group
          aria-labelledby="label-plataformas"
          options={PLATAFORMAS}
          value={plataformasAtivas}
          onChange={(valores) => onChangeFiltro("plataformas", valores)}
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        />
      </div>
      
      <Divider style={{ borderColor: "#2a475e", margin: "16px 0" }} />

      <div style={{ marginBottom: "24px" }}>
        <Text
          id="label-limite"
          style={{
            color: "#66c0f4",
            fontWeight: "bold",
            display: "block",
            marginBottom: "12px",
          }}
        >
          EXIBIR RESULTADOS
        </Text>
        <Radio.Group
          aria-labelledby="label-limite"
          onChange={(e) => {
            if (e.target.value === "todos") {
              onChangeFiltro("limite", "todos");
            } else {
              onChangeFiltro("limite", "50"); 
            }
          }}
          value={limiteAtual === "todos" ? "todos" : "personalizado"}
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <Radio value="todos">
            <span style={{ color: "#c7d5e0" }}>Mostrar Todos</span>
          </Radio>
          <Radio value="personalizado">
            <span style={{ color: "#c7d5e0", marginRight: "8px" }}>
              Personalizado:
            </span>
            <InputNumber
              aria-label="Quantidade personalizada de resultados"
              min={1}
              max={500}
              value={limiteAtual !== "todos" ? parseInt(limiteAtual, 10) : 50}
              onChange={(valor) => {
                if (valor) onChangeFiltro("limite", valor.toString());
              }}
              disabled={limiteAtual === "todos"}
              className="input-limite-dark" 
              style={{
                width: "70px",
                background: limiteAtual === "todos" ? "#1a1f26" : "#171a21",
                borderColor: "#2a475e",
              }}
            />
          </Radio>
        </Radio.Group>
      </div>
    </aside>
  );
}