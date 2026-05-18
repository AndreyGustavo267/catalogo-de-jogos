import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
// import TopGames from "./pages/TopGames";
import ListagemJogos from "./pages/ListagemJogos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true, // Quando acessar '/', renderiza a HomePage
        element: <HomePage />,
      },
      // {
      //   path: "jogos", // Quando acessar '/jogos', renderiza a tabela com os filtros
      //   element: <TopGames />,
      // },
      {
        path: "jogos", // Quando acessar '/jogos', renderiza a tabela com os filtros
        element: <ListagemJogos />,
      },
    ],
  },
]);

export default router;
