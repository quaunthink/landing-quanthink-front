// DemoCard.jsx
import React from "react";
import styled from "styled-components";

const DemoCard = ({ title, desc, img }) => {
  const isText = typeof desc === "string" || typeof desc === "number";

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-inner">
          {/* FRONT */}
          <div className="card-front">
            <div className="cover h-[200px] overflow-hidden">
              <span className="kicker">{title}</span>
              {img ? (
                <div className="img3d">
                  <div className="plate">
                    <img src={img} loading="lazy" alt={title} />
                  </div>
                  <div className="shadow" />
                </div>
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

          {/* BACK */}
          <div className="card-back">
            {img && (
              <img
                src={img}
                alt={title}
                className="back-img"
                loading="lazy"
              />
            )}
            <div className="back-content">
              <h4 className="text-lg font-semibold kicker">{title}</h4>

              {/* ✅ Evita <ul> dentro de <p>: envolvemos condicionalmente */}
              <div className="text-[15px] mt-8 back-desc">
                {isText ? <p>{desc}</p> : desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  min-width: 0;

  .card {
    width: 100%;
    max-width: 100%;
    min-width: 0;
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
    overflow: hidden;
  }

  .card-front {
    transform-style: preserve-3d;
    background-color: rgba(209, 213, 237, 0.06);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #fff;
    border: none;
    background: none;
    transform: rotateY(0deg);
  }

  .card-back {
    color: #fff;
    border: none;
    transform: rotateY(180deg);
    position: relative;
  }

  .back-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.3);
    z-index: 0;
  }

  .back-content {
    position: relative;
    z-index: 1;
    padding: 1.5rem;
    border-radius: 10px;
    width: 100%;
  }

  .img3d {
    --depth: 22px;
    --radius: 12px;
    position: relative;
    width: 100%;
    height: 100%;
    perspective: 800px;
    display: grid;
    place-items: center;
  }
  .img3d .plate {
    position: relative;
    width: 100%;
    height: 100%;
    transform: translateZ(var(--depth));
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.35),
      0 18px 28px rgba(0, 0, 0, 0.28), 0 36px 56px rgba(0, 0, 0, 0.22);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: 0.25s;
  }
  .card-front:hover .img3d .plate {
    transform: translateZ(calc(var(--depth) + 6px));
  }
  .img3d .shadow {
    position: absolute;
    bottom: 8px;
    width: 88%;
    height: 18%;
    border-radius: 999px;
    background: radial-gradient(
      closest-side,
      rgba(0, 0, 0, 0.45),
      rgba(0, 0, 0, 0)
    );
    filter: blur(6px);
    z-index: 0;
  }
  .img3d img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export default DemoCard;
