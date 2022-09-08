/** @format */

import React, { FC, useState } from "react";
import styled from "styled-components";
import Hyperlink from "../../../assets/icons/Hyperlink";
import Loader from "../animations/Loader";
import Icon from "../icons/Icon";
import ImagePlaceholder from "../imagePlaceholder/ImagePlaceholder";
import { LayerWhiteFirstDefault } from "../layerStyles/LayerStyles";
import { ImageUploadTileProps } from "./ImageUploadTile.types";

const Wrapper = styled.div<ImageUploadTileProps>``;


const ImageWrapper = styled.label`
  ${(props) => LayerWhiteFirstDefault}
  width:158px;
  height: 158px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledIconWrapper = styled.div`
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255, 0.8);
  border-radius: 20px;
  z-index: 1;
`;


const ImageUploadTile: FC<ImageUploadTileProps> = ({ id, photoURL, uploadingImage, handleImageUpload }) => {
  console.log(photoURL)
  const [hover, onHover] = useState(false);

  return <React.Fragment>
    <ImageWrapper
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      htmlFor={id || "imageUploader"}
    >

      {uploadingImage && (
        <StyledIconWrapper>
          <div style={{ width: "50px" }}>
            <Loader />
          </div>
        </StyledIconWrapper>
      )}
      {hover && (
        <StyledIconWrapper>
          <Icon icon={<Hyperlink transform="scale(1.5)" />} />
        </StyledIconWrapper>

      )}

      {photoURL && <ImagePlaceholder
        img={photoURL}
        borderRadius="18px"
        height="calc(100% - 40px)"
        width="calc(100% - 40px)"
      />}

    </ImageWrapper>
    <input
      type="file"
      onChange={(event) => handleImageUpload(event)}
      style={{ display: "none" }}
      id={id || "imageUploader"}
    />
  </React.Fragment>;
};

export default ImageUploadTile;
