import React, { useEffect, useState } from "react";

export default function ContactDock(){
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow((window.scrollY || 0) > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`contact-dock ${show ? "-show" : ""}`}>
      <a href="mailto:contacto@quanthink.com" aria-label="Email">✉️</a>
      <a href="https://wa.me/5215555555555" target="_blank" rel="noreferrer" aria-label="WhatsApp">💬</a>
      <a href="#contacto" aria-label="Agenda">📅</a>
    </div>
  );
}
