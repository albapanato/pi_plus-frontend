import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Header superior */}
      <Header />

      {/* Zona principal: sidebar + contenido */}
      <div className="flex-grow-1 d-flex">
        {/* Sidebar fija */}
        <Sidebar />

        {/* Contenido principal */}
        <div className="flex-grow-1 d-flex flex-column">
          <main className="flex-grow-1 p-4">
            <Outlet />
          </main>

          <footer className="d-flex justify-content-center py-3">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
}