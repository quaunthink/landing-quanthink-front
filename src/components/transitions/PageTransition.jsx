import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

/**
 * PageTransition
 * - Aplica una transición suave entre rutas usando Framer Motion.
 * - Hace scroll to top en cada cambio de ruta.
 * - Respeta prefers-reduced-motion automáticamente (Framer lo maneja).
 */
export function PageTransition({ children }) {
  const location = useLocation();

  // Scroll al tope en cada cambio de ruta
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [location.pathname]);

  const variants = {
    initial: { opacity: 0, y: 14, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, y: -10, filter: "blur(3px)", transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
