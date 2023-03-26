import { useRoutes, Navigate } from "react-router";

import Home from "./Components/Home/home";
import Movies from "./Components/Movies/movies";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Navigate to="/home/movies" /> },
    {
      path: "home",
      element: <Home />,
      children: [{ path: "movies", element: <Movies /> }],
    },
  ]);

  return routes;
};

export default AppRoutes;
