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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: #ebecf0;
  margin-right: 0.5rem;
  border-radius: 5px;
  cursor: grab;
`;

export const TitleContainer = styled.div`
  display: flex;
  padding: 1rem 1rem 0;

  h2 {
    height: 1.7rem;
    flex-grow: 1;
    font-size: 1.2rem;
    font-weight: bold;
  }

  button {
    height: 1.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;

    & > svg {
      ${SvgDefaultStyles}
    }
  }
`;

export const CardsContainer = styled.div`
  overflow-x: auto;
  max-height: 55vh;
  padding: 0 1rem;
  flex: 1;
`;



export const InputContainer = styled.div`
  width: 100%;
  max-width: 300px;
  margin-right: 0.5rem;
  display: flex;
`;
