import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MagicButton from '../ui/MagicButton';

const NavLinkA = ({to, children}) => (
  <Link to={to} className="nav-a group">
    <span>{children}</span>
    <i className="nav-underline" />
  </Link>
);

export default function Navbar(){
  const [open, setOpen] = useState(false);
  return (
    <header className="full-bleed sticky top-0 z-50 backdrop-blur bg-[var(--qt-nav)]/65 border-b border-[var(--qt-line)]">
      {/* aumenté la altura de 72px → 96px */}
      <nav className="container-grid h-[96px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          {/* logo más grande y proporcional */}
          <img src="/brand.png" alt="Quanthink" className="h-30 w-auto"/>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <NavLinkA to="/">Inicio</NavLinkA>
          <a href="/#servicios" className="nav-a group"><span>Servicios</span><i className="nav-underline" /></a>
          <a href="/#casos" className="nav-a group"><span>Casos</span><i className="nav-underline" /></a>
          <a href="/#contacto" className="nav-a group"><span>Contacto</span><i className="nav-underline" /></a>
          <Link to="/login" className="btn-ghost ml-2">Demo</Link>
        </div>

        <button onClick={()=>setOpen(!open)} aria-label="Abrir menú" className="md:hidden nav-burger">
          <span /><span /><span />
        </button>
      </nav>

      {/* mobile tray */}
      <div className={`nav-tray md:hidden ${open ? 'open' : ''}`}>
        <a href="/" className="nav-row">Inicio</a>
        <a href="/#servicios" className="nav-row">Servicios</a>
        <a href="/#casos" className="nav-row">Casos</a>
        <a href="/#contacto" className="nav-row">Contacto</a>
        <Link to="/login" className="nav-row">Iniciar sesión</Link>
        <a href="https://wa.me/5215555555555" className="nav-row">WhatsApp</a>
      </div>
    </header>
  );
}
