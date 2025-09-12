import React, { useEffect, useRef, useState } from "react";
import MagicButton from "../components/ui/MagicButton";
import DemoCard from "../components/ui/DemoCard";
import iaAplicada from "../assets/ia-aplicada.jpg";
import dataI from "../assets/data.jpg";
import apis from "../assets/apis.jpg";
import frontAvanzado from "../assets/front-avanzado.jpg";
import sys from "../assets/systems.jpg";
import Apps from "../assets/apps.jpg";

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
            <div className="text-[13px] text-[var(--qt-muted)] mt-2"></div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="section">
        <div className="container-grid py-14">
          <div className="kicker mb-3">Servicios</div>
          <h2 className="h2 mb-8">Infraestructura modular y escalable</h2>
          <div className="grid gap-5  min-w-0 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
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
                  <li>Mapeo de calor para mejorar la experiencia del usuario.</li>
                  <li>Visuales impactantes y fluidos para escritorio y móviles.</li>
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
                  <li>Uso de cifrado de última generación para mayor seguridad.</li>
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
                  <li>Apps para IOS y Android.</li>
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
