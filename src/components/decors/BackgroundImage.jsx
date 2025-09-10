import React, { useEffect, useRef } from "react";

/**
 * Fondo con parallax suave (mouse + scroll/trackpad + deriva)
 * - No acumula deltas: se basa en scrollY actual (estable en trackpads).
 * - Easing con rAF.
 * - Soporta touch (arrastre vertical) como mejora opcional.
 * Coloca /public/brand-bg.png
 */
export default function BackgroundImage() {
  const imgRef = useRef(null);

  // estado interno
  const st = useRef({
    // mouse target
    mx: 0,
    my: 0,
    // current interpolated
    x: 0,
    y: 0,
    // auto drift
    t: 0,
    // scroll pos (actualizada por scroll, wheel y touch)
    scrollY: 0,
    raf: 0,
    // touch helpers
    touchStartY: 0,
  });

  useEffect(() => {
    const hasWindow = typeof window !== "undefined";

    // ---- Handlers ----
    const onMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dx = (e.clientX - w / 2) / (w / 2); // -1..1
      const dy = (e.clientY - h / 2) / (h / 2);
      // intensidad configurable
      st.current.mx = dx * 24;
      st.current.my = dy * 16;
    };

    const onScroll = () => {
      st.current.scrollY = window.scrollY || 0;
    };

    // algunos navegadores disparan wheel sin cambiar scrollY (suavizado);
    // guardamos un “shadow” del scroll en esos casos para no depender solo de scrollY.
    let shadowScroll = 0;
    const onWheel = (e) => {
      // si el documento puede desplazarse, scrollY ya cambia; el shadow apenas ayuda
      // pero en superficies inerciales ayuda a mantener la sensación si el scroll nativo se bloquea.
      shadowScroll = Math.max(0, shadowScroll + e.deltaY);
      // si la página realmente hizo scroll, alineamos el shadow a scrollY
      const sy = window.scrollY || 0;
      if (Math.abs(sy - shadowScroll) > 2) shadowScroll = sy;
      st.current.scrollY = sy || shadowScroll;
    };

    // Soporte táctil básico (no interfiere con scroll nativo)
    const onTouchStart = (e) => {
      st.current.touchStartY = e.touches?.[0]?.clientY ?? 0;
    };
    const onTouchMove = (e) => {
      const currentY = e.touches?.[0]?.clientY ?? st.current.touchStartY;
      const dy = st.current.touchStartY - currentY; // arrastre hacia arriba = positivo
      // sumamos un pequeño extra para simular parallax si el scroll nativo está frenado
      st.current.scrollY = (window.scrollY || 0) + dy;
    };

    const loop = () => {
      const s = st.current;

      // deriva automática
      s.t += 0.0025;
      const autoX = Math.cos(s.t) * 6;
      const autoY = Math.sin(s.t * 0.9) * 4;

      // parallax de scroll basado en posición ABSOLUTA, no acumulada
      // factor pequeño para que no se desboque
      const scrollParallax = (s.scrollY || 0) * 0.015;

      // objetivo final
      const targetX = s.mx + autoX;
      const targetY = s.my + autoY - scrollParallax;

      // easing
      s.x += (targetX - s.x) * 0.06;
      s.y += (targetY - s.y) * 0.06;

      const el = imgRef.current;
      if (el) el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) scale(1.08)`;

      s.raf = requestAnimationFrame(loop);
    };

    // ---- Listeners ----
    if (hasWindow) {
      st.current.scrollY = window.scrollY || 0;
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("wheel", onWheel, { passive: true });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      st.current.raf = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(st.current.raf);
    };
  }, []);

  return (
    <div className="background-image" aria-hidden>
      <img ref={imgRef} src="/brand-bg.png" alt="" />
    </div>
  );
}
