/** @format */

import { MouseEventHandler } from "react";

export interface SuccessSubmitIdeaProps {
  navigate: NavigateFunction;
  setPostIdeaSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPostIdeaOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newIdea: { screamId: string };
}
