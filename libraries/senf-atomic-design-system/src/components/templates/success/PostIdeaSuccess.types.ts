/** @format */

import React from "react";
import { NavigateFunction } from "react-router-dom";

export interface SuccessProps {
  navigate: NavigateFunction;
  setPostIdeaSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPostIdeaOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newIdea: { screamId: string };
}
