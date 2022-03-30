import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import organizationTypes from "../../../../data/organizationTypes";
import { StyledH3 } from "../../../../styles/GlobalStyle";
const Wrapper = styled.div`
  height: 250px;
  width: 100vw;
  padding-bottom: 900px;

  z-index: 9999;
  position: sticky;
  top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Tag = styled.div`
  width: max-content;
  position: relative;
  flex-shrink: 0;
  height: auto; /* 16px */
  white-space: pre;
  overflow: visible;
  font-weight: 600;
  font-style: normal;
  font-family: "Nunito", serif;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  letter-spacing: 0px;
  line-height: 1.2;
  text-align: center;
  cursor: pointer;

  margin-right: 5px;
  box-sizing: border-box;
  height: 34px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 10px 14px 10px;
  box-shadow: 0px 4px 6px -2px rgba(186, 160, 79, 0.2),
    0px -2px 5px 2px rgba(255, 255, 255, 0.2);
  background-color: #f3f1ec;
  overflow: visible;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);

  left: ${(props) => props.left};

  h3 {
    font-size: 30px;
    color: white;
  }
`;

const Icon = styled.div`
  width: 16px;
  position: relative;
  height: 16px;
  flex-grow: 0;
  margin-right: 10px;
  margin-left: 3px;
`;
const Tags = () => {
  const { t } = useTranslation();

  const organizationTypesSliced = organizationTypes.slice(0, -1);

  return (
    <Wrapper>
      {organizationTypesSliced.map((organizationTypes, i) => (
        <Tag
          key={organizationTypes.name}
          color={organizationTypes.color}
          left={organizationTypes.infoPageLeft}
          id={`tag${i + 1}`}
        >
          <Icon data-cy={organizationTypes.name}>
            {organizationTypes.svgIcon}
          </Icon>

          {organizationTypes.label}
        </Tag>
      ))}
    </Wrapper>
  );
};

export default Tags;
