import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";

import { ProvideAuth } from "./context/AuthContext";

import App from "./components/App";

ReactDOM.render(
  <ProvideAuth>
    <App />
  </ProvideAuth>,
  document.getElementById("app")
);
