/** @format */

import React, { useState, useEffect } from "react";
import { Box, List, ObjectCard, Tag } from "senf-atomic-design-system";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { ModelsData } from "../../data/Models";
import { createModel } from "../../util/createModal";

const tags = [
  { objectType: "Alle" },
  { objectType: "Infrastruktur" },
  { objectType: "Mobiliar" },
  { objectType: "Natur" },
  { objectType: "Gebäude" },
  { objectType: "Spielen" },
  { objectType: "Sport" },
];

const ModelsList = () => {
  // useEffect(() => {
  //   // Create a reference to the file we want to download
  //   const storage = getStorage();
  //   const starsRef = ref(storage, "16660_0_Senf_Logo.jpg");

  //   // Get the download URL
  //   getDownloadURL(starsRef)
  //     .then((url) => {
  //       // Insert url into an <img> tag to "download"

  //       console.log(url);
  //     })
  //     .catch((error) => {
  //       // A full list of error codes is available at
  //       // https://firebase.google.com/docs/storage/web/handle-errors
  //       switch (error.code) {
  //         case "storage/object-not-found":
  //           // File doesn't exist
  //           break;
  //         case "storage/unauthorized":
  //           // User doesn't have permission to access the object
  //           break;
  //         case "storage/canceled":
  //           // User canceled the upload
  //           break;

  //         case "storage/unknown":
  //           // Unknown error occurred, inspect the server response
  //           break;
  //       }
  //     });
  // }, []);
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
      const NewModels = ModelsData.filter(({ objectType }) =>
        objectTypeSelected.includes(objectType)
      );

      NewModels.sort((a, b) => parseFloat(a.index) - parseFloat(b.index));

      if (NewModels) {
        setModels(NewModels);
      }

      // setModels(
      //   ModelsData.filter(({ objectType }) =>
      //     objectTypeSelected.includes(objectType)
      //   )
      // );
    }
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

      {models.length > 0 && (
        <List
          listType="grid"
          CardType={ObjectCard}
          data={models}
          handleButtonOpenCard={(event, cardType, modelData) => {
            createModel(
              `${Math.floor(Math.random() * 1000)}`,
              modelData.modelPath,
              modelData.format,
              1
            );
          }}
          loading={false}
        />
      )}
    </React.Fragment>
  );
};
export default ModelsList;
