import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StoreProvider } from "./Context/Store";

import { HelmetProvider } from "react-helmet-async";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_ROUTE ? process.env.REACT_APP_API_ROUTE : "http://localhost:5000/api";
console.log(process.env.REACT_APP_API_ROUTE);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);

reportWebVitals();
