import React from "react";
import styled from "styled-components";

function InputFeild(props) {
  return (
    <Container>
      <input type={props.type} id={props.id} name={props.id} className={`${props.type} input`} autoComplete="off" required />
      <label htmlFor={props.id} className="label-container">
        <span className="label-content">{props.content}</span>
      </label>
    </Container>
  );
}

export default InputFeild;

const Container = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;

  .label-container {
    width: 100%;
    position: absolute;
    pointer-events: none;
    left: 0;
    bottom: 1px;
    border-bottom: 1px solid var(--shadow);
    color: var(--shadow);
    font-weight: 100;
    font-size: 1rem;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      transition: all 0.3s ease;

      border-bottom: 2px solid var(--theme1);
      right: 100%;
    }

    .label-content {
      position: absolute;
      bottom: 0%;
      transition: all 0.3s ease;
    }
  }

  .input {
    width: 100%;
    height: 50px;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1rem;
    padding-top: 25px;

    &:focus,
    &:valid {
      & + .label-container {
        &::after {
          right: 0%;
        }

        .label-content {
          font-size: 0.7rem;
          bottom: 25px;
        }
      }
    }
  }
`;
