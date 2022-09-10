import React, { useState } from "react";
import styled from "styled-components";
import Hamburger from "../assets/square.png";

function Header() {
  const [hamClicked, setHamClicked] = useState(false);

  return (
    <Container>
      <div className="logo">Trinco Games</div>
      <div className="items">
        <div className="item">Home</div>
        <div className="item">Leaderboard</div>
        <div className="item">Profile</div>
      </div>
      <div className="hamburger">
        <img src={Hamburger} alt="hamburger" onClick={() => (hamClicked ? setHamClicked(false) : setHamClicked(true))} />
        <div className={`items-ham ${hamClicked ? "active" : ""}`}>
          <div className="item">Home</div>
          <div className="item">Leaderboard</div>
          <div className="item">Profile</div>
        </div>
      </div>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  width: 100%;
  height: 60px;
  /* background-color: var(--theme1); */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  position: fixed;
  top: 0;
  z-index: 10;

  .logo {
    font-size: 1.5rem;
    font-family: var(--font-family1);
    font-weight: 600;
    color: var(--white);
    pointer-events: none;
  }

  .items {
    display: flex;
    column-gap: 30px;
    color: var(--white);
    font-size: 1rem;
    font-weight: 400;
    font-family: var(--font-family1);

    .item {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .hamburger {
    display: none;
  }

  @media only screen and (max-width: 650px) {
    align-items: center;

    .items {
      display: none;
    }

    .hamburger {
      display: flex;
      position: relative;

      img {
        width: 40px;
        height: 40px;
      }

      .items-ham {
        position: absolute;
        visibility: hidden;
        right: -100%;
        top: 60px;
        transition: all 0.3s ease;

        .item {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &.active {
          visibility: visible;
          background-color: var(--white);
          padding: 0px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          right: 0;
          top: 60px;
        }
      }
    }
  }
`;
