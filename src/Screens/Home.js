import React from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import Image from "../assets/map2.jpg";

function Home() {
  return (
    <Container>
      <Header />
      <div className="map">
        <div className="background"></div>
        <div className="background-tint"></div>
      </div>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 100vw;
  height: calc(100vh);

  .map {
    width: 100%;
    height: calc(100vh);
    position: relative;

    .background {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-image: url(${Image});
      background-size: cover;
      object-fit: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    .background-tint {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--theme1);
      opacity: 0.5;
    }
  }
`;
