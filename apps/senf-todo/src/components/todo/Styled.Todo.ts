import styled from "styled-components";

export const ListItem = styled.li`
  list-style: none;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
`;

export const TodoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;

  button {
    border: 0;
  }
`;
