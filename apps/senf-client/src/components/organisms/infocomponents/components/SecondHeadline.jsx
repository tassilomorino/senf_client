import React, { useState } from "react";
import { useTrail, a } from "@react-spring/web";
import styled from "styled-components";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const TrailsText = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  will-change: transform, opacity;
  overflow: visible;
`;

const HeadlineText = styled.h1`
  line-height: 50px;
  color: black;
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.05em;
  height: 20px;
  display: inline-block;
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

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 1, tension: 4000, friction: 500 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 40,
    scale: open ? 1 : 0.95,
    height: open ? 110 : 0,
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

const SecondHeadline = ({ visibleSecondHeadline }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Trail open={visibleSecondHeadline}>
        <HeadlineText>
          {t("infopage_secondHeadline_1")} <Line color="#939FF3" />
        </HeadlineText>
        <HeadlineText>
          {t("infopage_secondHeadline_2")} <Line color="#90D8B9" />
        </HeadlineText>
      </Trail>
    </Container>
  );
};

export default SecondHeadline;
