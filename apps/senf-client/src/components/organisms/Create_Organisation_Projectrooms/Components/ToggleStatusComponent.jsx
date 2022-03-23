import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";
import React from "react";
import styled from "styled-components";
import Switch from "../../../atoms/CustomButtons/Switch";

const Divider = styled.div`
  width: 90%;
  height: 1px;
  background-color: rgba(186, 160, 79, 0.2);
  overflow: visible;
  margin: 10px 24px 10px 24px;
`;
const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;
const FlexWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const ToggleStatusComponent = ({
  title,
  status,
  handlePublish,
  handleArchive,
  activeLabel,
  deactivatedLabel,
}) => {
  const handleSwitch = () => {
    if (status === false) {
      handlePublish();
    } else {
      handleArchive();
    }
  };

  return (
    <React.Fragment>
      <br />
      <br />
      <br />

      <Divider />
      <br />
      <br />
      <br />
      <StyledH2 fontWeight="900" textAlign="center">
        {title}
      </StyledH2>
      <br />
      <SwitchWrapper>
        <Switch
          id="deactivate-switch"
          toggled={status}
          onChange={handleSwitch}
        />
        <FlexWrapper>
          <StyledH3
            status={status}
            fontWeight={700}
            opacity={status !== true ? 1 : 0.4}
          >
            {deactivatedLabel}
          </StyledH3>
          <StyledH3 fontWeight="400" margin="0px 20px">
            {" "}
             |
          </StyledH3>
          <StyledH3
            status={status}
            fontWeight={700}
            opacity={status === true ? 1 : 0.4}
          >
            {activeLabel}
          </StyledH3>
        </FlexWrapper>
      </SwitchWrapper>
      <br />
    </React.Fragment>
  );
};

export default ToggleStatusComponent;
