/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import styled from "styled-components";
import Typography from "../components/atoms/typography/Typography";
import Box from "../components/atoms/box/Box";
import theme from "./theme";
import { ThemeColors } from "./helpers"


export default {
  title: "Theme/Theme",
  component: theme,
  argTypes: {},
} as Meta<typeof theme>;



const Grid = styled.div`
  display: grid;
  grid-auto-columns: minmax(10px, 100px);
  grid-template-columns: repeat(auto-fit, minmax(100px, 150px));
  gap: 20px;
`
const GridItem = styled.div`
  position: relative;
  cursor: pointer;
  &:hover div:first-child div:first-child:after {
    content: "copy name";
    border-radius: 100px;
    padding: 5px 10px;
    background-color: hsla(0, 0%, 100%, 0.5);
    color: hsla(0, 0%, 0%, 0.5);
  }
  &:active div:first-child div:first-child:after {
    background-color: hsla(0, 0%, 100%, 1);
  }
  grid-column: ${({i, name}) => !(/\d/.test(name)) ? "span 2" : "span 1"};
`
const Color = styled.div<{value: string}>`
  height: 48px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${() => `inset 0 0 0 1px ${theme.colors.palette["grey/400"]}`};
  background-color: ${({value}) => value};
`
const ColorBox = styled.div<{value: string}>`
  width: 50px;
  height: 50px;
  background-color: color;
  margin-bottom: 25px;
`

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
              <Color value={theme.colors[color].toString()} />
            </>
          ) : (
            <>
              <h2>{color}</h2>
              <br />
            </>
          )}
          {typeof theme.colors[color] !== "string" &&
            Object.keys(theme.colors[color]).map((key, index) => (
              <div
                key={theme.colors[color][key] + index}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {key}
                <br />
                {theme.colors[color][key]}
                <br />
                <Color value={theme.colors[color][key]} />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

const TemplateNew: Story = () => {
  const colors = {} as {[key: string]: ThemeColors};
  Object.entries(theme.colors.palette).forEach(([name, color]) => {
    const n = name.split(/-|\//)[0]
    if (!colors[n]) colors[n] = {}
    colors[n][name] = color
  })
  return (
    <Box gap="30px" flexDirection="column" padding="30px">
      <Typography variant="h1">Color Palette</Typography>
      {Object.entries(colors).map(([group, palette]) => {
        return (
          <>
            <Typography variant="h2">{group.charAt(0).toUpperCase() + group.slice(1)}</Typography>
            
            <Grid>{
              (Object.entries(palette).map(([name, color], i) => (
                <GridItem i={i} name={name} colorValue={color} key={i} onClick={() => navigator.clipboard?.writeText(name)}>
                  <Box flexDirection="column" gap="5px">
                    <Color value={color} key={i}/>
                    <Box flexDirection="column">
                      <Typography variant="buttonSm">{name}</Typography>
                      <Typography variant="footnote">{color}</Typography>
                    </Box>
                  </Box>
                </GridItem>
              )))
            }</Grid>
          </>
        )
      })}
    </Box>
  );
};
export const Colors = TemplateNew.bind({});
export const Deprecated = Template.bind({});