/** @format */

import { MouseEventHandler } from "react";

export interface MainSwipeListProps {
  example?: string;
  setCheckedSortOption: () => void;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
