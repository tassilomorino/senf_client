/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import theme from "./theme";
import { Wrapper } from "../components/atoms/inputs/input.styles";

export default {
  title: "Theme/Theme",
  component: theme,
  argTypes: {},
} as Meta<typeof theme>;

const ColorBox = (color) => {
  const newColor = color.color;
  return (
    <div
      style={{
        width: 50,
        height: 50,
        backgroundColor: newColor,
        marginBottom: "25px",
      }}
    ></div>
  );
};

const Template: Story = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Colors</h1>
      {Object.keys(theme.colors).map((color) => (
        <div
          key={color}
          style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
        >
          {typeof theme.colors[color] === "string" ? (
            <>
              {color}
              <br />
              {theme.colors[color]}
              <ColorBox color={theme.colors[color].toString()} />
            </>
          ) : (
            <>
              <h2>{color}</h2>
              <br />
            </>
          )}
          {typeof theme.colors[color] !== "string" &&
            Object.keys(theme.colors[color]).map((key) => (
              <div
                key={theme.colors[color][key]}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {key}
                <br />
                {theme.colors[color][key]}
                <br />
                <ColorBox color={theme.colors[color][key]} />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  text: "x",
};
