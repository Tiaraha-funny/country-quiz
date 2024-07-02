import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOMServer from "react-dom/server";
import App from "./Components/App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
ReactDOMServer.renderToString("#root");
