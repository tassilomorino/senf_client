import React, { useState } from "react";
import { useTrail, a } from "@react-spring/web";
import styled from "styled-components";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const TrailsText = styled.div`
  position: relative;
  width: auto;
  height: 50px;
  will-change: transform, opacity;
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeadlineText = styled.h1`
  line-height: 50px;
  color: black;
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.05em;
  height: 20px;
  display: inline-block;
  text-align: center;
  float: left;
  padding-right: 10px;
`;

const Line = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.color};

  margin-top: -15px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  justify-content: center;
`;

const Break = styled.div`
  flex-basis: 100%;
  height: 0;
  width: 100%;
`;

const Trail = ({ open, children, textlines }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 1, tension: 4000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 40,
    scale: open ? 1 : 0.95,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        marginLeft: "20px",
      }}
    >
      {trail.map(({ height, ...style }, index) => (
        <TrailsText
          style={
            textlines[index].breakBoolean ? { width: "100%", height: 0 } : {}
          }
        >
          <a.div key={index} style={style}>
            <a.div style={{ height }}>{items[index]}</a.div>
          </a.div>
        </TrailsText>
      ))}
    </div>
  );
};

const UnderlinedText = ({ visibleHeadline, textlines }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Trail open={visibleHeadline} textlines={textlines}>
        {textlines.map(({ text, color }) => (
          <HeadlineText>
            {t(text)} <Line color={color} />
          </HeadlineText>
        ))}
      </Trail>
    </Container>
  );
};

export default UnderlinedText;
