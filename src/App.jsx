import { RouterProvider } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import ptBR from "antd/locale/pt_BR";
import router from "./routes";

export default function App() {
  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          fontFamily: "'Inter', sans-serif",
          fontSize: 18,
          colorPrimary: "#66c0f4",
          colorBgBase: "#1b2838",
          colorBgContainer: "#171a21",
          colorBgLayout: "transparent",
          colorTextBase: "#c7d5e0",
          colorBorderSecondary: "#2a475e",
          colorBorder: "#2a475e",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
