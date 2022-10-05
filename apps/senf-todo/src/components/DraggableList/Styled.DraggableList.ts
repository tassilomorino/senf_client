import styled from "styled-components";

export const Content = styled.div`
  position: relative;
  width: 200px;
  height: 100px;

  & > div > li {
    position: absolute;
    width: 100%;
    height: 20px;
  }
`;
