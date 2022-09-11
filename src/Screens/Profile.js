import React from "react";
import styled from "styled-components";
import Header from "../Components/Header";

function Profile() {
  return (
    <Container>
      <Header />
      <div className="profile-container">
        <div className="profile-details-container">
          <div className="profile-pic">V</div>
          <div className="profile-details">
            <div className="name">Venura Warnasooriya</div>
            <div className="reg-no">EUSL/TC/IS/2018/COM/03</div>
          </div>
          <div className="faculty">FAS</div>
        </div>
      </div>
      <div className="other-details">
        <div className="points">
          You've Earned <span>1000</span> points
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

    .profile-details-container {
      position: relative;
      top: 60px;
      height: calc(100% - 60px);
      padding: 0 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .profile-pic {
        width: 200px;
        height: 200px;
        background-color: var(--white);
        display: flex;
      }
    }
  }
`;
