import React from "react";
import styled from "styled-components";

import Ksta from "../../../../assets/infoPages/partnerLogos/ksta.png";
import Agora from "../../../../assets/infoPages/partnerLogos/agora.png";
import Klug from "../../../../assets/infoPages/partnerLogos/klug.png";
import Ww from "../../../../assets/infoPages/partnerLogos/ww.png";
import Gaffel from "../../../../assets/infoPages/partnerLogos/gaffel.png";
import GrnKln from "../../../../assets/infoPages/partnerLogos/grn_kln.png";
import Kfa from "../../../../assets/infoPages/partnerLogos/kfa.png";
import Av from "../../../../assets/infoPages/partnerLogos/av.png";
import Baudata from "../../../../assets/infoPages/partnerLogos/baudata.png";
import Sk from "../../../../assets/infoPages/partnerLogos/sk.png";
import MinhaGalera from "../../../../assets/infoPages/partnerLogos/minhaGalera.png";
import Jh_uh from "../../../../assets/infoPages/partnerLogos/jh_uh.png";
import Eps from "../../../../assets/infoPages/partnerLogos/eps.png";
import Np from "../../../../assets/infoPages/partnerLogos/np.png";
import { isMobileCustom } from "../../../../hooks/customDeviceDetect";

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
  top: ${(props) => (props.isMobileCustom ? "calc(100vh - 80px)" : "75vh")};
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
  const isMobile = isMobileCustom()
  return (
    <Wrapper isMobileCustom={isMobile}>
      {Logos.map(({ img, width }, index) => (
        <Logo img={img} width={width} key={img + index}></Logo>
      ))}
    </Wrapper>
  );
};

export default Partners;
