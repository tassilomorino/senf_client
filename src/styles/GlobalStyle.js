/** @format */

import styled from "styled-components";

export const CenteredH2 = styled.h2`
  text-align: center;
`;

export const FatH2 = styled.h2`
  font-weight: 900;
`;

export const StyledText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 18x;
  color: #353535;
`;

export const CenteredStyledText = styled(StyledText)`
  text-align: center;
`;

export const SideBarTabs = styled.div`
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
  font-size: 14pt;
  line-height: 14pt;
  color: #353535;

  margin-bottom: 10px;
  border-radius: 17.5px;
`;
