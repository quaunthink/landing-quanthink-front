import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackgroundVideo from "./components/decors/BackgroundVideo";
import Cursor from "./components/ui/Cursor";
import ContactDock from "./components/ui/ContactDock";
import ScrollToSection from "./components/transitions/ScrollToSection";

// Páginas
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import EditDemoPage from "./pages/EditDemoPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fondo de video con overlay */}
      <BackgroundVideo />

      {/* Cursor y navegación */}
      <Cursor />
      <Navbar />

      {/* Contenido con scroll-transition hacia secciones */}
      <main className="flex-1">
        <ScrollToSection>
          <Routes>
            {/* Públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/demos/edit/:demoId" element={<EditDemoPage />} />
              <Route path="/client/dashboard" element={<ClientDashboard />} />
            </Route>
          </Routes>
        </ScrollToSection>
      </main>

      <Footer />
      <ContactDock />
    </div>
  );
}
