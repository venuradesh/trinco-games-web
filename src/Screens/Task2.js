import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import fileDownload from "js-file-download";

import BackBtn from "../assets/undo-theme-color.png";
import InputFeild from "../Components/InputFeild";
import Hand from "../assets/hand.png";
import Point from "../assets/points.png";
import Cover from "../assets/wallpaper4.jpg";
import TrincoSong1 from "../assets/trinco-campus-song1.mpeg";
import TrincoSong2 from "../assets/trinco-campus-song2.mpeg";
import TrincoSong3 from "../assets/trinco-campus-song3.mpeg";

import { collection, addDoc, getDocs, onSnapshot, query, where, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { ReactSession } from "react-client-session";

function Task2() {
  const data = ["only use the facebook post link of short video to upload the video.", "use both #piratesofthetrinco #trincopulse hashtags in the post you upload.", "link can be upload only one time.", "short videos without hashtags will not be allowed.", "wrong hashtags will not be allowed."];
  const navigate = useNavigate();

  const [isTaskComplete, setIsTaskComplete] = useState(false);
  const [songSelected, setSongSelected] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "task2"), where("name", "==", ReactSession.get("un")));
    const user = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setIsTaskComplete(true);
      });
    });

    // console.log(Math.floor(Math.random * 3) + 1);
  }, []);

  const onSubmitClick = () => {
    let link = document.getElementById("selfie-upload").value;
    let name = ReactSession.get("un");

    Promise.all([addTask(link, name)]);
    setIsTaskComplete(true);
  };

  const addTask = (link, name) => {
    console.log(link);
    const ref = doc(collection(db, "task2"));
    const docRef = addDoc(collection(db, "task2"), {
      name: name,
      link: link,
      time: Date.now(),
      key: ref.id,
    });
    console.log("sucsses" + ref.id);
    return docRef;
  };

  const songDownload = () => {
    if (songSelected === null) {
      const randomNumber = Math.floor(Math.random() * 3) + 1;
      console.log(randomNumber);

      if (randomNumber === 1) {
        setSongSelected(TrincoSong1);
      } else if (randomNumber === 2) {
        setSongSelected(TrincoSong2);
      } else {
        setSongSelected(TrincoSong3);
      }
    }
  };

  return (
    <Container>
      <div className="title">
        <div className="back-btn" onClick={() => navigate("/home")}>
          <img src={BackBtn} alt="back" className="back" />
        </div>
        <div className="title-content">Task 02</div>
      </div>
      <div className="content">
        <div className="image-container">
          <img src={Cover} alt="cover-photo" className="coverImage" />
          <a target="_blank" className="music-download" href={songSelected} download="trinco-music.mp3">
            <div className="btn" onClick={() => songDownload()}>
              Download the Song
            </div>
          </a>
          <div className="link">
            {!isTaskComplete ? (
              <>
                <InputFeild type="text" id="selfie-upload" content="Upload the Facebook link here" />
                <img src={Hand} alt="pointer" className="hand" />
              </>
            ) : (
              <></>
            )}
          </div>
          {isTaskComplete ? (
            <div className="btn">Task Complete</div>
          ) : (
            <div className="btn" onClick={(e) => onSubmitClick(e)}>
              Submit
            </div>
          )}
        </div>
        <div className="instruction-container">
          <div className="desc">
            <span>Overview</span>
            <p>Welcome to Trinco Games day 02</p>
            <p>Iit can be either selfie video or any other creative video.</p>
            <p>you can download the song from the download option provided here.(choose any download option.its your choice)</p>
            <p>upload it into facebook then copy the link of your post and paste it in the portal provided.</p>
            <p>hope you you enjoy the game.</p>
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

export default Task2;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 0;
  padding: 0 30px;

  .job-complete {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(8px);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;

    .task-complete-content {
      width: 300px;
      height: 80px;
      background-color: var(--theme1);
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 30px;
      border-radius: 12px;
      pointer-events: none;

      .complete {
        width: 30px;
      }
    }
  }

  .title {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;

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
      background-color: var(--white);
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
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 30px;
    position: relative;
    top: 100px;
    z-index: -1;

    .image-container {
      flex: 1;
      height: max-content;
      display: flex;
      flex-direction: column;

      .coverImage {
        width: 100%;
        height: max-content;
        object-fit: contain;
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

      .music-download {
        text-decoration: none;
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

        p {
          margin-top: 10px;
          margin-bottom: 10px;
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
      row-gap: 10px;

      .image-container {
        flex: 1;

        .coverImage {
          height: 40%;
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
