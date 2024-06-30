import "./App.css";
import { routes } from "./router";
import { useRoutes } from "react-router-dom";

export function App() {
  return <>{useRoutes(routes)}</>;
}

export default App;
