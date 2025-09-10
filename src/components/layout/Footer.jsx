import React from 'react';

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container-grid py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[14px] text-white/70">
        <div className="flex items-center gap-3">
          <img src="/brand.png" alt="Quanthink" className="h-6 w-6 opacity-90"/>
          <span>© {new Date().getFullYear()} Quanthink</span>
        </div>
        <nav className="flex gap-4">
          <a href="/#servicios" className="hover:text-white">Servicios</a>
          <a href="/#casos" className="hover:text-white">Casos</a>
          <a href="/#contacto" className="hover:text-white">Contacto</a>
        </nav>
      </div>
    </footer>
  );
}
