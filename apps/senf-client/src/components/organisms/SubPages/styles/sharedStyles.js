import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  margin-top: 0vh;
  z-index: 99;
  top: 0;
  position: fixed;
  pointer-events: all;
  overflow: scroll;
  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(254, 217, 87, 1) 6%,
    rgba(255, 218, 83, 1) 41%,
    rgba(255, 255, 255, 1) 100%
  );
  /* animation: OrganizationPageAnimation 0.2s; */

  @media (min-width: 768px) {
    margin-left: 200px;
    width: ${(props) => (props.order ? "calc(100vw - 200px)" : "400px")};
    height: 100vh;
    overflow-y: scroll;
    z-index: 90;
    top: 0;
    position: fixed;
    transition: 0.5s;
  }

  /* @keyframes OrganizationPageAnimation {
  0% {
    left: 50vw;
    opacity: 0;
  }
  100% {
    left: 0vw;
    opacity: 1;
  }
} */
`;

export const CoverWrapper = styled.div`
  margin-left: 50%;
  padding-bottom: 200px;
  transform: translateX(-50%);
  width: calc(100% - 20px);
  max-width: 800px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px 10px;
  grid-template-areas:
    ". ."
    ". .";
  @media (min-width: 768px) {
    margin-top: 50px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }

  @media (min-width: 1068px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }
`;

export const Covers = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9;
  float: left;
  position: relative;
  animation: ${(props) => props.animation};
  overflow: hidden;
  border-radius: 25px;
  background-color: white;
  margin: 0;
  padding: 0;
`;
