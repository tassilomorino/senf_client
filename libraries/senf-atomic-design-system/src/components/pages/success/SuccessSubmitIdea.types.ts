/** @format */

import { MouseEventHandler } from "react";
import { NavigateFunction } from "react-router-dom";

export interface SuccessSubmitIdeaProps {
  navigate: NavigateFunction;
  setPostIdeaSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPostIdeaOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newIdea: { screamId: string };
  closeModal: () => void;
}
