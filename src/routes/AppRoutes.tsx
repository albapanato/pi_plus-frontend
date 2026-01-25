import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import SNSearchPage from "../pages/SNSearchPage";
import StockUbicationPage from "../pages/StockUbicationPage";



export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas / auth */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Rutas privadas / app */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<SNSearchPage />} />
        <Route path="/stock" element={<StockUbicationPage/>} />
      </Route>
    </Routes>
  );
}