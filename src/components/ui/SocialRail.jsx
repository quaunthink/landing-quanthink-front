import React from "react";
import styled from "styled-components";

/** Ajusta tus enlaces reales */
const LINKS = {
  whatsapp: "https://wa.me/5218117995916",
  facebook: "https://www.facebook.com/profile.php?id=61579776782141",
  instagram: "https://www.instagram.com/quanthinkmx?igsh=MTE4aTFnM3k3dzMycg==",
};

const Icon = ({ name }) => {
  switch (name) {
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.66 15.03L2 22l5.11-1.33A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.07-1.12l-.29-.17-3 .78.8-2.92-.19-.3A8 8 0 1 1 12 20Zm4.61-5.39c-.25-.12-1.46-.72-1.69-.8-.23-.08-.4-.12-.57.12s-.65.8-.8.97c-.15.17-.3.18-.55.06s-1.08-.4-2.06-1.27a7.64 7.64 0 0 1-1.41-1.74c-.15-.26 0-.4.12-.52.12-.12.26-.3.38-.46.12-.15.17-.26.25-.43.08-.17.04-.32-.02-.45-.06-.12-.57-1.37-.78-1.88-.2-.48-.4-.42-.57-.43l-.48-.01c-.17 0-.43.06-.66.32-.23.26-.87.85-.87 2.08 0 1.22.9 2.4 1.02 2.57.12.17 1.78 2.73 4.3 3.83.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.66-1.18.2-.58.2-1.06.14-1.17-.06-.11-.23-.17-.48-.29Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 320 512" className="svg" aria-hidden="true">
          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 448 512" className="svg" aria-hidden="true">
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.9 224.1 370.9 339 319.6 339 255.9 287.7 141 224.1 141zm0 189.6a74.7 74.7 0 1 1 74.7-74.7 74.8 74.8 0 0 1-74.7 74.7zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1zM340.5 111.4a26.88 26.88 0 1 1 26.88-26.88A26.88 26.88 0 0 1 340.5 111.4z" />
        </svg>
      );
    default:
      return null;
  }
};

const items = [
  { key: "whatsapp", href: LINKS.whatsapp },
  { key: "facebook", href: LINKS.facebook },
  { key: "instagram", href: LINKS.instagram },
];

export default function SocialRail({ variant = "rail", size = "md" }) {
  return (
    <StyledRail
      className="social-rail"
      data-variant={variant}
      data-size={size}
      role="navigation"
      aria-label="Redes sociales"
    >
      <div className="card">
        <ul>
          {items.map((it) => (
            <li key={it.key} className={`iso-pro iso-${it.key}`}>
              <span />
              <span />
              <span />
              <a
                className="rail-btn"
                href={it.href}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name={it.key} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </StyledRail>
  );
}

const StyledRail = styled.div`
  --rail-size: 60px;
  --rail-pad: 1rem;

  &[data-size="sm"] {
    --rail-size: 48px;
    --rail-pad: 0.75rem;
  }

  .card {
    max-width: fit-content;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    gap: 1rem;
    background: none;
    border: none;
  }

  .card ul {
    padding: 0.8rem;
    display: flex;
    list-style: none;
    gap: 0.9rem;
    align-items: center;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    margin: 0;
    flex-direction: column;
  }

  &[data-variant="footer"] .card ul { flex-direction: row; }

  @media (max-width: 640px) {
    .card ul { flex-direction: row; }
  }

  .card ul li {
    position: relative;
    cursor: pointer;
  }

  /* Link: sin bordes/blancos al estar activo/foco */
  .rail-btn {
    display: grid;
    place-items: center;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    background: transparent;
  }
  .rail-btn:focus,
  .rail-btn:active,
  .rail-btn:focus-visible {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }

  .svg {
    transition: transform 0.3s ease, box-shadow 0.3s ease, color 0.2s ease, background 0.2s ease;
    padding: var(--rail-pad);
    height: var(--rail-size);
    width: var(--rail-size);
    border-radius: 9999px;
    color: var(--rail-color, #999); /* icono por defecto = color de la red */
    fill: currentColor;
    background: rgba(255, 255, 255, 0.06);
    box-shadow:
      inset 0 0 12px rgba(255, 255, 255, 0.18),
      inset 0 0 4px rgba(255, 255, 255, 0.32),
      0 4px 6px rgba(0, 0, 0, 0.10);
  }

  .iso-pro { transition: 0.35s ease; }
  .iso-pro span {
    opacity: 0;
    position: absolute;
    left: 0; top: 0;
    height: var(--rail-size); width: var(--rail-size);
    border-radius: 50%;
    border: 2px solid var(--rail-color, #999);
    box-shadow:
      inset 0 0 16px rgba(255, 255, 255, 0.22),
      inset 0 0 4px rgba(255, 255, 255, 0.35),
      0 5px 5px rgba(0, 0, 0, 0.14);
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .iso-pro:hover .svg {
    transform: translate(-12px, -12px);
    background: var(--rail-color, #999); /* relleno del botón */
    color: #fff; /* icono blanco al hover */
  }
  .iso-pro:hover span { opacity: 1; }
  .iso-pro:hover span:nth-child(1) { opacity: 0.22; }
  .iso-pro:hover span:nth-child(2) { opacity: 0.42; transform: translate(-6px, -6px); }
  .iso-pro:hover span:nth-child(3) { opacity: 0.62; transform: translate(-12px, -12px); }

  @media (max-width: 640px) {
    .iso-pro:hover .svg { transform: translate(0, 0); }
    .iso-pro:hover span:nth-child(2),
    .iso-pro:hover span:nth-child(3) { transform: translate(0, 0); }
  }

  /* Colores por plataforma */
  .iso-whatsapp { --rail-color: #25D366; }
  .iso-facebook { --rail-color: #1877F2; }
  .iso-instagram { --rail-color: #E1306C; }


  /* Centrado inferior en móvil */
@media (max-width: 640px) {
  &[data-variant="rail"] {
    position: fixed;
    left: 87%;
    bottom: calc(12px + env(safe-area-inset-bottom));
    transform: translateX(-50%);
    width: auto;
    z-index: 120;

    .card {
      flex-direction: row;
      gap: 8px;
    }

    .card ul {
      flex-direction: row !important;
      gap: 8px;
    }
  }
}

/* Footer desactiva el modo fijo */
&[data-variant="footer"] {
  position: static;
  left: auto;
  bottom: auto;
  transform: none;
}

`;
