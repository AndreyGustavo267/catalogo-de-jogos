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
          colorPrimary: "#66c0f4",
          colorBgBase: "#1b2838",
          colorBgContainer: "#171a21",
          colorTextBase: "#c7d5e0",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
