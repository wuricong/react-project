import "./App.css";
import { routes } from "./router";
import { useRoutes } from "react-router-dom";

export function Page() {
  return <>{useRoutes(routes)}</>;
}

export default Page;
