/** @format */

import React, { FC } from "react";

import styled from "styled-components";
import Bell from "../../../assets/icons/Bell";
import Info from "../../../assets/icons/Info";
import Insta from "../../../assets/icons/Insta";
import Mail from "../../../assets/icons/Mail";
import More from "../../../assets/icons/More";
import SenfLogoSmall from "../../../assets/icons/SenfLogoSmall";
import User from "../../../assets/icons/User";
import { openLink, openMail } from "../../../util/helpers";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import Divider from "../../atoms/divider/Divider";
import LanguageSelect from "../../molecules/languageSelect/LanguageSelect";
import ModalButton from "../../molecules/modalStack/ModalButton";
import { MenuSidebarProps } from "./MenuSidebar.types";
import InfoPageMainApp from "../../pages/infoPages/InfoPageMainApp";

const Wrapper = styled.div<MenuSidebarProps>`
  position: absolute;
  width: 68px;
  height: calc(100vh - 60px);
  padding: 20px 0px 20px 12px;
  left: 0;
  top: 0;
  z-index: 996;
  display: flex;
`;

// const ButtonPlacer = styled.div<OrganizationCardProps>`
//   box-sizing: border-box;
//   width: 50px;
//   height: 50px;
//   box-shadow: ${({ theme }) => theme.shadows[5]}
//       ${({ theme }) => theme.colors.brown.brown20tra},
//     ${({ theme }) => theme.shadows[3]}
//       ${({ theme }) => theme.colors.white.white20tra};
//   background-color: #faf8f3;
//   border-radius: 8px;
//   border: 2px solid rgba(255, 255, 255, 0.8);
//   position: absolute;
//   bottom: 0;
// `;

// const StyledDivider = styled.div<DividerProps>`
//   position: relative;
//   width: 2px;
//   height: 100%;
//   border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0")};

//   background-color: ${({ theme }) => theme.colors.brown.brown20tra};

//   margin: 0;
// `;

const MenuSidebar: FC<MenuSidebarProps> = ({
  handleOpenMyAccount,
  setShowUI,
  setOrder,
  setPostIdeaOpen,
}) => (
  <Wrapper>
    <Box
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      height="100%"
      width="44px"
    >
      <Box
        gap="14px"
        flexDirection="column"
        width="44px"
      >
        <Button
          variant="white"
          size="medium"
          text={<SenfLogoSmall />}
          onClick={() => {
            setOrder(1);
            setPostIdeaOpen(false);
          }}
        />

        {/* <Button variant="white" size="small" icon={<Bell />} /> */}

        <ModalButton
          variant="white"
          size="medium"
          icon={<Info />}
          options={{
            swipe: false,
            size: "xl",
            padding: 0,
            beforeOpen: () => {
              setShowUI(false);
              setPostIdeaOpen(false);
            },
            beforeClose: () => setShowUI(true),
          }}
        >
          <InfoPageMainApp />
        </ModalButton>

        <Button
          variant="white"
          size="medium"
          icon={<User />}
          onClick={() => {
            setPostIdeaOpen(false);
            handleOpenMyAccount(true);
          }}
        />
      </Box>

      <Box
        gap="14px"
        flexDirection="column"
        width="44px"
      >
        <LanguageSelect direction="downRight" />
        <Divider />

        <Button
          variant="white"
          size="medium"
          icon={<Mail />}
          onClick={() => openMail("dein@senf.koeln")}
        />
        <Button
          variant="white"
          size="medium"
          icon={<Insta />}
          onClick={() => openLink("https://www.instagram.com/senf.koeln/")}
        />
      </Box>
    </Box>

    <Divider
      height="100%"
      width="2px"
      margin="0px 0px 0px 10px"
    />
  </Wrapper>
);

export default MenuSidebar;
