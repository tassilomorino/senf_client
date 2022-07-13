import React from "react";
import styled from "styled-components";
import { TagSlide } from "senf-atomic-design-system";
import { useDispatch, useSelector } from "react-redux";
import { StyledH2, StyledText } from "../../styles/GlobalStyle";
import { handleTopicSelectorRedux } from "../../redux/actions/UiActions";

const Wrapper = styled.div``;

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 50px;
  position: relative;
  top: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
`;

const TextWrapper = styled.div`
  width: 90%;
  margin-left: 5%;
`;
const ClickBlocker = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9;
`;

const GraphsWrapper = ({ graphType, title, subTitle, plot }) => {
  const dispatch = useDispatch();
  const selectedTopics = useSelector((state) => state.data.topics);

  const handleSelectTopics = (topics) => {
    dispatch(handleTopicSelectorRedux(topics));
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <TextWrapper>
          <StyledH2 fontWeight="900" textAlign="center">
            {title}
          </StyledH2>

          <StyledText textAlign="center">{subTitle}</StyledText>
        </TextWrapper>
        {graphType !== "topicsSum" && (
          <TagSlide
            type="topics"
            selectedTopics={selectedTopics}
            handleSelectTopics={handleSelectTopics}
          />
        )}
      </InnerWrapper>
      <ClickBlocker />
      {plot}
    </Wrapper>
  );
};

export default GraphsWrapper;
