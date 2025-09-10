import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToSection
 * - En cada cambio de ruta:
 *   - Si hay hash (#id), espera a que el nodo exista y hace scroll suave a ese elemento.
 *   - Si NO hay hash, hace scroll suave al top.
 * - Ajusta el offset para no tapar el target con el navbar.
 */
export default function ScrollToSection({ children }) {
  const location = useLocation();

  useEffect(() => {
    const NAV_OFFSET = 80; // alto aprox. del navbar
    const { hash, pathname } = location;

    // helper: posición del elemento en el documento
    const getDocTop = (el) => {
      const rect = el.getBoundingClientRect();
      return rect.top + window.pageYOffset;
    };

    if (hash) {
      // intentamos varias veces por si el DOM aún no montó esa sección
      let tries = 0;
      const maxTries = 24;
      const interval = 40;

      const tick = () => {
        tries++;
        const id = decodeURIComponent(hash.replace("#", ""));
        const target = document.getElementById(id) || document.querySelector(hash);
        if (target) {
          const top = Math.max(0, getDocTop(target) - NAV_OFFSET);
          window.scrollTo({ top, behavior: "smooth" });
          return;
        }
        if (tries < maxTries) setTimeout(tick, interval);
        else window.scrollTo({ top: 0, behavior: "smooth" });
      };

      tick();
    } else {
      // rutas sin hash -> top suave
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // opcional: enfocar el primer heading en /login /register para UX
    if (pathname === "/login" || pathname === "/register") {
      setTimeout(() => {
        const firstInput = document.querySelector("input, button, a.btn");
        if (firstInput) firstInput.focus({ preventScroll: true });
      }, 300);
    }
  }, [location]);

  return children;
}
