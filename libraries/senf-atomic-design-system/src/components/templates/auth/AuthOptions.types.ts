/** @format */

import { MouseEventHandler } from "react";

export interface AuthOptionsProps {
  text?: string;
  variant?: "register" | "login";
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  formikStore?: any;
  authHandler;
  setPage;
  errorMessage;
}
