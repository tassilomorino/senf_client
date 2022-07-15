import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button, Box } from "senf-atomic-design-system";

const NavigationContainer = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0;
  z-index: 9999;
  height: 70px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: rgb(249, 241, 215);
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2);
`;

const Navigation = ({
  nextLabel,
  prevLabel,
  handleNext,
  handlePrev,
  set,
  setClose,
  index,
  pagesData,
  disabled,
  loading,
  color,
  backgroundColor,
}) => {
  console.log(localStorage.getItem("createOrganizationPostEdit"));
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <Box maxWidth="500px" gap="8px" width="100%" margin="10px">
        {prevLabel && (
          <Button
            variant="white"
            fillWidth="max"
            text={
              (localStorage.getItem("createOrganizationPostEdit") === "true" ||
                localStorage.getItem("createProjectRoomPostEdit") === "true") &&
              pagesData.length - 1 === index
                ? t("close")
                : localStorage.getItem("createOrganizationPostEdit") ===
                    "true" ||
                  localStorage.getItem("createProjectRoomPostEdit") === "true"
                ? "Zurück zur Übersicht"
                : prevLabel
            }
            // loading={}
            onClick={
              (localStorage.getItem("createOrganizationPostEdit") === "true" ||
                localStorage.getItem("createProjectRoomPostEdit") === "true") &&
              pagesData.length - 1 === index
                ? setClose
                : localStorage.getItem("createOrganizationPostEdit") ===
                    "true" ||
                  localStorage.getItem("createProjectRoomPostEdit") === "true"
                ? () => set(pagesData.length - 1)
                : handlePrev
            }
            // disabled={}
          />
        )}
        {nextLabel && (
          <Button
            variant="primary"
            fillWidth="max"
            text={
              (localStorage.getItem("createOrganizationPostEdit") === "true" ||
                localStorage.getItem("createProjectRoomPostEdit") === "true") &&
              pagesData.length - 1 === index
                ? "Abspeichern"
                : localStorage.getItem("createOrganizationPostEdit") ===
                    "true" ||
                  localStorage.getItem("createProjectRoomPostEdit") === "true"
                ? "Speichern"
                : nextLabel
            }
            loading={loading}
            onClick={handleNext}
            disabled={disabled}
          />
        )}
      </Box>
    </NavigationContainer>
  );
};

export default Navigation;
