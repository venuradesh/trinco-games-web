import React ,{useEffect,useState} from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { ReactSession } from 'react-client-session';

import { collection, addDoc, getDocs, onSnapshot, query, where, doc, setDoc,updateDoc,orderBy } from "firebase/firestore";
import {db} from "../Firebase/firebase";

function Profile() {
  ReactSession.setStoreType("localStorage");
  const [userDetails,setUserDetails]=useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if(typeof(ReactSession.get("un")) == "undefined" || ReactSession.get("un") == ""){
      navigate("/");
    }
    const q = query(collection(db, "single_user"),where("userName","==",ReactSession.get("un")));
    const user = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUserDetails((prev) => [...prev, doc.data()]);
        
      });
    });

    const q1 = query(collection(db, "group"),where("name","==",ReactSession.get("un")));
    const user1 = onSnapshot(q1, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUserDetails((prev) => [...prev, doc.data()]);
      });
    });
  });
  return (
    <Container>
      <Header />
      <div className="profile-container">
        <div className="profile-details-container">
          <div className="profile-pic">V</div>
          <div className="profile-details">
            <div className="name">{typeof(userDetails[0]) != "undefined"?userDetails[0].name:""}</div>
            <div className="reg-no">{typeof(userDetails[0]) != "undefined"?userDetails[0].regNo:""}</div>
          </div>
          <div className="faculty">{typeof(userDetails[0]) != "undefined"?userDetails[0].faculty:""}</div>
        </div>
      </div>
      <div className="other-details">
        <div className="points">
          You've Earned <span>{typeof(userDetails[0]) != "undefined"?userDetails[0].points:""}</span> points
        </div>
        <div className="options">
          <div className="delete-acc">Delete Account</div>
        </div>
      </div>
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  .profile-container {
    width: 100%;
    height: 40vh;
    background-color: var(--theme1);
    pointer-events: none;

    .profile-details-container {
      position: relative;
      top: 60px;
      height: calc(100% - 60px);
      padding: 0 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .profile-pic {
        width: 150px;
        height: 150px;
        background-color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 3rem;
        font-weight: 700;
        color: var(--theme1);
      }

      .profile-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .name {
          font-size: 2.5rem;
          color: var(--white);
        }

        .reg-no {
          font-size: 1.3rem;
          color: var(--gray);
          font-weight: 100;
          margin-top: 10px;
        }
      }

      .faculty {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--white);
      }
    }
  }

  .other-details {
    margin-top: 30px;
    display: flex;
    column-gap: 30px;
    padding: 0 40px;

    .points {
      width: 400px;
      height: 300px;
      background-color: var(--theme1);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 1rem;
      color: var(--white);
      pointer-events: none;

      span {
        font-size: 4rem;
        color: var(--red);
      }
    }

    .options {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .delete-acc {
        width: max-width;
        height: 70px;
        background-color: var(--red);
        display: flex;
        align-items: center;
        padding: 0 80px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: var(--theme1);
        font-weight: 600;

        &:hover {
          transform: scale(1.02);
        }
      }
    }
  }

  @media only screen and (max-width: 980px) {
    .profile-container {
      .profile-details-container {
        .profile-pic {
          width: 100px;
          height: 100px;
          font-size: 2rem;
        }

        .profile-details {
          .name {
            font-size: 2rem;
          }

          .reg-no {
            font-size: 1rem;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 800px) {
    .profile-container {
      .profile-details-container {
        padding-top: 30px;
        flex-direction: column;
        height: 75%;

        .profile-pic {
          width: 100px;
          height: 100px;
          font-size: 2rem;
        }

        .profile-details {
          .name {
            font-size: 1.8rem;
          }

          .reg-no {
            font-size: 0.8rem;
          }
        }

        .faculty {
          font-size: 1.8rem;
        }
      }
    }
    .other-details {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 30px;

      .points {
        width: 300px;
      }
    }
  }

  @media only screen and (max-width: 450px) {
    .profile-container {
      .profile-details-container {
        .profile-pic {
          width: 70px;
          height: 70px;
        }

        .profile-details {
          .name {
            font-size: 1.5rem;
          }
        }

        .faculty {
          font-size: 1.5rem;
        }
      }
    }
    .other-details {
      .points {
      }

      .options {
        .delete-acc {
          width: 300px;
          display: flex;
          align-items: center;
          padding: 0;
          justify-content: center;
        }
      }
    }
  }
`;
