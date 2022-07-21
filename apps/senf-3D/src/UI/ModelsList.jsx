/** @format */

import React, { useState, useEffect } from "react";
import { Box, List, ObjectCard, Tag } from "senf-atomic-design-system";
import { ModelsData } from "../data/Models";
import { createModel } from "./UI";

const tags = [
  { objectType: "Alle" },
  { objectType: "Infrastruktur" },
  { objectType: "Mobiliar" },
  { objectType: "Natur" },
  { objectType: "Gebäude" },
  { objectType: "Spielen" },
  { objectType: "Sport" },
];

const ModelsList = ({ spawnObject }) => {
  const [models, setModels] = useState([]);
  const [objectTypeSelected, setObjectTypeSelected] = useState([
    "Infrastruktur",
    "Mobiliar",
    "Natur",
    "Gebäude",
    "Spielen",
    "Sport",
  ]);

  useEffect(() => {
    if (ModelsData) {
      // console.log(objectTypeSelected);
      const NewModels = ModelsData.filter(({ objectType }) =>
        objectTypeSelected.includes(objectType)
      );

      NewModels.sort((a, b) => parseFloat(a.index) - parseFloat(b.index));

      // console.log(NewModels);

      if (NewModels) {
        setModels(NewModels);
      }

      // setModels(
      //   ModelsData.filter(({ objectType }) =>
      //     objectTypeSelected.includes(objectType)
      //   )
      // );
    }

    // console.log(models);
  }, [objectTypeSelected]);

  const handleobjectTypeelector = (objectType) => {
    const index = objectTypeSelected.indexOf(objectType);
    if (objectType === "Alle") {
      setObjectTypeSelected([
        "Infrastruktur",
        "Mobiliar",
        "Natur",
        "Gebäude",
        "Spielen",
        "Sport",
      ]);
    } else if (objectTypeSelected.length === 6) {
      setObjectTypeSelected([objectType]);
    } else if (index === -1) {
      setObjectTypeSelected(objectTypeSelected.concat(objectType));
    } else {
      const newobjectType = objectTypeSelected.filter(
        (item) => item !== objectType
      );

      if (newobjectType.length === 0) {
        setObjectTypeSelected([
          "Infrastruktur",
          "Mobiliar",
          "Natur",
          "Gebäude",
          "Spielen",
          "Sport",
        ]);
      } else {
        setObjectTypeSelected(...[newobjectType]);
      }
    }
  };

  return (
    <React.Fragment>
      <Box
        gap="10px"
        width="calc(100% - 20px)"
        margin="10px"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        {tags.map(({ objectType }, i) => (
          <Tag
            key={i}
            text={objectType}
            onClick={() => handleobjectTypeelector(objectType)}
            active={
              (objectTypeSelected.includes(objectType) &&
                objectTypeSelected.length !== 6) ||
              (objectTypeSelected.length === 6 && objectType === "Alle")
            }
          />
        ))}
      </Box>
      {models && (
        <List
          listType="grid"
          CardType={() => (
            <>
              {models.map((data, i) => (
                <ObjectCard
                  key={i}
                  data={data}
                  handleButtonOpenCard={() =>
                    createModel(
                      `model ${Math.random() * 1000}`,
                      data.modelPath,
                      data.format,
                      0.5
                    )
                  }
                />
              ))}
            </>
          )}
          loading={false}
          handleButtonClick={spawnObject}
          data={models}
        />
      )}
    </React.Fragment>
  );
};
export default ModelsList;
