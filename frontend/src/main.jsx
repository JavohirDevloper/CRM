import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// css styles
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// routers
import { BrowserRouter as Router } from "react-router-dom";

// render
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
        <App />
      <ToastContainer/>
    </Router>
  </React.StrictMode>
);
