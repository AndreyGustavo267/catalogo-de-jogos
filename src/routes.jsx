import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import TopGames from "./pages/TopGames";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <TopGames />,
      },
    ],
  },
]);

export default router;
