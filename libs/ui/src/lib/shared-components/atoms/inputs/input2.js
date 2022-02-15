import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledTextfield = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;
const StyledInput = styled.input`
  font-size: 1rem;
  outline: none;
  border-color: rgba(255, 255, 255, 0);
  border-radius: 10px;
  border-width: 1px;
  padding: 1rem 0.9rem;
  color: rgba(0, 0, 0, 0.87);
  transition: 0.1s ease-out;
  &:focus {
    border: 1px solid rgb(254, 217, 87);
  }
`;
const StyledLabel = styled.label`
  position: absolute;
  font-size: 1rem;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  color: gray;
  padding: 0 0.3rem;
  margin: 0 0.5rem;
  transition: 0.2s ease all;
  transform-origin: left top;
  pointer-events: none;
  ${StyledInput}:focus ~ & {
    color: black;
    top: 3px;
    left: 5px;
    transform: translateY(-5%) scale(0.7);
  }
  ${StyledInput}:not(:placeholder-shown) ~ & {
    top: 3px;
    left: 5px;
    transform: translateY(-5%) scale(0.7);
  }
`;

const StyledHelperText = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  color: #f44336;
  border-radius: 0 0 10px 10px;
  height: 25px;
  margin-top: -6px;
  padding-top: 5px;
  padding-left: 16px;
  margin-bottom: 10px;
`;

export function Input2({
  name,
  type,
  label,
  onChange,
  value,
  error,
  helperText,
}) {
  return (
    <StyledTextfield>
      <StyledInput
        name={name}
        type={type}
        placeholder={""}
        onChange={onChange}
        value={value}
        error={error}
      />
      <StyledLabel>{label}</StyledLabel>
      {error && <StyledHelperText>{helperText}</StyledHelperText>}
    </StyledTextfield>
  );
}

Input2.propTypes = {
  name: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "email"]),
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};
export default Input2;
