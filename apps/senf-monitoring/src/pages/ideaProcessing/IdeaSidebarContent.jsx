import React from "react";
import styled from "styled-components";
import IdeaProcessPanel from "./IdeaProcessPanel";

const Wrapper = styled.div`
  top: 0;
  right: 0;
  max-width: 800px;
  width: 100%;
  overflow: scroll;
`;

const IdeaSidebarContent = () => {
  return (
    <Wrapper>
      <IdeaProcessPanel />
    </Wrapper>
  );
};

export default IdeaSidebarContent;
