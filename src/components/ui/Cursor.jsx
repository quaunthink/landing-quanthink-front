import React, { useEffect, useRef } from "react";

export default function Cursor(){
  const dot = useRef(null);
  const st = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0, hover: false });

  useEffect(() => {
    const el = dot.current;
    if (!el) return;

    const move = (e) => {
      st.current.tx = e.clientX;
      st.current.ty = e.clientY;
    };
    const loop = () => {
      const s = st.current;
      s.x += (s.tx - s.x) * 0.15;
      s.y += (s.ty - s.y) * 0.15;
      el.style.transform = `translate(${s.x}px, ${s.y}px)`;
      s.raf = requestAnimationFrame(loop);
    };
    const enter = () => el.classList.remove("-hide");
    const leave = () => el.classList.add("-hide");

    const addHover = () => el.classList.add("-hover");
    const removeHover = () => el.classList.remove("-hover");

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseenter", enter);
    window.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", (e) => {
      const t = e.target;
      if (t.closest("a, button, .btn, .card")) addHover();
      else removeHover();
    });

    st.current.raf = requestAnimationFrame(loop);

    // ocultar en pantallas táctiles
    const isTouch = "ontouchstart" in window;
    if (isTouch) el.style.display = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", enter);
      window.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(st.current.raf);
    };
  }, []);

  return <div className="cursor -hide" ref={dot} aria-hidden />;
}
