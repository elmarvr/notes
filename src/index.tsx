import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";

import { AuthProvider } from "./context/AuthContext";

import App from "./components/App";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("app")
);
