import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import router from "./router";
// import {RouterProvider} from "react-router-dom";
// import {MenuLayout} from "./layout";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
);
