import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const MagneticButton = ({ className = '', children, ...rest }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(sy, [-20, 20], [10, -10]);
  const rotateY = useTransform(sx, [-20, 20], [-10, 10]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx / 6);
    y.set(dy / 6);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      {...rest}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`btn ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
