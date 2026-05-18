import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ListagemJogos from "./pages/ListagemJogos";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import PrivateRoute from "./components/layout/PrivateRoute";
import SobrePage from "./pages/SobrePage";
import AjudaPage from "./pages/AjudaPage";
import TermosPage from "./pages/TermosPage";
import PrivacidadePage from "./pages/PrivacidadePage"; 
//import MinhasAvaliacoesPage from "./pages/MinhasAvaliacoesPage"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "jogos",
        element: <ListagemJogos />,
      },
      {
        path: "login", 
        element: <LoginPage />,
      },
      {
        path: "registro",
        element: <RegistroPage />,
      },
      {
        path: "sobre",
        element: <SobrePage />,
      },
      {
        path: "ajuda",
        element: <AjudaPage />,
      },
      {
        path: "termos",
        element: <TermosPage />,
      },
      {
        path: "privacidade",
        element: <PrivacidadePage />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            //path: "minhas-avaliacoes",
            //element: <MinhasAvaliacoesPage />,
          },
        ],
      },
    ],
  },
]);

export default router;