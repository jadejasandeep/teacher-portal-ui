import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider> {/* Ensure AuthProvider wraps the entire App */}
    <App />
  </AuthProvider>
);
