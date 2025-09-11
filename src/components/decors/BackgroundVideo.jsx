import React, { useEffect, useRef, useState } from "react";

/**
 * BackgroundVideo:
 * - Parallax suave (mousemove) SOLO en desktop (móvil lo desactiva para no romper autoplay)
 * - Fuente dinámica: mobile vs desktop (matchMedia)
 * - Audio SOLO la primera vez en desktop (persistido con localStorage)
 * - Replay programado opcional (replayEveryMs)
 *
 * Props:
 *   mobileSrc: string  -> "/hero-bg-mobile.mp4"
 *   desktopSrc: string -> "/hero-bg-desktop.mp4"
 *   mobileMaxWidth: number -> breakpoint (px), default 768
 *   replayEveryMs: number -> cada cuánto reiniciar (0 = desactivado), default 30000
 *   pauseMs: number -> pausa antes de reiniciar (ms), default 0
 *   audioKey: string -> clave de localStorage para marcar primera reproducción, default "bgvid_audio_once"
 */
export default function BackgroundVideo({
  mobileSrc = "/hero-bg-mobile.mp4",
  desktopSrc = "/hero-bg-desktop.mp4",
  mobileMaxWidth = 768,
  replayEveryMs = 30000,
  pauseMs = 0,
  audioKey = "bgvid_audio_once",
}) {
  const videoRef = useRef(null);
  const st = useRef({ mx: 0, my: 0, x: 0, y: 0, raf: 0, timer: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [muted, setMuted] = useState(true);

  // Detecta móvil/desktop
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${mobileMaxWidth}px)`);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener ? mq.addEventListener("change", apply) : mq.addListener(apply);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", apply) : mq.removeListener(apply);
    };
  }, [mobileMaxWidth]);

  // Parallax suave SOLO en desktop (en móvil lo desactivamos)
  useEffect(() => {
    if (isMobile) return; // <-- clave para iOS/Android

    const onMove = (e) => {
      const w = window.innerWidth, h = window.innerHeight;
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
      if (el) el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) scale(1.1)`;
      s.raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    st.current.raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(st.current.raf);
    };
  }, [isMobile]);

  // Decide mute inicial: en desktop SOLO la primera vez intentamos con audio
  useEffect(() => {
    const firstDesktopPlayAllowed =
      !isMobile && typeof window !== "undefined" && !localStorage.getItem(audioKey);
    setMuted(!firstDesktopPlayAllowed); // desktop & no flag -> intentar con sonido; en móvil siempre mute
  }, [isMobile, audioKey]);

  // Reproducir y programar reinicios
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const tryPlay = async () => {
      try {
        el.muted = muted;
        await el.play();
        if (!muted && typeof window !== "undefined") {
          localStorage.setItem(audioKey, "1");
        }
      } catch {
        // Autoplay con audio bloqueado -> forzamos mute y reintentamos
        el.muted = true;
        if (muted === false) {
          // evita loop de setMuted si ya estamos en true
          try { await el.play(); } catch {}
        } else {
          try { await el.play(); } catch {}
        }
      }
    };

    el.load?.(); // fuerza recarga si cambió la fuente
    tryPlay();

    // Replay programado opcional
    const schedule = () => {
      clearInterval(st.current.timer);
      if (!replayEveryMs || replayEveryMs <= 0) return;
      st.current.timer = setInterval(async () => {
        if (!videoRef.current) return;
        if (pauseMs > 0) {
          try { videoRef.current.pause(); } catch {}
          await new Promise(r => setTimeout(r, pauseMs));
        }
        videoRef.current.currentTime = 0;
        try { await videoRef.current.play(); } catch {}
      }, replayEveryMs);
    };
    schedule();

    const onVisibility = () => { if (!document.hidden) schedule(); };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(st.current.timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [muted, isMobile, replayEveryMs, pauseMs, audioKey]);

  const src = isMobile ? mobileSrc : desktopSrc;

  return (
    <div className="bg-video-wrap" aria-hidden>
      <video
        key={src}           // refresca al cambiar fuente
        ref={videoRef}
        autoPlay
        playsInline         // necesario para iOS
        muted={muted}       // controlado por estado
        loop                // si quieres replay manual, pon replayEveryMs=0
        preload="auto"
        poster="/hero-poster.jpg"
      >
        {/* MP4 H.264 funciona en iOS */}
        <source src={src} type="video/mp4" />
      </video>
      <div className="bg-video-overlay" />
    </div>
  );
}
