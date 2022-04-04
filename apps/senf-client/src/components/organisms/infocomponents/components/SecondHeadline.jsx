import React, { useState } from "react";
import { useTrail, a } from "@react-spring/web";
import styled from "styled-components";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const TrailsText = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  will-change: transform, opacity;
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

const HeadlineText = styled.h1`
  color: white;
  line-height: ${(props) => (props.fontSize ? props.fontSize : "50px")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "50px")};
  font-weight: 1000;
  letter-spacing: -0.05em;
  height: 30px;
  display: inline-block;
  text-align: center;
`;

const Line = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.color};

  margin-top: -15px;
`;

const Container = styled.div`
  position: sticky;
  top: 0px;
  z-index: 9;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)};
  padding-bottom: 150px;
  pointer-events: none;
`;

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 1, tension: 4000, friction: 500 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 40,
    scale: open ? 1 : 0.95,
    height: open ? 0 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <TrailsText>
          <a.div key={index} style={style}>
            <a.div style={{ height }}>{items[index]}</a.div>
          </a.div>
        </TrailsText>
      ))}
    </div>
  );
};

const SecondHeadline = ({ id, visible, textlines, marginTop, fontSize }) => {
  const { t } = useTranslation();

  return (
    <Container marginTop={marginTop}>
      <Trail open={visible}>
        {textlines.map(({ text, color }) => (
          <HeadlineText id={id} fontSize={fontSize}>
            {t(text)} <Line color={color} />
          </HeadlineText>
        ))}
      </Trail>
    </Container>
  );
};

export default SecondHeadline;
