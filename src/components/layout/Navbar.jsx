import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavLinkA = ({to, children}) => (
  <Link to={to} className="nav-a group">
    <span>{children}</span>
    <i className="nav-underline" />
  </Link>
);

export default function Navbar(){
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full backdrop-blur bg-[var(--qt-nav)]/65 border-b border-[var(--qt-line)]">
      {/* altura fija suficiente para tu logo */}
      <nav className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-[120px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          {/* logo con altura fija que NO cambia en móvil ni desktop */}
          <img src="/brand.png" alt="Quanthink" className="h-[100px] w-auto"/>
        </Link>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-2">
          <NavLinkA to="/">Inicio</NavLinkA>
          <a href="/#servicios" className="nav-a group"><span>Servicios</span><i className="nav-underline" /></a>
          <a href="/#casos" className="nav-a group"><span>Casos</span><i className="nav-underline" /></a>
          <a href="/#contacto" className="nav-a group"><span>Contacto</span><i className="nav-underline" /></a>
          <Link to="/login" className="btn-ghost ml-2">Demo</Link>
        </div>

        {/* burger button */}
        <button
          onClick={()=>setOpen(!open)}
          aria-label="Abrir menú"
          className="md:hidden nav-burger shrink-0"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* mobile tray full width */}
      <div className={`md:hidden w-full ${open ? 'nav-tray open' : 'nav-tray'}`}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <a href="/" className="nav-row">Inicio</a>
          <a href="/#servicios" className="nav-row">Servicios</a>
          <a href="/#casos" className="nav-row">Casos</a>
          <a href="/#contacto" className="nav-row">Contacto</a>
          <Link to="/login" className="nav-row">Iniciar sesión</Link>
          <a href="https://wa.me/5215555555555" className="nav-row">WhatsApp</a>
        </div>
      </div>
    </header>
  );
}
