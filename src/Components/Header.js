import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Hamburger from "../assets/square.png";
import { ReactSession } from "react-client-session";
import Logo from "../assets/logo.png";

function Header() {
  const navigate = useNavigate();
  const [hamClicked, setHamClicked] = useState(false);
  ReactSession.setStoreType("localStorage");
  const logOut = () => {
    ReactSession.set("un", "");
    navigate("/");
  };
  return (
    <Container>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="items">
        <div className="item" onClick={() => navigate("/home")}>
          Home
        </div>
        <div className="item" onClick={() => navigate("/leaderboard")}>
          Leaderboard
        </div>
        <div className="item" onClick={() => navigate("/profile")}>
          Profile
        </div>
        <div className="item" onClick={() => logOut()}>
          Logout
        </div>
      </div>
      <div className="hamburger">
        <img src={Hamburger} alt="hamburger" onClick={() => (hamClicked ? setHamClicked(false) : setHamClicked(true))} />
        <div className={`items-ham ${hamClicked ? "active" : ""}`}>
          <div className="item" onClick={() => navigate("/home")}>
            Home
          </div>
          <div className="item" onClick={() => navigate("/leaderboard")}>
            Leaderboard
          </div>
          <div className="item" onClick={() => navigate("/profile")}>
            Profile
          </div>
          <div className="item" onClick={() => logOut()}>
            Logout
          </div>
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

    img {
      width: 100px;
    }
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
      cursor: pointer;

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
          cursor: pointer;
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
          box-shadow: 0 0 10px 0 var(--gray);
        }
      }
    }
  }
`;
