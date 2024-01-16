import { createMemoryRouter } from "react-router-dom";
import { NotFoundPage } from "./NotFound";
import { Setup } from "../components/pages/Setup";
import { Game } from "../components/pages/Game";

export const router = createMemoryRouter([
  {
    path: "/",
    Component: Setup,
  },
  {
    path: "/game",
    Component: Game,
  },
  {
    path: "/*",
    Component: NotFoundPage,
  }
]);
