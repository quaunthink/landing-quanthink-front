import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Stat = ({label, to}) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (!inView) return;
    const start = 0, end = to, dur = 1200, t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0)/dur);
      setVal(Math.floor(start + (end - start) * (1 - Math.cos(Math.PI * k))/2));
      if (k < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, to]);

  return (
    <div ref={ref} className="text-center">
      <motion.div initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:.4}}>
        <div className="text-3xl font-extrabold">{val.toLocaleString()}+</div>
        <div className="opacity-70">{label}</div>
      </motion.div>
    </div>
  );
};

export default function StatsStrip(){
  return (
    <div className="container-grid py-10">
      <div className="card glass p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        <Stat label="Usuarios impactados" to={120000}/>
        <Stat label="Repos migrados" to={180}/>
        <Stat label="SLA cumplido" to={99}/>
        <Stat label="Años de experiencia" to={12}/>
      </div>
    </div>
  );
}
