import React, { useEffect } from "react";
import styled from "styled-components";
import Image from "../assets/wallpaper1.jpg";
import Login from "../Components/Login";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

function LandingPage() {
  const navigate = useNavigate();
  ReactSession.setStoreType("localStorage");

  useEffect(() => {
    if (ReactSession.get("un") != "undefined" || ReactSession.get("un") != "") {
      console.log(ReactSession.get("un"));
      //navigate("/home");
    } else {
      //console.log("aaaa");
      navigate("/home");
    }
  });

  return (
    <Container>
      <div className="background-image-container"></div>
      <div className="background-tint"></div>
      <div className="decoration-box"></div>
      <div className="title-container">
        <div className="title">Pirates of the Trinco</div>
        <div className="desc">Fun Week Game Festival</div>
      </div>
      <Login />
      <div className="instructions">Read Instructions</div>
    </Container>
  );
}

export default LandingPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  z-index: 0;

  .background-image-container {
    width: 100%;
    height: 100%;
    background-image: url(${Image});
    background-size: cover;
    object-fit: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .background-tint {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--theme1);
    opacity: 0.4;
    z-index: -1;
  }

  .decoration-box {
    position: absolute;
    width: 40%;
    height: 200%;
    background-color: var(--white);
    top: 0;
    left: calc(100% - 40%);
    transform: rotateZ(45deg);
    z-index: -1;
  }

  .title-container {
    position: absolute;
    top: 40%;
    left: 5%;

    .title {
      margin-top: 10px;
      font-size: 4rem;
      font-family: var(--font-family1);
      font-weight: 800;
      color: var(--white);
      margin-bottom: 5px;
      text-transform: uppercase;
      width: 80%;
    }

    .desc {
      font-size: 0.9rem;
      font-weight: 300;
      color: var(--gray);
    }
  }

  .instructions {
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: var(--theme1);
    cursor: pointer;
    font-weight: 300;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media only screen and (max-width: 950px) {
    .title-container {
      width: 100%;
      top: 5%;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        font-size: 3rem;
        text-align: center;
      }

      .desc {
        padding: 0 5%;
        text-align: center;
      }
    }
    .instructions {
      bottom: 5%;
      left: 5%;
      color: var(--white);
    }
  }

  @media only screen and (max-width: 450px) {
    .title-container {
      .title {
        font-size: 2rem;
      }

      .desc {
        font-size: 0.8rem;
      }
    }
    .instructions {
      width: 100%;
      bottom: 10%;
      left: 0%;
      color: var(--white);
      display: flex;
      justify-content: center;
    }
  }
`;
