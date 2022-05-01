import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  z-index: 999999999;
  margin: 10px;
`;

const StyledButton = styled.button`
  transition: background-color 0.3s ease 0s, box-shadow 0.3s ease 0s;
  padding: 12px 16px 12px 42px;
  border: medium none;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px -1px 0px, rgba(0, 0, 0, 0.25) 0px 1px 1px;
  color: rgb(117, 117, 117);
  font-size: 14px;
  font-weight: 500;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=");
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;
  cursor: pointer;
`;

export function GoogleSignInButton({ handleClick }) {
  return (
    <Wrapper>
      <StyledButton type="button" onClick={() => handleClick()}>
        Sign in with Google
      </StyledButton>
    </Wrapper>
  );
}
export default GoogleSignInButton;
