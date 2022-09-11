import React , {useEffect} from "react";
import styled from "styled-components";
import Image from "../assets/wallpaper3.jpg";

//components
import Header from "../Components/Header";
import PointsTile from "../Components/PointsTile";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if(window.un==""){
      navigate("/");
    }
  });
  const data = [
    { name: "Venura Warnsooriya", regNo: "EUSL/TC/IS/2018/COM/03", points: "1000", dept: "FAS" },
    { name: "Samitha Prabath", regNo: "EUSL/TC/IS/2017/COM/09", points: "950", dept: "FAS" },
    { name: "Samitha Prabath", regNo: "EUSL/TC/IS/2017/COM/09", points: "950", dept: "FAS" },
    { name: "Samitha Prabath", regNo: "EUSL/TC/IS/2017/COM/09", points: "950", dept: "FAS" },
    { name: "Samitha Prabath", regNo: "EUSL/TC/IS/2017/COM/09", points: "950", dept: "FAS" },
    { name: "Samitha Prabath", regNo: "EUSL/TC/IS/2017/COM/09", points: "950", dept: "FAS" },
    { name: "Samitha Prabath", regNo: "EUSL/TC/IS/2017/COM/09", points: "950", dept: "FAS" },
    { name: "Samitha Prabath", regNo: "EUSL/TC/IS/2017/COM/09", points: "950", dept: "FAS" },
    { name: "Samitha Prabath", regNo: "EUSL/TC/IS/2017/COM/09", points: "950", dept: "FAS" },
    { name: "Samitha Prabath", regNo: "EUSL/TC/IS/2017/COM/09", points: "950", dept: "FAS" },
    { name: "Samitha Prabath", regNo: "EUSL/TC/IS/2017/COM/09", points: "950", dept: "FAS" },
  ];

  return (
    <Container>
      <Header />
      <div className="background"></div>
      <div className="background-tint"></div>
      <div className="leader-board-container">
        <div className="leader-board">
          <div className="first-place">
            <div className="title">Leading Point taker</div>
            <div className="content">
              <div className="profile-pic">V</div>
              <div className="name-container">
                <div className="name">{data[0].name}</div>
                <div className="reg-no">{data[0].regNo}</div>
              </div>
              <div className="points-taken">
                <span>{data[0].points}</span>Points
              </div>
            </div>
            <div className="dept">{data[0].dept}</div>
          </div>
          <div className="other-places">
            {data.map((data, index) => (
              <>{index === 0 ? "" : <PointsTile name={data.name} regNo={data.regNo} points={data.points} rank={index + 1} dept={data.dept} />}</>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Leaderboard;

const Container = styled.div`
  width: 100vw;
  height: calc(100vh);
  position: relative;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${Image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    object-fit: cover;
  }

  .background-tint {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--theme1);
    opacity: 0.7;
  }

  .leader-board-container {
    width: 100%;
    height: calc(100% - 60px);
    position: relative;
    top: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    .leader-board {
      width: 70%;
      height: 80%;
      background-color: var(--white);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      column-gap: 30px;

      .first-place {
        flex: 1;
        background-color: var(--theme1);
        padding-top: 20px;
        position: relative;
        overflow: hidden;

        .title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--white);
          text-align: center;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .profile-pic {
            width: 200px;
            height: 200px;
            background-color: var(--white);
            border-radius: 50%;
            margin: 30px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            color: var(--theme1);
            font-weight: 700;
          }

          .name {
            width: 100%;
            font-size: 1.3rem;
            color: var(--gray);
            text-align: center;
          }

          .reg-no {
            font-size: 0.6rem;
            text-align: center;
            color: var(--shadow);
          }

          .points-taken {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: var(--gray);

            span {
              font-size: 4rem;
              color: var(--red);
            }
          }
        }

        .dept {
          width: 200px;
          height: 40px;
          background-color: var(--white);
          color: var(--theme1);
          position: absolute;
          bottom: 30px;
          right: -50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          transform: rotateZ(-45deg);
        }
      }

      .other-places {
        flex: 2;
        overflow-y: auto;
        padding-right: 20px;

        &::-webkit-scrollbar {
          width: 5px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: var(--theme1);
        }
      }
    }
  }

  @media only screen and (max-width: 1250px) {
    .leader-board-container {
      .leader-board {
        width: 90%;
      }
    }
  }

  @media only screen and (max-width: 980px) {
    .leader-board-container {
      .leader-board {
        .first-place {
          .title {
            font-size: 1.3rem;
          }

          .content {
            .profile-pic {
              width: 150px;
              height: 150px;
            }

            .name {
              font-size: 1.1rem;
            }

            .points-taken {
              font-size: 1rem;
              margin-top: 20px;

              span {
                font-size: 3.5rem;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 820px) {
    .leader-board-container {
      .leader-board {
        flex-direction: column;
        align-items: center;

        .first-place {
          width: 100%;
          .title {
            font-size: 1.3rem;
          }

          .content {
            flex-direction: row;
            width: 100%;
            padding: 0 30px;

            .profile-pic {
              width: 60px;
              height: 60px;
              font-size: 1rem;
            }

            .name-container {
              width: 400px;
              display: flex;
              flex-direction: column;

              .name {
                font-size: 1.5rem;
              }

              .reg-no {
                text-align: center;
              }
            }

            .points-taken {
              width: 100px;
              font-size: 0.8rem;
              margin-top: 0;

              span {
                font-size: 2.5rem;
              }
            }
          }

          .dept {
            left: 50%;
            bottom: 0;
            transform: translateX(-50%) rotateZ(0deg);
          }
        }

        .other-places {
          width: 100%;
          padding-left: 20px;
        }
      }
    }
  }

  @media only screen and (max-width: 650px) {
    .leader-board-container {
      .leader-board {
        .first-place {
          .content {
            .profile-pic {
              min-width: 60px;
              min-height: 60px;
            }

            .name-container {
              .name {
                font-size: 1.2rem;
              }
            }

            .points-taken {
              span {
                font-size: 2rem;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 450px) {
    .leader-board-container {
      .leader-board {
        .first-place {
          max-height: 200px;

          .title {
            font-size: 1.1rem;
          }

          .content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);

            .profile-pic {
              display: none;
            }

            .name-container {
              align-items: flex-start;

              .name {
                text-align: left;
              }
            }

            .points-taken {
              font-size: 0.5rem;

              span {
                font-size: 1.2rem;
              }
            }
          }

          .dept {
            width: max-content;
            padding: 5px 30px;
            height: max-content;
          }
        }
      }
    }
  }
`;
