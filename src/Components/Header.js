import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <Container>
      <div className="logo">Trinco Games</div>
      <div className="items">
        <div className="item">Home</div>
        <div className="item">Leaderboard</div>
        <div className="item">Profile</div>
      </div>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  width: 100%;
  height: 60px;
  /* background-color: var(--theme1); */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  position: fixed;
  top: 0;
  z-index: 10;

  .logo {
    font-size: 1.5rem;
    font-family: var(--font-family1);
    font-weight: 600;
    color: var(--white);
    pointer-events: none;
  }

  .items {
    display: flex;
    column-gap: 30px;
    color: var(--white);
    font-size: 1rem;
    font-weight: 400;
    font-family: var(--font-family1);

    .item {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
