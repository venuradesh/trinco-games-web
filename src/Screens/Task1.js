import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InputFeild from "../Components/InputFeild";
import Image from "../assets/wallpaper1.jpg";
import BackBtn from "../assets/undo-theme-color.png";
import Point from "../assets/points.png";
import Hand from "../assets/hand.png";

import { collection, addDoc, getDocs, onSnapshot, query, where, doc, setDoc,updateDoc } from "firebase/firestore";
import {db} from "../Firebase/firebase";
import { ReactSession } from 'react-client-session';

function Task1({ randomNumber }) {
  const [isTaskComplete,setIsTaskComplete]=useState(false);
  const images = [
    { index: 1, image: `CampusPhotos/0.jpg` },
    { index: 2, image: `CampusPhotos/1.jpg` },
    { index: 3, image: `CampusPhotos/2.jpg` },
    { index: 4, image: `CampusPhotos/3.jpg` },
    { index: 5, image: `CampusPhotos/4.jpg` },
    { index: 6, image: `CampusPhotos/5.jpg` },
    { index: 7, image: `CampusPhotos/6.jpg` },
    { index: 8, image: `CampusPhotos/7.jpg` },
    { index: 9, image: `CampusPhotos/8.jpg` },
    { index: 10, image: `CampusPhotos/9.jpg` },
  ];
  const data = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, consequuntur.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, consequuntur.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, consequuntur.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, consequuntur.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, consequuntur."];

  const navigate = useNavigate();
  const [imageSelected, setImageSelected] = useState("../assets/campus1.jpg");

  useEffect(() => {
    images.map((image) => {
      if(ReactSession.get("un") == "undefined" || ReactSession.get("un") == ""){
        navigate("/");
      }
      if (image.index === randomNumber) {
        setImageSelected(image.image);
      }
    });
  }, []);

  const onSubmitClick=()=>{
    let link=document.getElementById("selfie-upload").value;
    let randomNum=randomNumber;
    let name=ReactSession.get("un");
    
    Promise.all([addTask(link, randomNum, name)]);
    
  }

  const addTask=(link, randomNum, name)=>{
    console.log(link);
    console.log(randomNum);
    const ref = doc(collection(db, "task1"));
      const docRef = addDoc(collection(db, "task1"), {
        name: name,
        randomNum: randomNum,
        link: link,
        key: ref.id,
      });
      console.log("sucsses" + ref.id);
      return docRef;
  }

  return (
    <Container>
      <div className="title">
        <div className="back-btn" onClick={() => navigate("/home")}>
          <img src={BackBtn} alt="back" className="back" />
        </div>
        <div className="title-content">Task 01</div>
      </div>
      <div className="content">
        <div className="image-container">
          <img src={imageSelected} alt="image" className="challengeImage" />
          <div className="link">
            <InputFeild type="text" id="selfie-upload" content="Upload the Facebook link here" />
            <img src={Hand} alt="pointer" className="hand" />
          </div>
          <div className="btn" onClick={(e)=>onSubmitClick(e)}>Submit</div>
        </div>
        <div className="instruction-container">
          <div className="desc">
            <span>Overview</span>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, totam esse. Accusantium deleniti quis natus, consequatur eum optio excepturi saepe unde, ducimus nobis id nam et eveniet enim voluptas veritatis. Exercitationem, ratione harum tempore provident inventore a illum molestiae pariatur omnis nihil nam dignissimos, ipsum maiores perferendis excepturi quidem repellat iste quos impedit magnam sunt iusto? Pariatur delectus accusantium id! Voluptatum sunt amet sequi ipsa dolores tempore tempora, obcaecati nesciunt explicabo, voluptate vel magni! Quidem culpa sequi in reprehenderit aspernatur maiores rerum voluptatibus tempore ipsam,
          </div>
          <div className="instructions-rules">
            <div className="title-content">Instructions & Rules</div>
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
    </Container>
  );
}

export default Task1;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 0;
  padding: 0 30px;

  .title {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;

    .title-content {
      width: 100%;
      height: 100%;
      font-size: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--theme1);
    }

    .back-btn {
      position: absolute;
      top: 30px;
      left: 30px;
      cursor: pointer;

      img {
        width: 30px;

        &:hover {
          transform: scale(1.03);
        }
      }
    }
  }

  .content {
    width: 100%;
    height: calc(100% - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 30px;
    position: relative;
    top: 100px;

    .image-container {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;

      .challengeImage {
        width: 100%;
        height: 70%;
        object-fit: cover;
        filter: blur(6px);
      }

      .link {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          margin-left: 30px;
          width: 50px;
          object-fit: contain;
          transform: rotateZ(180deg) rotateX(180deg);
          animation: hand 1s ease-in-out alternate infinite;
        }

        @keyframes hand {
          0% {
            transform: rotateZ(180deg) rotateX(180deg) translateX(20px);
          }

          100% {
            transform: rotateZ(180deg) rotateX(180deg) translateX(0px);
          }
        }
      }

      .btn {
        margin-top: 20px;
        width: 100%;
        height: 50px;
        background-color: var(--theme1);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--white);
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          transform: scale(1.02);
        }
      }
    }

    .instruction-container {
      flex: 2;
      height: 100%;
      overflow-y: auto;
      padding-right: 30px;
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--theme1);
      }

      .desc {
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
        font-weight: 100;

        span {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 20px;
        }
      }

      .instructions-rules {
        margin-top: 30px;

        .title-content {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 20px;
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

  @media only screen and (max-width: 1250px) {
    .content {
      .image-container {
        flex: 2;
      }

      .instruction-container {
        flex: 1;
      }
    }
  }

  @media only screen and (max-width: 980px) {
    .content {
      flex-direction: column;

      .image-container {
        flex: 1;
        height: 80%;

        .link {
          padding-left: 20px;
          padding-right: 10px;
        }
      }

      .instruction-container {
        flex: 1;
        margin-top: 20px;
        padding: 0 20px;
      }
    }
  }

  @media only screen and (max-width: 450px) {
    .title {
      .title-content {
        font-size: 2.2rem;
      }
    }

    .content {
      flex-direction: column;
      row-gap: 30px;

      .image-container {
        flex: 1;

        .challengeImage {
          height: 80%;
        }

        .link {
          .hand {
            width: 30px;
          }
        }
      }

      .instruction-container {
        flex: 1;
        padding: 0 10px;

        .desc {
          font-size: 0.8rem;

          span {
            font-size: 1.2rem;
          }
        }

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
