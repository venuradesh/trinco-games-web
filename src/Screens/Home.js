import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import Image from "../assets/map2.jpg";
import TaskCard from "../Components/TaskCard";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Cross from "../assets/cross.png";
import Point from "../assets/points.png";
import InputFeild from "../Components/InputFeild";

function Home() {
  const data = ["today you have to get your lunch at main canteen.(request it as token rice.it will be rs 150/=)", "then you will be given a token. and there will be a common question about trincomalee campus.", "find the answer and enter it in the box provided.", "then only you can enroll into task 02.", "hope you enjoy day 02 of trinco games."];
  const [tasklock, setTaskLock] = useState([1, 2]);
  const [taskClicked, setTaskClicked] = useState(false);
  const [err, setErr] = useState("");
  const correctAnser = 5;
  ReactSession.setStoreType("localStorage");
  const navigate = useNavigate();

  const onPopupSubmitClick = () => {
    if (parseInt(document.getElementById("input-number").value) === correctAnser) {
      navigate("/task2");
    } else {
      setErr("Incorrect Answer");
    }
  };

  useEffect(() => {
    if (typeof ReactSession.get("un") == "undefined" || ReactSession.get("un") == "") {
      navigate("/");
    }
  });

  return (
    <Container>
      <Header />
      <div className="map">
        <div className="background"></div>
        <div className="background-tint"></div>
        {taskClicked ? (
          <div className="task-popup">
            <div className="instructions">
              <div className="instructions-rules">
                <div className="title-content">
                  Welcome to trinco Games Day 02
                  <img src={Cross} alt="close" className="close-btn" onClick={() => setTaskClicked(false)} />
                </div>
                <div className="points">
                  {data.map((data, key) => (
                    <div className="point-container" key={key}>
                      <img src={Point} alt="points" />
                      <div className="point">{data}</div>
                    </div>
                  ))}
                </div>
                <div className="input-submit">
                  <InputFeild type="text" id="input-number" content="Enter the Number" />
                  <div className="btn-submit" onClick={() => onPopupSubmitClick()}>
                    Submit
                  </div>
                </div>
                <div className="error">{err}</div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="tasks">
          <div className="task-list">
            <div className={`task task1 ${typeof tasklock.filter((val) => val === 1)[0] === "undefined" ? "lock" : ""}`}>
              <TaskCard index={1} day="day 01" task="Task 01" desc={"Try to find the blured place"} availability="available" />
            </div>
            <div className={`task task2 ${typeof tasklock.filter((val) => val === 2)[0] === "undefined" ? "lock" : ""}`}>
              <TaskCard taskPopup={setTaskClicked} index={2} day="day 02" task="Task 02" desc={"Construct a short video"} availability="available" />
            </div>
            <div className={`task task3 ${typeof tasklock.filter((val) => val === 3)[0] === "undefined" ? "lock" : ""}`}>
              <TaskCard index={3} day="day 03" task="Task 03" desc={"Lorem, ipsum dolor sit amet consectetur "} availability="not available" />
            </div>
            <div className={`task task4 ${typeof tasklock.filter((val) => val === 4)[0] === "undefined" ? "lock" : ""}`}>
              <TaskCard index={4} day="day 04" task="Task 04" desc={"Lorem, ipsum dolor sit amet consectetur "} availability="not available" />
            </div>
            <div className={`task task5 ${typeof tasklock.filter((val) => val === 5)[0] === "undefined" ? "lock" : ""}`}>
              <TaskCard index={5} day="day 05" task="Task 05" desc={"Lorem, ipsum dolor sit amet consectetur "} availability="not available" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 100vw;
  height: calc(max-content + 100px);
  z-index: 0;

  .map {
    width: 100%;
    min-height: 100vh;
    height: calc(max-content + 100px);
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
      z-index: -1;
    }

    .background-tint {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--theme1);
      opacity: 0.5;
      z-index: -1;
    }

    .task-popup {
      width: 100vw;
      height: 100vh;
      z-index: 100;
      position: absolute;
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;

      .instructions {
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

          .input-submit {
            display: flex;
            align-items: center;
            justify-content: space-between;
            column-gap: 30px;

            .btn-submit {
              width: 40%;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 8px;
              background-color: var(--theme1);
              font-size: 0.8rem;
              color: var(--white);
              cursor: pointer;
            }
          }

          .error {
            width: 100%;
            font-size: 0.9rem;
            color: var(--red);
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }

    .tasks {
      width: 100%;
      height: calc(100vh - 70px);
      position: relative;
      top: 70px;
      display: flex;
      align-items: center;
      justify-content: center;

      .task-list {
        height: calc(max-content + 10%);
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 20px;
        row-gap: 80px;
        flex-wrap: wrap;

        .task {
          &.lock {
            filter: blur(2px);
            pointer-events: none;
          }

          &:nth-of-type() {
            margin-top: 300px;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1300px) {
    .map {
      .tasks {
        .task-list {
          .task {
            &:nth-of-type(2n) {
              margin-top: 0;
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 800px) {
    .map {
      height: 150vh;

      .task-popup {
        .instructions {
          width: 80%;
        }
      }

      .tasks {
        align-items: flex-start;

        .task-list {
          margin-top: 30px;
        }
      }
    }
  }

  @media only screen and (max-width: 520px) {
    .map {
      height: 230vh;
    }
  }

  @media only screen and (max-width: 450px) {
    .map {
      height: 280vh;

      .task-popup {
        height: 150vh;

        .instructions {
          width: 90%;

          .instructions-rules {
            .title-content {
              font-size: 1.2rem;
            }

            .points {
              .point {
                font-size: 0.8rem;
              }
            }

            .input-submit {
              .btn-submit {
                width: max-content;
                height: max-content;
                padding: 10px 20px;
                font-size: 0.8rem;
              }
            }
          }
        }
      }
    }
  }
`;
