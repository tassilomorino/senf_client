import React from "react";
import { Box, Typography, Button, useModals } from "senf-atomic-design-system";
import CelebrateImg from "../assets/celebrateImage.png";

const ThanksNote = () => {
  const { closeModal } = useModals();

  const handleRestart = () => {
    localStorage.setItem("drawnData", null);
    localStorage.setItem("modelsData", null);
    window.location.reload(false);
  };
  return (
    <Box
      margin="20px"
      flexDirection="column"
      justifyContent="center"
    >
      <Box
        justifyContent="center"
        margin="40px 40px 20px 40px"
        width="calc(100%  - 80px)"
        height="calc(100% - 80px)"
      >
        <Typography
          variant="h2"
          style={{ textAlign: "center" }}
        >
          Danke für deinen Entwurf!
        </Typography>
      </Box>
      <Box
        justifyContent="center"
        margin="40px 40px 0px 40px"
        width="calc(100%  - 80px)"
        height="calc(100% - 80px)"
      >
        <img
          src={CelebrateImg}
          width="250px"
        />
      </Box>
      <Box
        flexDirection="column"
        gap="8px"
        marginBottom="20px"
      >
        <Button
          variant="primary"
          text="Zurück zum Entwurf"
          onClick={() => closeModal(false)}
          loading={false}
        />

        <Button
          text="Neustarten"
          variant="tertiary"
          onClick={handleRestart}
          loading={false}
        />
      </Box>
    </Box>
  );
};

export default ThanksNote;
