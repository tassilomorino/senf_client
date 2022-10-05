/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import Box from "../box/Box";
import ImagePlaceholder from "../imagePlaceholder/ImagePlaceholder";
import { LayerGreyButtonsDefault } from "../layerStyles/LayerStyles";
import Skeleton from "../skeleton/Skeleton";
import Typography from "../typography/Typography";
import { AvatarProps } from "./Avatar.types";

const Wrapper = styled.div<AvatarProps>``;

const Avatar: FC<AvatarProps> = ({
  layerStyle = LayerGreyButtonsDefault,
  borderRadius = "12",
  height = "40",
  width = "40",
  fontSize = "14px",
  img,
  placeholder,
  loading,
  onClick,
}) => {
  return (
    <ImagePlaceholder
      img={img || null}
      borderRadius={borderRadius}
      height={height}
      width={width}
      layerStyle={layerStyle}
      onClick={onClick}
    >
      {!loading && !img && (
        <Box position="absolute">
          <Typography
            variant="h6"
            color={theme.colors.black.black40tra}
            fontWeight={700}
            fontSize={fontSize}
            textAlign="center"
          >
            {placeholder}
          </Typography>
        </Box>
      )}
      {loading && !img && (
        <Skeleton
          height={height}
          width={width}
          borderRadius="18"
        />
      )}
    </ImagePlaceholder>
  );
};

export default Avatar;
