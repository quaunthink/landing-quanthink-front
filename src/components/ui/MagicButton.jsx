import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function MagicButton({ as='button', href, to, onClick, children, className='' }){
  const ref = useRef(null);

  const Comp = as === 'a' ? 'a' : as;
  const props = {};
  if (href) props.href = href;
  if (to) props.href = to; // keep as <a> to avoid router coupling
  if (onClick) props.onClick = onClick;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--x', `${x}px`);
    el.style.setProperty('--y', `${y}px`);
  };

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-flex">
      <Comp
        {...props}
        ref={ref}
        onMouseMove={handleMove}
        className={`btn-magic ${className}`}
      >
        <span className="btn-label">{children}</span>
        <span className="btn-shine" aria-hidden />
      </Comp>
    </motion.div>
  );
}
