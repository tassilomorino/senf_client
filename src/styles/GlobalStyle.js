/** @format */

import styled from "styled-components";

export const CenteredH2 = styled.h2`
  text-align: center;
`;

export const StyledH2 = styled.h2`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
`;

export const StyledH3 = styled.h3`
  margin: 0;
  padding: 0;
`;

export const StyledLi = styled.li`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
`;

export const StyledText = styled.p`
  margin: 0;
  font-size: 17px;
  line-height: 20x;
  color: #353535;
`;
export const StyledSmallText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 16x;
  color: #353535;
`;

export const CenteredStyledText = styled(StyledText)`
  text-align: center;
`;

export const SideBarTabs = styled(StyledH3)`
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;

  width: 160px;
  height: 35px;
  left: 20px;
  top: 80px;
  color: #353535;

  margin-bottom: 10px;
  border-radius: 8px;
  padding-right: 10px;
  font-size: 17px;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
`;
