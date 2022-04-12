import React from "react";
import styled from "styled-components";
import { isMobileCustom } from "../../../../util/customDeviceDetect";

import Ksta from "../../../../images/infoPage/partnerLogos/ksta.png";
import Agora from "../../../../images/infoPage/partnerLogos/agora.png";
import Klug from "../../../../images/infoPage/partnerLogos/klug.png";
import Ww from "../../../../images/infoPage/partnerLogos/ww.png";
import Gaffel from "../../../../images/infoPage/partnerLogos/gaffel.png";
import GrnKln from "../../../../images/infoPage/partnerLogos/grn_kln.png";
import Kfa from "../../../../images/infoPage/partnerLogos/kfa.png";
import Av from "../../../../images/infoPage/partnerLogos/av.png";
import Baudata from "../../../../images/infoPage/partnerLogos/baudata.png";
import Sk from "../../../../images/infoPage/partnerLogos/sk.png";
import MinhaGalera from "../../../../images/infoPage/partnerLogos/minhaGalera.png";
import Jh_uh from "../../../../images/infoPage/partnerLogos/jh_uh.png";
import Eps from "../../../../images/infoPage/partnerLogos/eps.png";
import Np from "../../../../images/infoPage/partnerLogos/np.png";

const Logos = [
  { img: Ksta, width: "250px" },
  { img: Agora, width: "160px" },
  { img: Klug, width: "80px" },
  { img: Ww, width: "180px" },
  { img: Gaffel, width: "80px" },
  { img: GrnKln, width: "80px" },
  { img: MinhaGalera, width: "170px" },
  { img: Kfa, width: "130px" },
  { img: Av, width: "120px" },

  { img: Baudata, width: "120px" },
  { img: Sk, width: "180px" },
  { img: Jh_uh, width: "130px" },
  { img: Eps, width: "80px" },
  { img: Np, width: "150px" },

  { img: Ksta, width: "250px" },
  { img: Agora, width: "160px" },
  { img: Klug, width: "80px" },
  { img: Ww, width: "180px" },
  { img: Gaffel, width: "80px" },
  { img: GrnKln, width: "80px" },
  { img: MinhaGalera, width: "170px" },
  { img: Kfa, width: "130px" },
];
const Wrapper = styled.div`
  margin: 30px;
  height: 100px;
  width: 3420px;
  top: ${(props) => (props.isMobileCustom ? "calc(100vh - 30px)" : "75vh")};
  left: 0;
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 9999999;
  animation: scroll 50s linear 1s infinite;

  @keyframes scroll {
    100% {
      left: -2160px;
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
      {Logos.map(({ img, width }, index) => (
        <Logo img={img} width={width} key={img + index}></Logo>
      ))}
    </Wrapper>
  );
};

export default Partners;
