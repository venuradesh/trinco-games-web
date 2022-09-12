import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Image from "../assets/wallpaper2.jpg";
import InputFeild from "../Components/InputFeild";
import Back from "../assets/undo.png";
import Cross from "../assets/cross.png";
import Point from "../assets/points.png";

import { collection, addDoc, getDocs, onSnapshot, query, where, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { ReactSession } from "react-client-session";

function Register() {
  const data = ["Users only can register either individual or group only.(individual player cannot be a member of any group)", "When you register please use your full registration number.(EX:EUSL/TC/IS/......)", "If you are a individual player use a unique name for your username.", "If you are a group please use a unique group name.", "Every task will be awarded by points.according to that points leaderboard will be updated every day.", "At the end of the 5th day user or team who gets the highest marks will be the winner.", "dont use any vpn to log into the game."];
  ReactSession.setStoreType("localStorage");
  const navigate = useNavigate();
  const [clicked, setClicked] = useState("individual");
  const [nameError, setNameError] = useState("");
  const [regNumError, setRegNumError] = useState("");
  const [grpError, serGrpError] = useState("");
  const [regNoPatternError, setRegNoPatternError] = useState("");
  const [grpNameError, setGrpNameError] = useState("");
  const [singleFeildMissingError, setSingleFeildMissingError] = useState("All Feilds Must be required");
  const [groupFeildMissingError, setGroupFeildMissingError] = useState("All Feilds Must be required");
  const [insClicked, setInsClicked] = useState(false);
  // useEffect(() => {
  //   if(typeof(ReactSession.get("un")) == "undefined" || ReactSession.get("un") == ""){
  //     navigate("/");
  //   }
  // });

  const onSubmitClick = (e) => {
    e.preventDefault();
    let name = "";
    let userName = "";
    let password = "";
    let groupName = "";
    let faculty = "";
    let regNo = "";
    let tpno = "";
    let groupRegNo = [];
    let groupMembersName = [];
    if (clicked === "individual") {
      name = document.getElementById("full-name").value;

      regNo = document.getElementById("reg-no").value;
      userName = document.getElementById("username").value;
    } else {
      groupName = document.getElementById("group-name").value;

      groupMembersName.push(document.getElementById("full-name1").value);
      groupMembersName.push(document.getElementById("full-name2").value);
      groupMembersName.push(document.getElementById("full-name3").value);
      groupMembersName.push(document.getElementById("full-name3").value);

      groupRegNo.push(document.getElementById("reg-no1").value);
      groupRegNo.push(document.getElementById("reg-no2").value);
      groupRegNo.push(document.getElementById("reg-no3").value);
      groupRegNo.push(document.getElementById("reg-no4").value);
    }
    faculty = document.getElementById("faculties").value;
    password = document.getElementById("password").value;
    tpno = document.getElementById("contact-no").value;

    if (clicked === "individual") {
      if (checkAllFeildsSingle(name, userName, faculty, password, regNo, tpno)) {
        Promise.all([addSingleUser(name, userName, faculty, password, regNo, tpno)]);
      } else {
        setSingleFeildMissingError("All Feilds Must be required");
        console.log(singleFeildMissingError);
        alert(singleFeildMissingError);
      }
    } else {
      if (checkAllFeildsGroup(groupName, groupMembersName, faculty, password, groupRegNo, tpno)) {
        Promise.all([addGroup(groupName, groupMembersName, faculty, password, groupRegNo, tpno)]);
      } else {
        setGroupFeildMissingError("All Feilds Must be required");
        console.log(groupFeildMissingError);
        alert(groupFeildMissingError);
      }
    }
  };

  function addSingleUser(name, userName, faculty, password, regNo, tpno) {
    if (nameError == "" && regNumError == "" && grpError == "" && regNoPatternError == "") {
      const ref = doc(collection(db, "single_user"));
      const docRef = addDoc(collection(db, "single_user"), {
        name: name,
        userName: userName,
        faculty: faculty,
        password: password,
        regNo: regNo,
        tpNo: tpno,
        points: 0,
        key: ref.id,
      });
      console.log("sucsses" + ref.id);
      navigate("/");
    } else {
      console.log(nameError);
      console.log(regNumError);
      console.log(grpError);
      console.log(regNoPatternError);
      alert(nameError + "\n" + regNumError + "\n" + grpError + "\n" + regNoPatternError);
    }
  }

  const checkUser = (e) => {
    let t = true;
    let userName = e.target.value;
    let q = query(collection(db, "single_user"));
    let user = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().userName == userName) {
          setNameError("user Name already added");
          t = false;
        }
      });
    });
    if (t) {
      setNameError("");
    }
  };
  const checkRegNumber = (e) => {
    let t = true;

    if (clicked === "individual") {
      let regNo = document.getElementById("reg-no").value;
      validRegNo(regNo);
      const q = query(collection(db, "single_user"));
      const user = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().regNo == regNo) {
            setRegNumError(regNo + " register number already added");
            t = false;
          }
        });
      });
      if (t) {
        setRegNumError("");
      }
    } else {
      let regNo1 = document.getElementById("reg-no1").value;
      let regNo2 = document.getElementById("reg-no2").value;
      let regNo3 = document.getElementById("reg-no3").value;
      let regNo4 = document.getElementById("reg-no4").value;
      validRegNo(regNo1);
      validRegNo(regNo2);
      validRegNo(regNo3);
      validRegNo(regNo4);
      const q = query(collection(db, "single_user"));
      const user = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().regNo == regNo1) {
            setRegNumError(regNo1 + " register number already added");
            t = false;
          } else if (doc.data().regNo == regNo2) {
            setRegNumError(regNo2 + " register number already added");
            t = false;
          } else if (doc.data().regNo == regNo3) {
            setRegNumError(regNo3 + " register number already added");
            t = false;
          } else if (doc.data().regNo == regNo4) {
            setRegNumError(regNo4 + " register number already added");
            t = false;
          }
        });
      });
      if (t) {
        setRegNumError("");
      }
    }

    checkGrpError();
  };

  const checkGrpError = () => {
    let t = true;
    if (clicked === "individual") {
      let regNo = document.getElementById("reg-no").value;
      validRegNo(regNo);
      const q = query(collection(db, "group"));
      const user = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().groupRegNo1 == regNo || doc.data().groupRegNo2 == regNo || doc.data().groupRegNo3 == regNo || doc.data().groupRegNo4 == regNo) {
            serGrpError(regNo + " you are already registered a in group");
            t = false;
          }
        });
      });
      if (t) {
        serGrpError("");
      }
    } else {
      let regNo1 = document.getElementById("reg-no1").value;
      let regNo2 = document.getElementById("reg-no2").value;
      let regNo3 = document.getElementById("reg-no3").value;
      let regNo4 = document.getElementById("reg-no4").value;
      validRegNo(regNo1);
      validRegNo(regNo2);
      validRegNo(regNo3);
      validRegNo(regNo4);
      const q = query(collection(db, "group"));
      const user = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().groupRegNo1 == regNo1 || doc.data().groupRegNo2 == regNo1 || doc.data().groupRegNo3 == regNo1 || doc.data().groupRegNo4 == regNo1) {
            serGrpError(regNo1 + " you are already registered a in group");
            t = false;
          } else if (doc.data().groupRegNo1 == regNo2 || doc.data().groupRegNo2 == regNo2 || doc.data().groupRegNo3 == regNo2 || doc.data().groupRegNo4 == regNo2) {
            serGrpError(regNo2 + " you are already registered a in group");
            t = false;
          } else if (doc.data().groupRegNo1 == regNo3 || doc.data().groupRegNo2 == regNo3 || doc.data().groupRegNo3 == regNo3 || doc.data().groupRegNo4 == regNo3) {
            serGrpError(regNo3 + " you are already registered a in group");
            t = false;
          } else if (doc.data().groupRegNo1 == regNo4 || doc.data().groupRegNo2 == regNo4 || doc.data().groupRegNo3 == regNo4 || doc.data().groupRegNo4 == regNo4) {
            serGrpError(regNo4 + " you are already registered a in group");
            t = false;
          }
        });
      });
      if (t) {
        serGrpError("");
      }
    }
  };

  function addGroup(groupName, groupMembersName, faculty, password, groupRegNo, tpno) {
    const ref = doc(collection(db, "group"));

    if (grpNameError == "" && regNumError == "" && grpError == "" && regNoPatternError == "") {
      const docRef = addDoc(collection(db, "group"), {
        name: groupName,
        groupMember1: groupMembersName[0],
        groupMember2: groupMembersName[1],
        groupMember3: groupMembersName[2],
        groupMember4: groupMembersName[3],
        faculty: faculty,
        password: password,
        groupRegNo1: groupRegNo[0],
        groupRegNo2: groupRegNo[1],
        groupRegNo3: groupRegNo[2],
        groupRegNo4: groupRegNo[3],
        tpNo: tpno,
        points: 0,
        key: ref.id,
      });
      console.log("SUCCESS" + ref.id);
      navigate("/");
    } else {
      console.log(grpNameError);
      console.log(regNumError);
      console.log(grpError);
      console.log(regNoPatternError);
      alert(grpNameError + "\n" + regNumError + "\n" + grpError + "\n" + regNoPatternError);
    }
  }

  const checkGroup = (e) => {
    let t = true;
    let groupName = e.target.value;
    let q = query(collection(db, "group"));
    let user = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().groupName == groupName) {
          setGrpNameError("group Name already added");
          t = false;
        }
      });
    });
    if (t) {
      setGrpNameError("");
    }
  };

  const validRegNo = (regNo) => {
    const pattern = new RegExp("^EUSL/TC/IS/+[0-9]{4}/(COM|PS|SM|MS|CS)/[0-9]{2,3}");
    if (pattern.test(regNo)) {
      setRegNoPatternError("");
    } else {
      setRegNoPatternError("Invalid Format Of Registration Number");
    }
  };

  const checkAllFeildsSingle = (name, userName, faculty, password, regNo, tpno) => {
    if (name == "" || userName == "" || faculty == "" || password == "" || regNo == "" || tpno == "") {
      return false;
    } else {
      return true;
    }
  };

  const checkAllFeildsGroup = (groupName, groupMembersName, faculty, password, groupRegNo, tpno) => {
    if (groupName == "" || groupMembersName.length < 4 || faculty == "" || password == "" || groupRegNo.length < 4 || tpno == "") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Container>
      {insClicked ? (
        <div className="insContainer">
          <div className="insBox">
            <div className="instructions-rules">
              <div className="title-content">
                Instructions & Rules
                <img src={Cross} alt="close" className="close-btn" onClick={() => setInsClicked(false)} />
              </div>
              <div className="points">
                {data.map((data, key) => (
                  <div className="point-container">
                    <img src={Point} alt="points" key={key} />
                    <div className="point">{data}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="instructions" onClick={() => setInsClicked(true)}>
        Read Instructions
      </div>
      <div className="background">
        <div className="background-image"></div>
      </div>
      <div className="back-btn">
        <img src={Back} alt="back" onClick={() => navigate("/")} />
      </div>
      <div className="register-container">
        <div className="cover"></div>
        <form className="form" method="get" action="">
          <div className="title">Register</div>
          <div className="inputs">
            {clicked === "individual" ? (
              <>
                <InputFeild type="text" id="full-name" content="Name" checkUser={""} />
              </>
            ) : (
              <>
                <InputFeild type="text" id="group-name" content="Group name" checkUser={checkGroup} />
                {grpNameError ? <div className="error">*{grpNameError}</div> : <></>}
              </>
            )}
            <select name="faculties" id="faculties" defaultValue={"none"}>
              <option value="none" disabled hidden>
                Select Faculty
              </option>
              <option value="fas">FAS</option>
              <option value="fcbs">FCBS</option>
              <option value="siddha">Siddha Unit</option>
            </select>
            {clicked === "individual" ? (
              <>
                <InputFeild type="text" id="reg-no" content="Register Number" checkUser={checkRegNumber} />
                {regNoPatternError ? <div className="error">*{regNoPatternError}</div> : <></>}
              </>
            ) : (
              <>
                <div className="member">
                  <InputFeild type="text" id="full-name1" content="member 1 Name" checkUser={""} />
                  <InputFeild type="text" id="reg-no1" content="Register Number" checkUser={checkRegNumber} />
                </div>
                <div className="member">
                  <InputFeild type="text" id="full-name2" content="member 2 Name" checkUser={""} />
                  <InputFeild type="text" id="reg-no2" content="Register Number" checkUser={checkRegNumber} />
                </div>
                <div className="member">
                  <InputFeild type="text" id="full-name3" content="member 3 Name" checkUser={""} />
                  <InputFeild type="text" id="reg-no3" content="Register Number" checkUser={checkRegNumber} />
                </div>
                <div className="member">
                  <InputFeild type="text" id="full-name4" content="member 4 Name" checkUser={""} />
                  <InputFeild type="text" id="reg-no4" content="Register Number" checkUser={checkRegNumber} />
                </div>
                {regNoPatternError ? <div className="error">*{regNoPatternError}</div> : <></>}
              </>
            )}
            {clicked === "individual" ? (
              <>
                <InputFeild type="text" id="username" content="Username" checkUser={checkUser} />
                {nameError ? <div className="error">*{nameError}</div> : <></>}
              </>
            ) : (
              <></>
            )}
            <InputFeild type="text" id="contact-no" content="Contact Number" />
            <InputFeild type="password" id="password" content="Password" />
          </div>
          {singleFeildMissingError ? <div className="error">*{singleFeildMissingError}</div> : <></>}
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

  .insContainer {
    width: 100%;
    height: 100%;
    z-index: 100;
    position: absolute;
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    .insBox {
      width: 60%;
      height: max-content;
      max-height: 80%;
      overflow: hidden;
      padding: 20px;
      overflow-y: auto;
      background-color: var(--white);
      box-shadow: 0 0 10px 0 var(--gray);
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: var(--theme1);
      }
      .instructions-rules {
        .title-content {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .close-btn {
            width: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            &:hover {
              transform: scale(1.05);
            }
          }
        }
        .points {
          margin-left: 0px;
          .point-container {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            margin-left: 20px;
            img {
              width: 20px;
            }
            .point {
              font-weight: 100;
              margin-left: 20px;
            }
          }
        }
      }
    }
  }

  .error {
    width: 100%;
    font-size: 0.7rem;
    color: var(--red);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    font-weight: 100;
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
    .insContainer {
      .insBox {
        width: 80%;
      }
    }

    .register-container {
      width: 70%;

      .cover {
        display: none;
      }
    }
  }

  @media only screen and (max-width: 650px) {
    .instructions {
      bottom: 20px;
      left: 20px;
      color: var(--white);
    }

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
    .insContainer {
      .insBox {
        width: 90%;
        .instructions-rules {
          .title-content {
            font-size: 1.2rem;
          }
          .points {
            .point-container {
              .point {
                font-size: 0.8rem;
              }
            }
          }
        }
      }
    }
  }
`;
