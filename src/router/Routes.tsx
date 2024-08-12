import { UserCard } from "../pages/cards/UserCard";
import { Register } from "../pages/cards/Register";
import { Page404 } from "../pages/Page404";
import { Top } from "../pages/top/Top";

export const routes = [
  {
    path: "/",
    element: <Top />,
  },
  {
    path: "/cards/:id",
    element: <UserCard />,
  },
  {
    path: "/cards/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
];
