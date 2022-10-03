/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Input from "../../atoms/inputs/Input";
import { FormProps } from "./Form.types";

const Wrapper = styled.div<FormProps>`
  margin: ${(props) => (props.margin ? props.margin : 0)};
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "100%")};
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Form: FC<FormProps> = ({
  formik,
  inputItems,
  margin,
  maxWidth,
  ...props
}) => (
  <form>
    <Wrapper
      margin={margin}
      maxWidth={maxWidth}
      {...props}
    >
      {inputItems?.map((itemProps) => (
        <Input
          key={itemProps.name}
          id={itemProps.name}
          name={itemProps.name}
          {...itemProps}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values[itemProps.name]}
          error={
            formik?.touched[itemProps.name] &&
            Boolean(formik?.errors[itemProps.name])
          }
          note={
            formik?.touched[itemProps.name] && formik?.errors[itemProps.name]
          }
        />
      ))}
    </Wrapper>
  </form>
);

export default Form;
