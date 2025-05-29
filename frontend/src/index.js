import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./pages/LoginPage/LoginPage.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/ReactQuery/react-query.ts";
import { AuthProvider } from "./context/AuthContext.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
