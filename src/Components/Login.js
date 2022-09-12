import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

import { collection, addDoc, getDocs, onSnapshot, query, where, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

//components
import InputFeild from "./InputFeild";

function Login() {
  ReactSession.setStoreType("localStorage");
  const navigate = useNavigate();
  const [clicked, setClicked] = useState("individual");
  const [error, setError] = useState("");
  const onIndividualClick = () => {
    setClicked("individual");
  };

  const onGroupClick = () => {
    setClicked("group");
  };

  const onSubmitClick = (e) => {
    e.preventDefault();

    if (clicked == "individual") {
      singleUserLogin();
    } else {
      groupUserLogin();
    }
  };

  const singleUserLogin = () => {
    let name = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    const q = query(collection(db, "single_user"));
    const user = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().password == password && doc.data().userName == name) {
          ReactSession.set("un", name);
          navigate("/home");
          console.log("go to dashboard");
        } else {
          alert("invalid login");
        }
      });
    });
  };

  const groupUserLogin = () => {
    let name = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    const q = query(collection(db, "group"));
    const user = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().password == password && doc.data().name == name) {
          ReactSession.set("un", name);
          navigate("/home");
        } else {
          alert("invalid login");
        }
      });
    });
  };

  return (
    <Container>
      <div className="login-user-type">
        <div className={`individual-user ${clicked === "individual" ? "active" : ""}`} onClick={() => onIndividualClick()}>
          Indivudual
        </div>
        <div className={`group-user ${clicked === "group" ? "active" : ""}`} onClick={() => onGroupClick()}>
          Group
        </div>
      </div>
      {clicked === "individual" ? <InputFeild type="text" id="username" content="user name" /> : <InputFeild type="text" id="username" content="group name" />}
      <InputFeild type="password" id="password" content="password" />
      <div className="btn-container">
        <div className="submit btn" onClick={(e) => onSubmitClick(e)}>
          Submit
        </div>
        <div className="reset btn">Reset</div>
      </div>
      {error ? <div className="error-container">*{error}</div> : <></>}
      <div className="create-account">
        Don't have an accont?
        <div className="create-acc-btn" onClick={() => navigate("/register")}>
          Create Account
        </div>
      </div>
    </Container>
  );
}
export default Login;
const Container = styled.div`
  width: 350px;
  height: max-content;
  background-color: var(--white);
  box-shadow: 0 0 10px 0 var(--shadow);
  position: absolute;
  left: 60%;
  top: 50%;
  transform: translateY(-50%);
  padding: 20px;
  border-radius: 8px;

  .login-user-type {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .individual-user,
    .group-user {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--gray);
      padding: 15px 0px;
      color: var(--white);
      font-size: 0.8rem;
      cursor: pointer;

      &.active {
        background-color: var(--theme1);
      }
    }
  }

  .btn-container {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn {
      width: 45%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }

    .submit {
      background-color: var(--theme1);
    }

    .reset {
      background-color: var(--red);
    }
  }

  .error-container {
    width: 100%;
    font-size: 1rem;
    color: var(--red);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    font-weight: 100;
  }

  .create-account {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 300;

    .create-acc-btn {
      margin-top: 10px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--theme1);
      height: 50px;
      color: var(--white);
      cursor: pointer;

      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  @media only screen and (max-width: 450px) {
    width: calc(100vw - 10%);
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  @media only screen and (max-width: 950px) {
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
`;
