/** @format */

import React from "react";
import {
  ObjectCard,
} from "senf-atomic-design-system";

import Weg from "../assets/surfaces/weg.png";
import Img57 from "../assets/surfaces/57.png";

const MarkersList = ({
  setComponentsSidebarOpen,
  unityContext,
  spawnObject,
  startDrawingStreet,
}) => {
  return (
    <React.Fragment>
      <ObjectCard
        loading={false}
        handleButtonClick={() => spawnObject(57)}
        data={{
          objectId: 57,
          title: "Gras",
          objectType: "surface",
          imgUrl: Img57,
        }}
      />
      <ObjectCard
        loading={false}
        handleButtonClick={startDrawingStreet}
        data={{
          objectId: 1000,
          title: "Weg",
          objectType: "surface",
          imgUrl: Weg,
        }}
      />

      {/* <List
        CardType={ObjectCard}
        loading={false}
        data={[
          {
            objectId: "sadasd",
            title: "Blumenkübel",
            subTitle: "Kleingarten Sacshen",
            objectType: "Vereine",
            imgUrl:
              "https://firebasestorage.googleapis.com/v0/b/senf-dev.appspot.com/o/organizationsData%2FQO0SOuQBIc9wEjpayU9e%2Flogo%2Flogo?alt=media&token=131ee6fa-19a0-4ee9-b8c0-43909e2373d6",
          },
          {
            objectId: "xyz",
            title: "Blumenkübel 1",
            subTitle: "Kleingarten Sacshen",
            objectType: "Vereine",
            imgUrl:
              "https://firebasestorage.googleapis.com/v0/b/senf-dev.appspot.com/o/organizationsData%2FQO0SOuQBIc9wEjpayU9e%2Flogo%2Flogo?alt=media&token=131ee6fa-19a0-4ee9-b8c0-43909e2373d6",
          },
        ]}
      /> */}
    </React.Fragment>
  );
};

export default MarkersList;
