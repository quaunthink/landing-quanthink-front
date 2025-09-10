import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BurguerButton from "../ui/BurguerButton";


const NavLinkA = ({ to, children }) => (
  <Link to={to} className="nav-a">
    <span>{children}</span>
    <i className="nav-underline" />
  </Link>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <header className="nav">
      <div className="nav-inner">
        {/* Brand / Logo */}
        <div className="brand">
          <Link to="/" aria-label="Inicio">
            <img
              src={isMobile ? "/brand-mobile.png" : "/brand-desktop.png"}
              alt="Quanthink"
            />
          </Link>
        </div>

        {/* Links desktop */}
        <nav className="links links-desktop">
          <NavLinkA to="/">Inicio</NavLinkA>
          <a href="/#servicios" className="nav-a">
            <span>Servicios</span>
            <i className="nav-underline" />
          </a>
          <a href="/#casos" className="nav-a">
            <span>Casos</span>
            <i className="nav-underline" />
          </a>
          <a href="/#contacto" className="nav-a">
            <span>Contacto</span>
            <i className="nav-underline" />
          </a>
          <Link to="/login" className="nav-a">
            Demo
            <i className="nav-underline" />
          </Link>
        </nav>

        {/* Burger móvil */}
        <BurguerButton
  as="button"
  className="nav-burger md:hidden"   // 👈 visible solo < md
  aria-label="Abrir menú"
  aria-expanded={open}
  onClick={() => setOpen(v => !v)}
/>
      </div>

      {/* Menú móvil */}
      <div className={`nav-tray ${open ? "open" : ""}`}>
        <a href="/" className="nav-row" onClick={() => setOpen(false)}>
          Inicio
        </a>
        <a href="/#servicios" className="nav-row" onClick={() => setOpen(false)}>
          Servicios
        </a>
        <a href="/#casos" className="nav-row" onClick={() => setOpen(false)}>
          Casos
        </a>
        <a href="/#contacto" className="nav-row" onClick={() => setOpen(false)}>
          Contacto
        </a>
        <Link to="/login" className="nav-row" onClick={() => setOpen(false)}>
          Demos
        </Link>
      </div>
    </header>
  );
}
