import React, { useEffect, useRef, useState } from "react";
import MagicButton from "../components/ui/MagicButton";
import DemoCard from "../components/ui/DemoCard";
import iaAplicada from "../assets/ia-aplicada.webp";
import dataI from "../assets/data.webp";
import apis from "../assets/apis.webp";
import frontAvanzado from "../assets/front-avanzado.webp";
import sys from "../assets/systems.webp";
import iaAplicadaVid from "../assets/ia-aplicada.webm";
import frontAvanzadoVid from "../assets/front-avanzado.mp4";
import apisVid from "../assets/apis.mp4";
import dataVid from "../assets/data.webm";
import Apps from "../assets/apps.webp";
import AppsVid from "../assets/apps.mp4";
import SysVid from "../assets/sysVid.webm";

const Feature = ({ title, desc }) => (
  <div className="card p-6">
    <div className="kicker mb-2">Servicio</div>
    <h3 className="text-xl font-semibold mb-1">{title}</h3>
    <p className="text-[15px] text-[var(--qt-muted)]">{desc}</p>
  </div>
);

const Case = ({ tag, title, desc, img }) => (
  <a href="#!" className="group card p-5 flex flex-col gap-3">
    <span className="kicker">{tag}</span>
    <div className="cover h-[200px] overflow-hidden">
      {img ? (
        <img src={img} alt={title} loading="lazy" />
      ) : (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            height: "100%",
            color: "#89a2e8",
          }}
        >
          Visual
        </div>
      )}
    </div>
    <div>
      <h4 className="text-lg font-semibold group-hover:underline underline-offset-4">
        {title}
      </h4>
      <p className="text-[15px] text-[var(--qt-muted)] mt-1">{desc}</p>
    </div>
  </a>
);

/* --- Facebook Video con control de audio en móvil (usa SDK y gesto del usuario) --- */
function FacebookVideo({
  url = "https://www.facebook.com/watch/?v=24315342834801551",
}) {
  const boxRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [sdkReady, setSdkReady] = useState(false);

  // Carga del SDK una sola vez
  useEffect(() => {
    if (window.FB && window.FB.XFBML) {
      setSdkReady(true);
      return;
    }
    const scriptId = "facebook-jssdk";
    if (document.getElementById(scriptId)) return;

    const js = document.createElement("script");
    js.id = scriptId;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
    js.async = true;
    js.defer = true;
    js.onload = () => {
      // FB se inicializa automáticamente con XFBML=1 por el hash
      setSdkReady(true);
    };
    document.body.appendChild(js);
  }, []);

  // Parsear el div fb-video y obtener instancia del reproductor
  useEffect(() => {
    if (!sdkReady || !boxRef.current) return;

    const parse = () => {
      if (window.FB && window.FB.XFBML) {
        window.FB.Event.subscribe("xfbml.ready", function (msg) {
          if (msg.type === "video") {
            setPlayer(msg.instance);
          }
        });
        window.FB.XFBML.parse(boxRef.current);
      }
    };
    parse();

    return () => {
      if (window.FB && window.FB.Event && player) {
        // No hay ununsubscribe público necesario aquí para el video embed
      }
    };
  }, [sdkReady]);

  // Gesto de usuario para habilitar sonido y reproducir dentro del frame
  const handleEnableSound = () => {
    if (player && player.play && player.unmute) {
      player.unmute();
      player.play();
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        borderRadius: 12,
      }}
    >
      {/* Contenedor a parsear por el SDK */}
      <div
        ref={boxRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <div
          className="fb-video"
          data-href={url}
          data-allowfullscreen="true"
          data-show-text="false"
          data-autoplay="false"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Overlay para activar sonido (se puede ocultar cuando ya hay player) */}
      <button
        onClick={handleEnableSound}
        type="button"
        style={{
          position: "absolute",
          right: 12,
          bottom: 12,
          zIndex: 2,
          padding: "8px 12px",
          borderRadius: 9999,
          background:
            "linear-gradient(180deg, rgba(18,24,42,.85), rgba(18,24,42,.65))",
          color: "#fff",
          border: "1px solid rgba(255,255,255,.25)",
          backdropFilter: "blur(8px)",
          fontSize: 13,
          lineHeight: 1,
          cursor: "pointer",
        }}
        aria-label="Activar sonido"
      >
        🔊 Sonido
      </button>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section id="inicio" className="full-bleed">
        <div className="container-grid min-h-[calc(100vh-72px)] grid lg:grid-cols-12 gap-10 items-start py-16 lg:py-20">
          <div className="lg:col-span-7 pt-6">
            <div className="kicker mb-3">Think Smarter</div>
            <h1 className="h1">
              Soluciones inteligentes a la medida de nuestros clientes.
            </h1>
            <p className="lead mt-4 max-w-2xl">
              Creamos tecnología personalizada para eficientar el tratamiento de
              información para la toma de decisiones eficaz y eficiente.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <MagicButton as="a" href="#contacto">
                Empezar un proyecto
              </MagicButton>
              <MagicButton as="a" href="#servicios">
                Servicios
              </MagicButton>
            </div>
          </div>

          <div className="lg:col-span-5">
            <FacebookVideo url="https://www.facebook.com/watch/?v=24315342834801551" />
            <div className="text-[13px] text-[var(--qt-muted)] mt-2">
              Una vista rápida de cómo trabajamos y qué entregamos.
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="section">
        <div className="container-grid py-14">
          <div className="kicker mb-3">Qué hacemos</div>
          <h2 className="h2 mb-8">Servicios end-to-end</h2>
          <div className="grid gap-10 mt-10 min-w-0 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
            <DemoCard
              img={iaAplicada}
              title="IA aplicada"
              desc="LLMs, RAG, visión y workflows a medida en dominios legales, médicos y públicos."
              backVideo={iaAplicadaVid}
            />
            <DemoCard
              img={frontAvanzado}
              title="Frontend UI/UX"
              desc="Interfaces de alto rendimiento, animaciones de producto y accesibilidad."
              backVideo={frontAvanzadoVid}
            />
            <DemoCard
              img={apis}
              title="APIs"
              desc="Arquitecturas modernas, microservicios, mensajería, seguridad y observabilidad."
              backVideo={apisVid}
            />
            <DemoCard
              img={dataI}
              title="Análisis de Datos"
              desc="ETL, lakes, catálogos y cuadros ejecutivos en tiempo real."
              backVideo={dataVid}
            />
            <DemoCard
              img={sys}
              title="Desde la Nube"
              desc="Discovery con stakeholders, roadmaps con métricas y gobierno del delivery."
              backVideo={SysVid}
            />
            <DemoCard
              img={Apps}
              title="Apps"
              desc="ETL, lakes, catálogos y cuadros ejecutivos en tiempo real."
              backVideo={AppsVid}
            />
          </div>
        </div>
      </section>

      {/* SECTORES */}
      <section id="sectores" className="section">
        <div className="container-grid py-14">
          <div className="kicker mb-3">Trabajo reciente</div>
          <h2 className="h2 mb-8">Sectores</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Case
              tag="Legislativo"
              title="Comparador de iniciativas con trazabilidad"
              desc="Múltiples fuentes, diffs semánticos y reportes."
              img="/cases/legislativo.jpg"
            />
            <Case
              tag="Salud"
              title="MSG1973: soporte clínico"
              desc="Modelos médicos especializados y flujos seguros."
              img="/cases/salud.jpg"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Case
              tag="Datos públicos"
              title="Gob Data Hub"
              desc="Ingesta masiva y paneles ejecutivos."
              img="/cases/datos.jpg"
            />
            <Case
              tag="LegalTech"
              title="Búsqueda de precedentes"
              desc="RAG, embeddings y citación verificable."
              img="/cases/legal.jpg"
            />
            <Case
              tag="Industria"
              title="Mantenimiento predictivo"
              desc="Telemetría, anomalías y recomendaciones."
              img="/cases/industria.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" className="section">
        <div className="container-grid py-16">
          <div className="card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="kicker mb-1">Contacto</div>
              <h3 className="text-2xl font-bold">
                ¿Listo para construir algo serio?
              </h3>
              <p className="text-[15px] text-[var(--qt-muted)] mt-1">
                Agenda 30 minutos y te proponemos un plan.
              </p>
            </div>
            <a href="mailto:contacto@quanthink.com" className="btn">
              Escríbenos
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
