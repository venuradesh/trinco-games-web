import React from "react";
import styled from "styled-components";

function PointsTile({ name, points, dept, rank, regNo }) {
  return (
    <Container>
      <div className="rank">{rank}</div>
      <div className="profile-pic">{name.charAt(0)}</div>
      <div className="contents">
        <div className="name">{name}</div>
        <div className="dept">
          {dept}
          <div className="reg-no">{regNo}</div>
        </div>
      </div>
      <div className="points-taken">
        <span>{points}</span>Points
      </div>
    </Container>
  );
}

export default PointsTile;

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--theme1);

  .rank {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .profile-pic {
    width: 40px;
    height: 40px;
    background-color: var(--theme1);
    color: var(--white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  .contents {
    width: 60%;

    .name {
      font-size: 1.2rem;
      font-weight: 600;
    }

    .dept {
      font-size: 0.8rem;
      color: var(--gray);
      display: flex;
      align-items: center;
      column-gap: 20px;

      .reg-no {
        font-size: 0.7rem;
      }
    }
  }

  .points-taken {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.8rem;
    color: var(--gray);

    span {
      font-size: 1.5rem;
      color: var(--theme1);
      margin-bottom: -5px;
    }
  }

  @media only screen and (max-width: 450px) {
    .rank {
      font-size: 1.3rem;
    }

    .profile-pic {
      display: none;
    }

    .contents {
      .name {
        font-size: 1rem;
      }

      .dept {
        font-size: 0.8rem;

        .reg-no {
          font-size: 0.6rem;
        }
      }
    }

    .points-taken {
      font-size: 0.6rem;

      span {
        font-size: 1.2rem;
        font-weight: 700;
      }
    }
  }
`;
