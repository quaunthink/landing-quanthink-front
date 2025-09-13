// src/pages/HomePage.jsx
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import MagicButton from "../components/ui/MagicButton";
import DemoCard from "../components/ui/DemoCard";

import iaAplicada from "../assets/ia-aplicada.jpg";
import dataI from "../assets/data.jpg";
import apis from "../assets/apis.jpg";
import frontAvanzado from "../assets/front-avanzado.jpg";
import sys from "../assets/systems.jpg";
import Apps from "../assets/apps.jpg";

import legis from "../assets/legislapp.png";
import elect from "../assets/electoral.png";
import edu from "../assets/educacion.png";
import agri from "../assets/agri.png";
import comun from "../assets/vecinos.png";
import salud from "../assets/salud.png";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "521000000000";

const Feature = ({ title, desc }) => (
  <div className="card p-6">
    <div className="kicker mb-2">Servicio</div>
    <h3 className="text-xl font-semibold mb-1">{title}</h3>
    <p className="text-[15px] text-[var(--qt-muted)]">{desc}</p>
  </div>
);

const Case = ({ tag, title, desc, img, onClick }) => (
  <a
    href="#!"
    onClick={(e) => {
      e.preventDefault();
      onClick?.({ tag, title, desc, img });
    }}
    className="group cardex p-5 flex flex-col gap-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/15 transition"
  >
    <span className="kicker">{tag}</span>
    <div className="cover h-[200px] overflow-hidden rounded-lg">
      {img ? (
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            height: "100%",
            color: "#9a2e8",
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

function FacebookVideo({ url }) {
  const boxRef = useRef(null);
  const [sdkReady, setSdkReady] = useState(false);

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
    js.onload = () => setSdkReady(true);
    document.body.appendChild(js);
  }, []);

  useEffect(() => {
    if (!sdkReady || !boxRef.current) return;
    if (window.FB && window.FB.XFBML) {
      window.FB.XFBML.parse(boxRef.current);
    }
  }, [sdkReady]);

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
    </div>
  );
}

export default function HomePage() {
  const openDemoModal = (item) => {
    const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `Hola, me interesa una demo de "${item?.title}".`
    )}`;

Swal.fire({
  title: `<div class="kicker">Solicitar demo</div>
  <div class="swal2-title qt-title">${item?.title || "Demo"}</div>`,
  html: `
    <div class="qt-body">
      <div style="display:flex; align-items:center; gap:.75rem; margin-bottom:.75rem;">
        <div>
          <div style="opacity:.65; font-size:12px;">${item?.tag || ""}</div>
          <div style="font-size:13px;">Agenda una demostración personalizada.</div>
        </div>
      </div>
      <div class="qt-actions" style="display:flex; justify-content:center; gap:1rem; margin-top:1rem;">
        <a id="wa-btn" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          `Hola, me interesa una demo de "${item?.title}".`
        )}" 
        target="_blank" rel="noreferrer" class="qt-btn qt-btn-primary">
          WhatsApp
        </a>
        <button id="close-btn" type="button" class="qt-btn qt-btn-ghost">Regresar</button>
      </div>
    </div>
  `,
  showConfirmButton: false,
  buttonsStyling: false,
  customClass: { popup: "qt-popup" },
  backdrop: true,
  showCloseButton: false,
  didOpen: () => {
    document.getElementById("close-btn")?.addEventListener("click", () => Swal.close());
  }
});
  };

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
              información para la toma de decisiones eficaz.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <MagicButton as="a" href="#sectores">
                Sectores
              </MagicButton>
              <MagicButton as="a" href="#servicios">
                Servicios
              </MagicButton>
            </div>
          </div>

          <div className="lg:col-span-5">
            <FacebookVideo url="https://www.facebook.com/watch/?v=24315342834801551" />
            <div className="text-[13px] text-[var(--qt-muted)] mt-2"></div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="section">
        <div className="container-grid py-14">
          <div className="kicker mb-3">Servicios</div>
          <h2 className="h2 mb-8">Infraestructura modular y escalable</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <DemoCard
              img={iaAplicada}
              title="IA aplicada"
              desc={
                <ul className="list-disc text-left list-inside space-y-3 text-[17px] ">
                  <li>Integración de IA para procesamiento acelerado.</li>
                  <li>Creación y entrenamiento de modelos independientes.</li>
                  <li>Interpretación de información técnica en tiempo real.</li>
                  <li>Workflows a medida en todas las áreas.</li>
                </ul>
              }
            />
            <DemoCard
              img={frontAvanzado}
              title="Frontend UI/UX"
              desc={
                <ul className="list-disc text-left list-inside space-y-3 text-[17px] ">
                  <li>Uso de REACT para diseños de vanguardia.</li>
                  <li>Integración de imágenes y videos de alta calidad.</li>
                  <li>
                    Mapeo de calor para mejorar la experiencia del usuario.
                  </li>
                  <li>
                    Visuales impactantes y fluidos para escritorio y móviles.
                  </li>
                </ul>
              }
            />
            <DemoCard
              img={apis}
              title="APIs"
              desc={
                <ul className="list-disc text-left list-inside space-y-3 text-[17px] ">
                  <li>Backend Python como motor principal.</li>
                  <li>Bases de datos consumibles de alta velocidad.</li>
                  <li>
                    Uso de cifrado de última generación para mayor seguridad.
                  </li>
                  <li>Mantenimiento flexible y en tiempo récord.</li>
                </ul>
              }
            />
            <DemoCard
              img={dataI}
              title="Análisis de Datos"
              desc={
                <ul className="list-disc text-left list-inside space-y-3 text-[17px] ">
                  <li>Estandarización y limpieza de información.</li>
                  <li>Cálculo estadístico para pronósticos certeros.</li>
                  <li>Auditoría de datos.</li>
                  <li>Reportes analíticos y gráficos.</li>
                </ul>
              }
            />
            <DemoCard
              img={sys}
              title="Desde la Nube"
              desc={
                <ul className="list-disc text-left list-inside space-y-3 text-[17px] ">
                  <li>Uso de servidores en la nube.</li>
                  <li>Acceso desde cualquier parte del mundo vía web.</li>
                  <li>Respaldo continuo de datos.</li>
                  <li>Conectividad permanente.</li>
                </ul>
              }
            />
            <DemoCard
              img={Apps}
              title="Apps"
              desc={
                <ul className="list-disc text-left list-inside space-y-3 text-[17px] ">
                  <li>Apps para iOS y Android.</li>
                  <li>WebApp y App móvil.</li>
                  <li>Tiendas en línea con pago digital.</li>
                  <li>Juegos y contenidos educacionales.</li>
                </ul>
              }
            />
          </div>
        </div>
      </section>

      {/* SECTORES */}
      <section id="sectores" className="section">
        <div className="container-grid py-14">
          <div className="kicker mb-3">Sistemas Disponibles</div>
          <h2 className="h2 mb-8">Sectores</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Case
              tag="Gobierno"
              title="Comparador de iniciativas legislativas con trazabilidad"
              desc="Múltiples fuentes, diffs semánticos y reportes."
              img={legis}
              onClick={openDemoModal}
            />
            <Case
              tag="Salud"
              title="Administración hospitalaria, análisis de padecimientos y App para pacientes"
              desc="Modelos médicos especializados y flujos seguros."
              img={salud}
              onClick={openDemoModal}
            />
            <Case
              tag="Agricultura"
              title="APIs para rastreo de lluvia, calidad de las cosechas, plagas y medición satelital"
              desc="Adaptación de sistemas de riego, drones y hardware especializado."
              img={agri}
              onClick={openDemoModal}
            />
            <Case
              tag="Educación"
              title="Credencialización y sistemas de enseñanza a distancia con actividades pedagógicas"
              desc="Inducción a la tecnología para estudiantes."
              img={edu}
              onClick={openDemoModal}
            />
            <Case
              tag="Comunidad"
              title="Red de seguridad vecinal y accesos controlados a fraccionamientos privados"
              desc="Instalación de equipo, botones de pánico y geolocalización en emergencias."
              img={comun}
              onClick={openDemoModal}
            />
            <Case
              tag="Electoral"
              title="Administración de equipos y medición de probabilidad de votación"
              desc="Evaluación de equipos, rutas, imagen, discurso y análisis estadístico."
              img={elect}
              onClick={openDemoModal}
            />
          </div>
        </div>
      </section>

    </div>
  );
}
