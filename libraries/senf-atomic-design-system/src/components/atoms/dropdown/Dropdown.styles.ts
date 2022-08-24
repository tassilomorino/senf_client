/** @format */

import styled from "styled-components";
import arrow from "../../../assets/rawSvgs/arrow.svg";

export const Selector = styled.select`
  display: flex;
  align-items: center;
  flex: 1;
  border: 0;
  appearance: none;
  background-image: url("${arrow}");
  background-repeat: no-repeat;
  background-position: calc(100% - 1rem);
  background-size: 0.9rem;
  cursor: pointer !important;

  &:focus {
    outline: 0;
  }
  &:focus-visible {
    outline: 0;
  }
`;
