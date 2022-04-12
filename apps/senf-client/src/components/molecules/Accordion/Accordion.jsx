import React, { memo, useState } from "react";
import { useSpring, a, animated } from "@react-spring/web";
// import { useMeasure, usePrevious } from "./helpers";
import { usePrevious } from "../../../hooks/usePrevious";
import { useMeasure } from "../../../util/helpers";
import styled from "styled-components";
import "./styles/styles.css";
import { StyledH3, StyledText } from "../../../styles/GlobalStyle";
import Linkify from "linkify-react";

const AccordionWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #fff;
  max-width: 30rem;
  border-radius: 0.4rem;
  overflow: hidden;

  .accordion-item + .accordion-item {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .accordion-item-line {
    display: block;
    padding: 0.8rem 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    z-index: 2;
    position: relative;
  }

  .accordion-item-icon {
    width: 1.2rem;
    height: 1.2rem;
    transition: transform 0.3s ease-in-out;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABGklEQVR4Ae3RAcZCQRiF4buDfwshBGi+2UQgcIGAVtpSIuS/KyilG+UTcbk6zIH3GQBm3mM6AAAAAAAAAACA+eqf/yZBXcV/2XeCVPYx1FXj/FjGUMd45AQp/1HHGGLZNL+e61jHnKDmv8652YT1IvPfE2LX/Sh27/ycsF60yT/lk58JYn6eU4MJccjnlAmZ/33i0OAH4jg9Qcw/5g9YJpS+m6n0xvzpCfVe+nn59S7kGyYo+YYJWz3fO+E2PaFs9XzPhMy/6fmWCXq+YUJs9HzrhLh+JsQmrnq+bYKeb52g53snXPR88wQ93z9Bz/dP0PP9E/R89wQ93zpBz7dO0POtE/R86wQ93zpBzzdP+MoHAAAAAAAAAADAExTnTW20AtjhAAAAAElFTkSuQmCC);
    opacity: 0.6;
    will-change: transform;
    flex-shrink: 0;
  }
  .accordion-item-inner {
    max-height: 0;
    overflow: hidden;
    z-index: 1;
    position: relative;
  }
  .accordion-item-content {
    padding-bottom: 20px;
  }
`;

export const Accordion = (data) => {
  data = data.data;
  console.log(data);
  return (
    <AccordionWrapper>
      {data.map(({ question, answer }) => {
        console.log(data);
        return (
          <AccordionItem key={question} question={question} answer={answer} />
        );
      })}
    </AccordionWrapper>
  );
};

export const AccordionItem = memo(
  ({ question, answer, defaultOpen = false }) => {
    console.log(question);
    const [isOpen, setOpen] = useState(defaultOpen);
    const previous = usePrevious(isOpen);
    const [bind, { height: viewHeight }] = useMeasure();
    const { height, opacity } = useSpring({
      from: { height: 0, opacity: 0 /*transform: 'rotate(180deg)'*/ },
      to: {
        height: isOpen ? viewHeight : 0,
        opacity: isOpen ? 1 : 0,
        // transform: `rotate(${isOpen ? 0 : 180}deg)`
      },
    });

    return (
      <li
        className="accordion-item"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        <div className="accordion-item-line">
          <StyledH3 style={{ maxWidth: "90%" }}>{question}</StyledH3>
          <a.span
            className="accordion-item-icon"
            style={{
              ...(isOpen && {
                transform: "rotate(180deg)",
              }),
            }}
          />
        </div>
        <a.div
          style={{
            willChange: "transform, opacity, height",
            opacity,
            height: isOpen && previous === isOpen ? "auto" : height,
          }}
        >
          <div {...bind} className="accordion-item-content">
            <StyledText margin="0px 20px 20px 20px" marginLeft="20px">
              <Linkify
                options={{
                  target: "_blank",
                  //tagName: props => <a {...props} />,
                  tagName: (...args) =>
                    console.log(args) || ((props) => <a {...props} />),
                }}
              >
                {answer}
              </Linkify>
            </StyledText>
          </div>
        </a.div>
      </li>
    );
  }
);
