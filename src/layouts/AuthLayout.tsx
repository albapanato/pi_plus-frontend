import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <Outlet />
    </div>
  );
}