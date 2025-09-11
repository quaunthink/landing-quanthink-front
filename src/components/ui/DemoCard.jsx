// DemoCard.jsx
import React from "react";
import styled from "styled-components";

const DemoCard = ({ title, desc, img }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-inner">
          <div className="card-front">
            <div className="cover h-[200px] overflow-hidden">
              <span className="kicker">{title}</span>
              {img ? (
                <img src={img} loading="lazy" />
              ) : (
                <div
                  style={{
                    display: "grid",
                    placeItems: "center",
                    height: "100%",
                    color: "#89a2e8",
                  }}
                />
              )}
            </div>
          </div>

          <div className="card-back">
            <div>
              <h4 className="text-lg font-semibold group-hover:underline underline-offset-4">
                {title}
              </h4>
              <p className="text-[15px] text-[var(--qt-muted)] mt-1">{desc}</p>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* evita que el wrapper herede min-width que cause overflow en grids/flex */
  min-width: 0;

  .card {
    width: 100%;          /* antes 130% -> causaba desborde */
    max-width: 100%;      /* no pasar del contenedor */
    min-width: 0;         /* permite encoger si el grid lo necesita */
    height: 400px;
    perspective: 1000px;
    background: none;
    border: none;
    box-sizing: border-box;
  }

  .card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.999s;
  }

  .card:hover .card-inner {
    transform: rotateY(180deg);
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    padding: 0.1rem;
    text-align: center;
    overflow: hidden; /* por si el contenido se acerca al borde al rotar */
  }

  .card-front {
    background-color: rgba(209, 213, 237, 0.06);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #fff;
    border: none;
    background: none;
    transform: rotateY(0deg);
  }

  .card-back {
    background-color:rgb(93, 235, 240);
    color: #fff;
    border: none;
    transform: rotateY(180deg);
  }
`;

export default DemoCard;
