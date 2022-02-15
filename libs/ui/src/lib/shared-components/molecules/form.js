import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
// add ResetPassword to the library
//import ResetPassword from "../../../../../../apps/senf-client/src/components/organisms/Auth/ResetPassword";
import { Input } from "../atoms/inputs/input";
import { Select } from "../atoms/selects/select";
import { Button } from "../atoms/buttons/button";

const StyledToggle = styled.div`
  width: 100%;
  font-size: 14pt;
  position: relative;
  top: 0;
  margin-bottom: 20px;
  z-index: 999;
  max-width: 600px;
  text-align: center;
  cursor: pointer;
`;
const StyledUnderline = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;
const StyledError = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 10px;
  text-align: center;
`;
const StyledTerms = styled.div`
  margin-top: 30px;
`;
const Wrapper = styled.div`
  width: 80%;
  margin-left: 10%;
`;
const SelectWrapper = styled.div`
  display: flex;
  width: 80%;
  margin-left: 10%;
  gap: 10px;
`;

/* const StyledDropdown = styled.div`
  position: relative;
  box-sizing: content-box;
  width: 210px;
  height: 1em;
  padding: $padding;
  background-color: #fff; // necessary for overlaying hover bg-color of selected option
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
`;

const StyledInputLabel = styled.label`
  position: absolute;
`;

const StyledSelect = styled.select`
  position: relative;
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;

  width: 20em;
  height: 3em;
  padding: 0 4em 0 1em;
  background: url("https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg")
    no-repeat right 0.8em center / 1.4em;

  color: white;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::-ms-expand {
    display: none;
  }
`; */

export function Form({
  loginForm,
  registerForm,
  inputItems = [],
  handleSubmit,
  handleToggle,
  formik,
  outsideClick,
  errorMessage,
  ResetPasswordComponent,
  genderField,
  ageField,
}) {
  const { t } = useTranslation();
  const ageOptions = [];
  for (let index = 2004; index > 1904; index--) {
    ageOptions.push({ value: index });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Wrapper>
        {loginForm && (
          <StyledToggle onClick={() => handleToggle()}>
            {t("notYetMember")}{" "}
            <StyledUnderline>{t("register")}</StyledUnderline>
          </StyledToggle>
        )}

        {registerForm && (
          <StyledToggle onClick={() => handleToggle()}>
            {t("alreadyMember")} <StyledUnderline>{t("login")}</StyledUnderline>
          </StyledToggle>
        )}

        {inputItems.map((item) => {
          return (
            <Input
              key={item.id}
              name={item.name}
              type={item.type}
              placeholder={item.placeholder}
              onChange={formik.handleChange}
              value={formik.values[item.name]}
              error={outsideClick && Boolean(formik.errors[item.name])}
              helperText={outsideClick && formik.errors[item.name]}
            />
          );
        })}

        {genderField && ageField && (
          <SelectWrapper>
            <Select
              placeholder="Gender"
              options={[
                { value: "Male" },
                { value: "Female" },
                { value: "Diverse" },
              ]}
              value={formik.values.sex}
              onChange={formik.handleChange}
            />
            <Select
              ageField={ageField}
              placeholder="Age"
              options={ageOptions}
            />
          </SelectWrapper>
        )}

        {loginForm && ResetPasswordComponent}
        {registerForm && (
          <StyledTerms>
            {t("terms_understood")} &nbsp;
            <a className="Terms" href="/agb" target="_blank">
              {t("termsAndConditions")}
            </a>
            &nbsp; {t("andThe")} &nbsp;
            <a className="Terms" href="/datenschutz" target="_blank">
              {t("dataPrivacy")}
            </a>
            &nbsp; {t("terms_agreed")}
            {/* Ich bestätige außerdem, dass ich mindestens 18 Jahre alt bin */}
          </StyledTerms>
        )}
        {errorMessage && <StyledError>{errorMessage}</StyledError>}
        <Button size="large" text="Submit" />
      </Wrapper>
    </form>
  );
}

Form.propTypes = {
  ResetPasswordComponent: PropTypes.node,
  errorMessage: PropTypes.string,
  formik: PropTypes.shape({
    errors: PropTypes.shape({
      email: PropTypes.string,
    }),
    handleChange: PropTypes.func,
    values: PropTypes.any,
  }),
  handleSubmit: PropTypes.func,
  handleToggle: PropTypes.func,
  inputItems: PropTypes.array,
  loginForm: PropTypes.bool,
  outsideClick: PropTypes.func,
  registerForm: PropTypes.bool,
  genderField: PropTypes.bool,
};
export default Form;
