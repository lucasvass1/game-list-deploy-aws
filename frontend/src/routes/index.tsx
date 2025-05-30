import React from "react";
import { Routes, Route } from "react-router-dom";
import { RouteWrapper } from "./RouteWrapper.tsx";
import { Home } from "../pages/Home/index.tsx";
import { Games } from "../pages/Games/index.tsx";
import Categories from "../pages/Categories/index.tsx";
import Plataforms from "../pages/Plataforms/index.tsx";
import { Register } from "../pages/Register/Register.tsx";
import { Login } from "../pages/login/index.tsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RouteWrapper isPrivate>
            <Home />
          </RouteWrapper>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RouteWrapper isPrivate>
            <Home />
          </RouteWrapper>
        }
      />

      <Route
        path="/login"
        element={
          <RouteWrapper isPrivate={false}>
            <Login />
          </RouteWrapper>
        }
      />
      <Route
        path="/register"
        element={
          <RouteWrapper isPrivate={false}>
            <Register />
          </RouteWrapper>
        }
      />

      <Route
        path="/games"
        element={
          <RouteWrapper isPrivate>
            <Games />
          </RouteWrapper>
        }
      />

      <Route
        path="/categories"
        element={
          <RouteWrapper isPrivate>
            <Categories />
          </RouteWrapper>
        }
      />
      <Route
        path="/plataforms"
        element={
          <RouteWrapper isPrivate>
            <Plataforms />
          </RouteWrapper>
        }
      />
    </Routes>
  );
}
