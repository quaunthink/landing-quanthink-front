import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const logos = [
  { name: 'Andromeda', svg: (<path d="M10 2h4l8 20h-4l-2.2-5.8H8.2L6 22H2L10 2zm1.8 10.2h6.4L15 5.6l-3.2 6.6z" />) },
  { name: 'Nebula', svg: (<circle cx="12" cy="12" r="9" />) },
  { name: 'Zenith', svg: (<rect x="3" y="3" width="18" height="18" rx="3" />) },
  { name: 'Orion', svg: (<path d="M12 2l9 7-3 11H6L3 9l9-7z" />) },
  { name: 'Vertex', svg: (<path d="M3 20h18M6 9l6-6 6 6-6 11-6-11z" />) },
];

const Logo = ({name, children}) => (
  <div className="flex items-center gap-3 px-6 py-3">
    <svg width="28" height="28" viewBox="0 0 24 24" className="opacity-80 fill-none stroke-current" strokeWidth="1.6">
      {children}
    </svg>
    <span className="opacity-80">{name}</span>
  </div>
);

export default function ClientsMarquee() {
  const controls = useAnimationControls();
  useEffect(() => {
    controls.start({ x: "-50%", transition: { duration: 18, ease: "linear", repeat: Infinity } });
  }, [controls]);

  return (
    <div className="container-grid py-10">
      <div className="card glass overflow-hidden">
        <motion.div className="flex whitespace-nowrap" animate={controls}>
          {[...logos, ...logos].map((l, i) => (
            <Logo key={i} name={l.name}>{l.svg}</Logo>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
