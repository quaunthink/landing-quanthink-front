import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavA = ({to, children}) => (
  <NavLink to={to} className="navlink">
    {children}
  </NavLink>
);

export default function Navbar(){
  const [open, setOpen] = useState(false);
  return (
    <header className="full-bleed sticky top-0 z-50 backdrop-blur bg-[#0A0D14]/55 border-b border-[var(--qt-line)]">
      <nav className="container-grid h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/brand.png" alt="Quanthink" className="h-8 w-8"/>
          <span className="font-extrabold tracking-wide">Quanthink</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <NavA to="/">Inicio</NavA>
          <Link to="/#servicios" className="navlink">Servicios</Link>
          <Link to="/#casos" className="navlink">Casos</Link>
          <Link to="/#contacto" className="navlink">Contacto</Link>
          <Link to="/login" className="btn ml-3">Iniciar sesión</Link>
        </div>

        <button onClick={()=>setOpen(!open)} className="md:hidden border border-[var(--qt-line)] rounded-lg px-3 py-2">☰</button>
      </nav>

      {open && (
        <div className="md:hidden container-grid pb-3">
          <div className="flex flex-col gap-2">
            <NavA to="/">Inicio</NavA>
            <Link to="/#servicios" className="navlink" onClick={()=>setOpen(false)}>Servicios</Link>
            <Link to="/#casos" className="navlink" onClick={()=>setOpen(false)}>Casos</Link>
            <Link to="/#contacto" className="navlink" onClick={()=>setOpen(false)}>Contacto</Link>
            <Link to="/login" className="btn" onClick={()=>setOpen(false)}>Iniciar sesión</Link>
          </div>
        </div>
      )}
    </header>
  );
}
