import styled from "styled-components";

const SvgDefaultStyles = `
fill: currentColor;
      width: 1em;
      height: 1em;
      display: inline-block;
      font-size: 1.5rem;
      transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      flex-shrink: 0;
      user-select: none;
`;

export const CardContainer = styled.div`
  overflow-y: hidden;
  margin: 0.5rem 0;
`;

export const Content = styled.div`
  min-height: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0.5rem 0 0;
  background: #fff;
  border-radius: 3px;
  border-bottom: 1px solid #ccc;
  position: relative;

  .input-card-title {
    width: 100%;
    height: 100%;

    padding: 0.7rem 0.5rem 0.5rem;

    resize: none;
    overflow: hidden;

    border-color: transparent;
    border-radius: 3px;
    font-size: 15px;

    transition: border-color 0.2s;

    &:focus {
      border: 1px solid #e22bba;
    }
  }
`;

export const CardTitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 15px;
  transition: background-color 0.1s;

  &:hover {
    background-color: #cecece1f;

    button > svg {
      opacity: 1;
    }
  }

  p {
    padding: 0.7rem 0.5rem 0.5rem;
    max-width: 90%;
    overflow: hidden;
    word-wrap: break-word;
  }

  button {
    padding: 0.5rem 0.5rem 0 0;
    background: none;
    border: none;
    cursor: pointer;

    & > svg {
      ${SvgDefaultStyles}
      opacity: 0;
      transition: color 0.2s, opacity 0.2s;
      &:hover {
        color: #e22bba;
      }
    }
  }
`;
