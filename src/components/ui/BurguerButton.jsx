import React from "react";
import styled from "styled-components";

/**
 * BurguerButton (presentacional, estilo únicamente)
 * - Props:
 *    as: "button" | componente (por defecto "button")
 *    className: para utilidades (ej. "md:hidden")
 *    ...props: onClick, aria-*, type, etc.
 *
 * Ejemplo uso:
 *  <BurguerButton
 *    as="button"
 *    className="nav-burger md:hidden"
 *    aria-label="Abrir menú"
 *    aria-expanded={open}
 *    onClick={() => setOpen(v => !v)}
 *  />
 */
const BurguerButton = React.forwardRef(
  ({ as: As = "button", className = "", ...props }, ref) => {
    return (
      <StyledWrapper className={className}>
        <As ref={ref} className="burger" {...props}>
          <span />
          <span />
          <span />
        </As>
      </StyledWrapper>
    );
  }
);

const StyledWrapper = styled.div`
  /* Variables tunables */
  .burger {
    --burger-bg:   rgba(27, 70, 178, 0.59);
    --burger-color: #cfd7ff;      /* color de las rayitas */
    --burger-hover: #ffffff;       /* color al hover */
    --burger-radius: 10px;
    --burger-gap: 5px;
    --burger-pad-y: .7rem;
    --burger-pad-x: .5rem;
    --bar-w: 24px;
    --bar-h: 2.5px;

    appearance: none;
    -webkit-appearance: none;

    display: inline-grid;
    place-items: center;
    gap: var(--burger-gap);
    padding: var(--burger-pad-y) var(--burger-pad-x);
    border: 1px solid var(--burger-border);
    border-radius: var(--burger-radius);
    background: var(--burger-bg);
    color: var(--burger-color);
    cursor: pointer;

    /* accesibilidad */
    outline: none;
    -webkit-tap-highlight-color: transparent;

    transition: color .2s ease, border-color .2s ease, transform .12s ease;
  }

  .burger:hover {
    transform: translateY(-1px);
  }

  /* halo blanco suave en focus */
  .burger:focus,
  .burger:focus-visible,
  .burger:focus-within {
    outline: none;
    box-shadow:
      0 0 0 3px rgba(255,255,255,.55),
      0 8px 24px rgba(0,0,0,.25);
    border-color: transparent;
    
  }

  /* barras */
  .burger > span {
    display: block;
    width: var(--bar-w);
    height: var(--bar-h);
    background: currentColor;
    border-radius: 2px;
    transition: width .15s ease;
  }

  /* detalle sutil: barra central un pelín más larga en hover */
  .burger:hover > span:nth-child(2) {
    width: calc(var(--bar-w) + 10px);
  }

  /* Firefox outline interno */
  .burger::-moz-focus-inner { border: 0; }
`;

export default BurguerButton;
