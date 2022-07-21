/** @format */

import React from "react";
import { List, ObjectCard } from "senf-atomic-design-system";
import { FormsData } from "../data/Models";

const FormsList = ({ spawnObject }) => {
  return (
    <List
      listType="grid"
      CardType={ObjectCard}
      loading={false}
      handleButtonClick={spawnObject}
      data={FormsData}
    />
  );
};

export default FormsList;
