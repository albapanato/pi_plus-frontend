import { Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import SNSearchPage from "../pages/SNSearchPage";
import StockUbicationPage from "../pages/StockUbicationPage";
import TerminalFormPage from "../pages/TerminalFormPage";
import RequireAuth from "./RequireAuth";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SNSearchPage />} />
          <Route path="/stock" element={<StockUbicationPage />} />
          <Route path="/terminal-form" element={<TerminalFormPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
