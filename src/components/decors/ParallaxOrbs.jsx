import React, { useEffect, useRef } from 'react';

export default function ParallaxOrbs(){
  const a = useRef(null);
  const b = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const dx = (e.clientX - w/2) / w;
      const dy = (e.clientY - h/2) / h;
      if (a.current) a.current.style.transform = `translate(${dx * 18}px, ${dy * 12}px)`;
      if (b.current) b.current.style.transform = `translate(${dx * -12}px, ${dy * -10}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div ref={a} className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full"
           style={{background: 'radial-gradient(closest-side, rgba(42,110,242,.30), transparent 70%)', filter:'blur(40px)'}} />
      <div ref={b} className="absolute -bottom-24 -right-24 w-[520px] h-[520px] rounded-full"
           style={{background: 'radial-gradient(closest-side, rgba(28,93,219,.28), transparent 70%)', filter:'blur(48px)'}} />
    </div>
  );
}
