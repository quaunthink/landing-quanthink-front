import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavLinkA = ({ to, children }) => (
  <Link to={to} className="nav-a">
    <span>{children}</span>
    <i className="nav-underline" />
  </Link>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        {/* Brand / Logo (tamaño fijo lo controla .brand img en navbar.css) */}
        <div className="brand">
          <Link to="/" aria-label="Inicio">
            <img src="/brand.png" alt="Quanthink" />
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
          <Link to="/login" className="btn-outline">
            Demo
          </Link>
        </nav>

        {/* Burger móvil */}
        <button
          type="button"
          className="nav-burger"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Menú móvil desplegable (full width por CSS de .nav::before + nav-tray) */}
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
