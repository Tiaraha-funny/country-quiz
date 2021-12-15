import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from 'react-dom/server';
import App from "./Components/App";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOMServer.renderToString('#root')