import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Image from "../assets/wallpaper2.jpg";
import InputFeild from "../Components/InputFeild";
import Back from "../assets/undo.png";

function Register() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState("individual");

  const onSubmitClick = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <div className="background">
        <div className="background-image"></div>
      </div>
      <div className="back-btn">
        <img src={Back} alt="back" onClick={() => navigate("/")} />
      </div>

      <div className="register-container">
        <div className="cover"></div>
        <form className="form">
          <div className="title">Register</div>
          <div className="inputs">
            {clicked === "individual" ? <InputFeild type="text" id="full-name" content="Name" /> : <InputFeild type="text" id="group-name" content="Group name" />}
            <select name="faculties" id="faculties">
              <option value="none" disabled selected hidden>
                Select Faculty
              </option>
              <option value="fas">FAS</option>
              <option value="fcbs">FCBS</option>
              <option value="siddha">Siddha Unit</option>
            </select>
            {clicked === "individual" ? (
              <InputFeild type="text" id="reg-no" content="Register Number" />
            ) : (
              <>
                <div className="member">
                  <InputFeild type="text" id="full-name1" content="member 1 Name" />
                  <InputFeild type="text" id="reg-no1" content="Register Number" />
                </div>
                <div className="member">
                  <InputFeild type="text" id="full-name2" content="member 2 Name" />
                  <InputFeild type="text" id="reg-no2" content="Register Number" />
                </div>
                <div className="member">
                  <InputFeild type="text" id="full-name3" content="member 3 Name" />
                  <InputFeild type="text" id="reg-no3" content="Register Number" />
                </div>
                <div className="member">
                  <InputFeild type="text" id="full-name4" content="member 4 Name" />
                  <InputFeild type="text" id="reg-no4" content="Register Number" />
                </div>
              </>
            )}
            {clicked === "individual" ? <InputFeild type="text" id="username" content="Username" /> : <></>}
            <InputFeild type="password" id="password" content="Password" />
          </div>
          <div className="btn-container">
            <button type="submit" className="submit btn" onClick={(e) => onSubmitClick(e)}>
              Submit
            </button>
            <button type="reset" className="reset btn">
              Reset
            </button>
          </div>
          <div className="tabs">
            <div className={`individual tab ${clicked === "individual" ? "active" : ""}`} onClick={() => setClicked("individual")}>
              Individual
            </div>
            <div className={`group tab ${clicked === "group" ? "active" : ""}`} onClick={() => setClicked("group")}>
              Group
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Register;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: var(--white);
  z-index: 0;

  .back-btn {
    position: absolute;
    left: 20px;
    top: 20px;
    cursor: pointer;
    transform: all 0.3s ease;

    &:hover {
      transform: scale(1.03);
    }

    img {
      width: 30px;
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background-color: var(--theme1);
    z-index: -1;
  }

  .register-container {
    width: 800px;
    height: 500px;
    background-color: var(--white);
    box-shadow: 0 0 10px 0px var(--theme1);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    border-radius: 8px;
    overflow: hidden;

    .cover {
      flex: 3;
      background-image: url(${Image});
      background-size: cover;
      background-position: center;
      object-fit: center;
      background-color: var(--theme1);
      background-blend-mode: soft-light;
    }

    .form {
      flex: 2;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        font-size: 2rem;
        margin-bottom: 10px;
        font-weight: 600;
        text-transform: uppercase;
        text-align: center;
      }

      .inputs {
        overflow-y: auto;
        margin-bottom: 10px;
        padding-right: 10px;

        &::-webkit-scrollbar {
          width: 5px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: var(--theme1);
        }

        select {
          margin-top: 10px;
          margin-bottom: 10px;
          width: 100%;
          height: 40px;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid var(--shadow);
          outline: none;
          font-size: 0.9rem;
          font-weight: 100;
          font-family: var(--font-family2);
          color: var(--shadow);

          option {
            font-size: 1rem;
          }
        }

        .member {
          display: flex;
          column-gap: 20px;
        }
      }

      .tabs {
        display: flex;
        align-items: center;

        .tab {
          flex: 1;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          background-color: var(--gray);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;

          &.active {
            background-color: var(--theme1);
          }
        }
      }

      .btn-container {
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        column-gap: 10px;

        .btn {
          background-color: var(--theme1);
          color: var(--white);
          flex: 1;
          height: 50px;
          font-family: var(--font-family2);
          border: none;
          cursor: pointer;
        }

        .reset {
          background-color: var(--red);
        }
      }
    }
  }

  @media only screen and (max-width: 950px) {
    .register-container {
      width: 70%;

      .cover {
        display: none;
      }
    }
  }

  @media only screen and (max-width: 650px) {
    .background {
      width: 80%;
    }

    .register-container {
      width: 90%;

      .cover {
        display: none;
      }
    }
  }

  @media only screen and (max-width: 450px) {
  }
`;
