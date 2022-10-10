/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import { theme, Typography, Box } from "senf-atomic-design-system"
import { BaseLayerProps } from "senf-atomic-design-system/src/styles/layers";


const Layer = styled.button<BaseLayerProps>`
  ${({theme, ...props}) => theme.layers(props)}
  width: 64px;
  height: 64px;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.palette.text};
  &:after {
    content: "Text"
  }
`
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
const Color = styled.div`
  height: 48px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const C = ({backgroundColor}) => {
  return (
    <Box gap="20px" flexDirection="row" padding="30px" flexWrap="wrap" style={{backgroundColor, borderRadius: "10px"}}>
    <Layer type="primary" border="light" />
    <Layer type="primary" border="dark" />
    <Layer type="white" lightness="light" border="light" />
    <Layer type="white" lightness="medium" border="light" />
    <Layer type="white" lightness="dark" border="light" />
    <Layer type="white" lightness="light" border="dark" />
    <Layer type="white" lightness="medium" border="dark" />
    <Layer type="white" lightness="dark" border="dark" />
    <Layer type="transparent" color="grey" />
    <Layer type="transparent" color="shade" />
    <Layer type="transparent" color="white" />
    <Layer type="transparent" color="alert" />
    <Layer type="transparent" color="warning" />
    <Layer type="transparent" color="success" />
    <Layer type="transparent" color="info" />
    <Layer type="invisible" />
  </Box>
  );
}
const Palette: FC = () => {
  const colors = {} as {[key: string]: any};
  Object.entries(theme.colors.palette).forEach(([name, color]) => {
    const n = name.split(/-|\//)[0]
    if (!colors[n]) colors[n] = {}
    colors[n][name] = color
  })
  const copyToClipboard = (str: string) => {
    console.log(str)
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <>
    <Box gap="30px" flexDirection="column" padding="30px">
      <Typography variant="h1">Layer Styles</Typography>
      <C backgroundColor={theme.colors.palette.primary} />
      <C backgroundColor={theme.colors.palette["blend-primary-bg"]} />
      <C backgroundColor={theme.colors.palette["grey-300"]} />
      <C backgroundColor={theme.colors.palette.white} />
    </Box>
    <Box gap="30px" flexDirection="column" padding="30px">
      <Typography variant="h1">Color Palette</Typography>
      {/* <Box> */}
      {Object.entries(colors).map(([group, palette], i) => {
        return (
          <>
          <Typography variant="h2">{group.charAt(0).toUpperCase() + group.slice(1)}</Typography>
          
          <Grid>{(Object.entries(palette).map(([name, color], i) => <GridItem i={i} name={name} colorValue={color} key={i} onClick={() => copyToClipboard(name)}><Box flexDirection="column" gap="5px"><Color style={{backgroundColor: color}} key={i}/><Box flexDirection="column"><Typography variant="buttonSm">{name}</Typography><Typography variant="footnote">{color}</Typography></Box></Box></GridItem>))}</Grid>
          </>
        )
      })}
      {/* </Box> */}
    </Box>
    </>
  );
}
    
export default Palette;
