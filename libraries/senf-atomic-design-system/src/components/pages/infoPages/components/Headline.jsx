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
  align-items: flex-start;
`;

const HeadlineText = styled.h1`
  line-height: 50px;
  color: black;
  font-size: 40px;
  font-weight: 800;
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
  margin-top: 100px;
  margin-left: 24px;

  @media (min-width: 768px) {
    margin-left: 100px;
  }
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
        <TrailsText key={index}>
          <a.div key={index} style={style}>
            <a.div style={{ height }}>{items[index]}</a.div>
          </a.div>
        </TrailsText>
      ))}
    </div>
  );
};

const Headline = ({ visible, textlines }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Trail open={visible}>
        {textlines.map(({ text, color }) => (
          <HeadlineText key={text}>
            {t(text)} <Line color={color} />
          </HeadlineText>
        ))}
      </Trail>
    </Container>
  );
};

export default Headline;
