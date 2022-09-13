import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function TaskCard({ day, task, desc, availability, index, taskPopup = false }) {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="title">{day}</div>
      <div className="task-cover">{task}</div>
      <div className="desc">{desc}</div>
      <div className="availability">
        Availability: <span>{availability}</span>
      </div>
      <div className="btn" onClick={() => (!taskPopup ? navigate(`/task${index}`) : taskPopup(true))}>
        Enter to the Task
      </div>
      <div className="box"></div>
    </Container>
  );
}

export default TaskCard;

const Container = styled.div`
  width: 250px;
  height: max-content;
  background-color: var(--white);
  padding: 20px;
  border-radius: 12px;
  position: relative;

  .title {
    font-size: 1rem;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 10px;
  }

  .task-cover {
    width: 100%;
    height: 80px;
    background-color: var(--gray);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .desc {
    font-size: 0.8rem;
    text-align: center;
  }

  .availability {
    font-size: 0.8rem;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;

    span {
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
    }
  }

  .btn {
    width: 100%;
    height: 50px;
    background-color: var(--theme1);
    color: var(--white);
    margin-top: 10px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .box {
    width: 30px;
    height: 30px;
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%) rotateZ(45deg);
    background-color: var(--white);
  }
`;
