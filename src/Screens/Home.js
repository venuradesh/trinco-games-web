import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import Image from "../assets/map2.jpg";
import TaskCard from "../Components/TaskCard";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

function Home() {
  const [tasklock, setTaskLock] = useState([1]);
  ReactSession.setStoreType("localStorage");
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof ReactSession.get("un") == "undefined" || ReactSession.get("un") == "") {
      navigate("/");
    }
  });

  useEffect(() => {
    console.log(tasklock.filter((val) => val === 3)[0]);
  });

  return (
    <Container>
      <Header />
      <div className="map">
        <div className="background"></div>
        <div className="background-tint"></div>
        <div className="tasks">
          <div className="task-list">
            <div className={`task task1 ${typeof tasklock.filter((val) => val === 1)[0] === "undefined" ? "lock" : ""}`}>
              <TaskCard index={1} day="day 01" task="Task 01" desc={"Lorem, ipsum dolor sit amet consectetur "} availability="available" />
            </div>
            <div className={`task task2 ${typeof tasklock.filter((val) => val === 2)[0] === "undefined" ? "lock" : ""}`}>
              <TaskCard index={2} day="day 02" task="Task 02" desc={"Lorem, ipsum dolor sit amet consectetur "} availability="available" />
            </div>
            <div className={`task task3 ${typeof tasklock.filter((val) => val === 3)[0] === "undefined" ? "lock" : ""}`}>
              <TaskCard index={3} day="day 03" task="Task 03" desc={"Lorem, ipsum dolor sit amet consectetur "} availability="available" />
            </div>
            <div className={`task task4 ${typeof tasklock.filter((val) => val === 4)[0] === "undefined" ? "lock" : ""}`}>
              <TaskCard index={4} day="day 04" task="Task 04" desc={"Lorem, ipsum dolor sit amet consectetur "} availability="available" />
            </div>
            <div className={`task task5 ${typeof tasklock.filter((val) => val === 5)[0] === "undefined" ? "lock" : ""}`}>
              <TaskCard index={5} day="day 05" task="Task 05" desc={"Lorem, ipsum dolor sit amet consectetur "} availability="available" />
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
    }
  }
`;
