import React, { useEffect, useRef, useState } from "react";

/**
 * BackgroundVideo:
 * - Parallax suave (mousemove)
 * - Fuente dinámica: mobile vs desktop (matchMedia)
 * - Audio SOLO la primera vez en desktop (persistido con localStorage)
 * - Replay programado opcional
 *
 * Props:
 *   mobileSrc: string  -> "/hero-bg-mobile.mp4"
 *   desktopSrc: string -> "/hero-bg-desktop.mp4"
 *   mobileMaxWidth: number -> breakpoint (px), default 768
 *   replayEveryMs: number -> cada cuánto reiniciar (0 = desactivado)
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

  // Parallax suave
  useEffect(() => {
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
  }, []);

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
        // Si muted=false podría bloquearse; capturamos error y forzamos mute
        el.muted = muted;
        await el.play();
        // Si logró reproducirse con sonido por primera vez en desktop, marca la bandera
        if (!muted && typeof window !== "undefined") {
          localStorage.setItem(audioKey, "1");
        }
      } catch {
        // Autoplay con audio bloqueado -> forzamos mute y reintentamos
        el.muted = true;
        setMuted(true);
        try { await el.play(); } catch {}
      }
    };

    // (Re)carga fuente al cambiar tamaño/variante
    el.load?.();
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
        // En replays, siempre respetamos el estado (si ya marcamos audio una vez, seguirá muteado)
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

  // Cambia la fuente según vista
  const src = isMobile ? mobileSrc : desktopSrc;

  return (
    <div className="background-video" aria-hidden>
      <video
        key={src}              // fuerza refresco del <video> al cambiar fuente
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}          // controlado por estado
        // no ponemos loop: si quieres bucle continuo, usa replayEveryMs=0 y agrega loop
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="background-overlay" />
    </div>
  );
}
