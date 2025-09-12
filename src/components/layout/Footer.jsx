import React from 'react';

const Social = () => (
  <div className="flex items-center gap-3">
    <a className="social small" href="https://wa.me/5215555555555" target="_blank" rel="noreferrer" aria-label="WhatsApp">WA</a>
    <a className="social small" href="https://www.linkedin.com/company/quanthink" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
    <a className="social small" href="https://x.com/quanthink" target="_blank" rel="noreferrer" aria-label="X">X</a>
    <a className="social small" href="https://instagram.com/quanthink" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
    <a className="social small" href="https://github.com/quanthink" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
  </div>
);

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container-grid py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[14px] text-white/70">
        <div className="flex items-center gap-3">
          <img src="/brand-sl.png" alt="Quanthink" className="h-10 w-10 opacity-90"/>
          <span>© {new Date().getFullYear()} Quanthink</span>
        </div>
      </div>
    </footer>
  );
}
