import React, { useEffect, useRef } from "react";

/**
 * Video de fondo con overlay degradado + parallax suave
 * Coloca /public/hero-bg.mp4
 */
export default function BackgroundVideo() {
  const videoRef = useRef(null);
  const st = useRef({ mx: 0, my: 0, x: 0, y: 0, raf: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dx = (e.clientX - w / 2) / (w / 2);
      const dy = (e.clientY - h / 2) / (h / 2);
      st.current.mx = dx * 16;
      st.current.my = dy * 10;
    };

    const loop = () => {
      const s = st.current;
      s.x += (s.mx - s.x) * 0.06;
      s.y += (s.my - s.y) * 0.06;

      const el = videoRef.current;
      if (el) {
        el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) scale(1.1)`;
      }
      s.raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    st.current.raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(st.current.raf);
    };
  }, []);

  return (
    <div className="background-video" aria-hidden>
      <video
        ref={videoRef}
        src="/hero-bg.mp4"
        autoPlay
        muted
        playsInline
      />
      <div className="background-overlay" />
    </div>
  );
}
