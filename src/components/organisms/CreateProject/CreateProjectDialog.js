/** @format */

import React from "react";
import MainDialog from "../../atoms/Layout/MainDialog";

const CreateProjectDialog = ({ setIsOpen, isOpen }) => {
  return (
    <MainDialog setIsOpen={setIsOpen} isOpen={isOpen}>
      Whats Your project about
    </MainDialog>
  );
};

export default CreateProjectDialog;
