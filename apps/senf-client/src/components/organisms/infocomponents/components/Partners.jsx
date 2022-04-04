import React from "react";
import styled from "styled-components";
import MinhaGalera from "../../../../images/infoPage/partnerLogos/minhaGalera.png";
import Klug from "../../../../images/infoPage/partnerLogos/klug.png";
import Ksta from "../../../../images/infoPage/partnerLogos/ksta.png";
import Gaffel from "../../../../images/infoPage/partnerLogos/gaffel.png";
import { isMobileCustom } from "../../../../util/customDeviceDetect";

const Logos = [
  { img: Ksta, width: "250px" },
  { img: Klug, width: "80px" },

  { img: Gaffel, width: "80px" },
  { img: MinhaGalera, width: "250px" },
  { img: Ksta, width: "250px" },
  { img: Klug, width: "80px" },

  { img: Gaffel, width: "80px" },
  { img: MinhaGalera, width: "250px" },
];
const Wrapper = styled.div`
  margin: 30px;
  height: 100px;
  width: 1600px;
  top: ${(props) => (props.isMobileCustom ? "calc(100vh - 30px)" : "75vh")};
  left: 0;
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 9999999;
  animation: scroll 20s linear 1s infinite;

  @keyframes scroll {
    100% {
      left: -820px;
    } /* top is the number of spans (in this case 8) multiplied by span height (45px as described above)*/
  }
`;

const Logo = styled.div`
  width: ${(props) => props.width};

  height: 50px;
  overflow: visible;
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
const Partners = () => {
  return (
    <Wrapper isMobileCustom={isMobileCustom}>
      {Logos.map(({ img, width }) => (
        <Logo img={img} width={width}></Logo>
      ))}
    </Wrapper>
  );
};

export default Partners;
