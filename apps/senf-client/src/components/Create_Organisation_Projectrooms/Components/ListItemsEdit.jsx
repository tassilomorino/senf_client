import React from "react";
import styled from "styled-components";
import { StyledH3 } from "../../../styles/GlobalStyle";

const ListItemWrapper = styled.div`
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: 2fr 2fr;
  grid-template-rows: 2fr 2fr 2fr 2fr;
  gap: 10px 0px;
  grid-template-areas:
    ". ."
    ". ."
    ". ."
    ". .";
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: start;

  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  margin-bottom: 20px;
`;
const ListItem = styled.div`
  height: 90px;
  width: 180px;
  max-width: 95%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-sizing: border-box;
  box-shadow: 0px 12px 18px -8px rgba(186, 160, 79, 0.2),
    0px -4px 10px 4px rgba(255, 255, 255, 0.2);
  background-color: #fcfbf8;
  border-radius: 18px;
  border: 2px solid #ffffff;
  overflow: hidden;
`;

// const CheckboxWrapper = styled.div`
//   position: absolute;
//   top: 5px;
//   left: 50%;
//   transform: translateX(-50%);
// `;
const ListItemsEdit = ({ listItems, set }) => (
  <ListItemWrapper>
    {listItems.map(({ title }, index) => (
      <ListItem
        key={title}
        onClick={() => set(index + 1)}
      >
        <StyledH3 textAlign="center">{title}</StyledH3>
      </ListItem>
    ))}
  </ListItemWrapper>
);

export default ListItemsEdit;
