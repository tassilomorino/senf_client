/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import {
  BackgroundDesktop,
  BackgroundMobile,
} from "../../atoms/Backgrounds/GradientBackgrounds";

import List from "../../molecules/List/List";

const Wrapper = styled.div`
  z-index: 999;
  width: 600px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  left: 0;
`;
const SearchComponent = ({
  loading,
  dropdown,
  dataFinal,
  dataFinalLength,
  projectsData,
}) => {
  const [serachTerm, setSerachTerm] = useState("");

  const dataFinalSearched = dataFinal.filter((val) => {
    if (serachTerm === "") {
      return val;
    } else if (val.title.toLowerCase().includes(serachTerm.toLowerCase())) {
      return val;
    }
  });
  return (
    <Wrapper>
      <BackgroundMobile />

      <input
        type="text"
        placeholder="search..."
        onChange={(event) => setSerachTerm(event.target.value)}
        style={{ zIndex: 9999 }}
      />
      <List
        type="allIdeas"
        loading={loading}
        dropdown={dropdown}
        dataFinal={dataFinalSearched}
        dataFinalLength={dataFinalLength}
        projectsData={projectsData}
      />
    </Wrapper>
  );
};

export default SearchComponent;
