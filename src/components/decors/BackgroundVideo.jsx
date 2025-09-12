// BackgroundVideo.jsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function BackgroundVideo({
  mobileSrc = "/hero-bg-mobile.mp4",
  desktopSrc = "/hero-bg-desktop.mp4",
  mobileMaxWidth = 768,
  mutedByDefault = true,     // déjalo true si no quieres audio en móvil/desktop
  replayEveryMs = 0,         // 0 = loop nativo; >0 = reinicio programado
}) {
  const videoRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia(`(max-width: ${mobileMaxWidth}px)`);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener ? mq.addEventListener("change", apply) : mq.addListener(apply);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", apply) : mq.removeListener(apply);
    };
  }, [mobileMaxWidth]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const play = async () => { try { await el.play(); } catch {} };
    play();

    let t;
    if (replayEveryMs > 0) {
      t = setInterval(() => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play?.();
      }, replayEveryMs);
    }
    return () => clearInterval(t);
  }, [replayEveryMs, isMobile]);

  const src = isMobile ? mobileSrc : desktopSrc;
  const node = (
    <div className="background-video" aria-hidden>
      <video
        key={src}
        ref={videoRef}
        autoPlay
        playsInline
        muted={mutedByDefault}
        loop={replayEveryMs === 0}
        preload="none"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="background-overlay" />
    </div>
  );

  // Render directo al <body> para evitar ancestors con transform
  return mounted ? createPortal(node, document.body) : null;
}
