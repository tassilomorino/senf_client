import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import TertiaryButton from "../../../atoms/buttons/TertiaryButton";

const Wrapper = styled.div`
  position: ${(props) => (props.position ? props.position : "fixed")};
  bottom: ${(props) => (props.bottom ? props.bottom : "none")};
  top: ${(props) => (props.top ? props.top : "none")};
  width: 100%;
  z-index: 99999;
  height: 2em;
  padding-top: 0.5em;
  text-align: center;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 999;
`;
const FooterLinks = ({ color, position, top, bottom }) => {
  const { t } = useTranslation();
  return (
    <Wrapper
      position={position}
      top={top}
      bottom={bottom}
    >
      <TertiaryButton
        href="/impressum"
        color={color}
      >
        {t("imprint")}
      </TertiaryButton>

      <TertiaryButton
        href="/datenschutz"
        color={color}
        style={{ paddingLeft: "5px", paddingRight: "5px" }}
      >
        | {t("dataPrivacy")} |
      </TertiaryButton>

      <TertiaryButton
        href="/agb"
        color={color}
      >
        {t("termsAndConditions")}
      </TertiaryButton>
    </Wrapper>
  );
};

export default FooterLinks;
