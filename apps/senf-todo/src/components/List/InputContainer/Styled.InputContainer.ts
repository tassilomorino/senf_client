import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin-right: 0.5rem;
  box-sizing: border-box;

  .SvgIcon-root {
    fill: currentColor;
    width: 1em;
    height: 1em;
    display: inline-block;
    font-size: 1.5rem;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    flex-shrink: 0;
    user-select: none;
  }
  .Collapse-root {
    height: 0;
    overflow: hidden;
    transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  .Collapse-hidden {
    visibility: hidden;
  }
  .Collapse-entered {
    height: auto;
    overflow: visible;
  }
  .Collapse-wrapper {
    display: flex;
  }
  .Collapse-wrapperInner {
    width: 100%;
  }
  .input-content {
    width: 100%;
    max-width: 300px;
    border-radius: 5px;
    background-color: #ebecf0;
    padding: 0.5rem 0;
    opacity: 0.8;

    & > button {
      cursor: pointer;
      background: none;
      width: 100%;
      padding: 0.5rem;
      border: none;
      margin: auto;
      text-align: left;
      font-size: 14px;
    }
  }
  .input-card {
    background-color: #ebecf0;
    padding: 1rem;
    border-radius: 5px;

    .input-card-container {
      width: 100%;
      margin: auto;

      textarea {
        width: 100%;
        height: 4rem;
        background-color: #fff;
        padding: 0.5rem;
        font-size: 15px;
        border: none;
        border-bottom: 1px solid #ccc;
        resize: none;
      }
    }
    .confirm {
      width: 268px;
      margin: 0.2rem auto;
      display: flex;
      align-items: center;

      .button-confirm {
        height: 2rem;
        width: 6rem;
        background-color: #525252;
        cursor: pointer;
        border: none;
        border-radius: 7px;
        color: #fff;
        font-weight: bold;
        margin-right: 0.5rem;
      }
      .button-cancel {
        background-color: transparent;
        border: none;
        cursor: pointer;

        svg {
          transition: color 0.3s;
        }
      }
    }
  }
`;
