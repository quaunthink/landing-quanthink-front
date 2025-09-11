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
                >
                </div>
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
  .card {
    width: 130%;
    height: 400px;
    perspective: 1000px;
    background: none;
    border:none;
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
  }

.card-front {
  background-color: rgba(209, 213, 237, 0.06); /* semi-transparente */
  backdrop-filter: blur(10px);  /* desenfoque del fondo */
  -webkit-backdrop-filter: blur(10px); /* Safari */
  color: #fff;
  border: none;
  background: none;
  transform: rotateY(0deg);
}

  .card-back {
    background-color: #f08a5d;
    color: #fff;
    border: none;
    transform: rotateY(180deg);
  }
`;

export default DemoCard;
