/** @format */

import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.h2`
  font-family: Futura PT W01 Book;
  font-size: 18px;
  font-weight: 100;
  color: #353535;
  align-self: center;
  margin-bottom: 0px;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const CreateProjectTitle = () => {
  const createProjectFormData = useSelector(
    (state) => state.formData.createProjectFormData
  );
  return (
    <Wrapper>
      {createProjectFormData &&
        createProjectFormData.projectRoom_name &&
        createProjectFormData.projectRoom_name}
    </Wrapper>
  );
};

export default CreateProjectTitle;
