import React from 'react'
import styled from "styled-components";

const MainAnimation = styled.div`
  opacity: 1;
  animation: cardanimation 0.8s ease-in-out;
  height: ${(props) => props.height && props.height};
  margin-top: ${(props) => props.marginTop};
  padding-top: ${(props) => props.paddingTop};
  transition: ${(props) => props.transition};
  display: ${(props) => props.display };
`

/* .MainAnimation {
  // opacity: 1;
  // animation: cardanimation 0.8s ease-in-out;
}

.MainAnimation2 {
  // opacity: 1;
  // height: 100vh;
  // margin-top: 90px;
  // animation: cardanimation 0.8s ease-in-out;
}

.MainAnimationChannels {
  // opacity: 1;
  display: block;
  transition: 0.5s;
  // padding-bottom: 2em;
  // height:100%;
  // animation: cardanimation 0.8s ease-in-out;
} */


const MainAnimations = ({
    children,
    height,
    marginTop,
    paddingTop,
    transition,
    display
}) => {
    return (
        <MainAnimation
            height={height}
            margintop={marginTop}
            paddingtop={paddingTop}
            transition={transition}
            display={display}
        >
            {children}
        </MainAnimation>
    )
}

export default MainAnimations
