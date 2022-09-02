/** @format */

import React, { useState, useEffect } from "react";
import { ThreeDToolSwipeList, isMobileCustom } from "senf-atomic-design-system";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import styled from "styled-components";
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

const Wrapper = styled.div`
width: 100vw;
height:100vh;
position: fixed;
top:0;
left:0;
z-index: 1;
pointer-events:none;
`

const ModelsList = ({ setLoadingModel, setComponentsSidebarOpen, setOpenContextPanel }) => {
  const isMobile = isMobileCustom()
  const [models, setModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [swipedUp, setSwipedUp] = useState(false);




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

  const handleSearch = (queryString, dbDataKeys = [
    "title",
    "objectType",
  ]) => {
    setSearchTerm(queryString)
    const sanitizedUserInput = queryString.toString().toLowerCase();

    const newModels = models.filter((object) => {
      return dbDataKeys.some((dbDataKey) => {
        if (
          object[dbDataKey] &&
          object[dbDataKey].toString().toLowerCase().includes(sanitizedUserInput)
        ) {
          return true;
        }
      });
    });

    console.log(queryString, newModels)
    setModels(newModels)
  };


  const handlePlaceModel = (event, cardType, modelData) => {
    setLoadingModel(true);
    setSwipedUp(false);
    if (isMobile) {
      setSwipedUp(false)
    }
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `3dModels/${modelData.modelPath}`
    );
    function onResolve(foundURL) {
      setLoadingModel(false);
      createModel(
        `${Math.floor(Math.random() * 1000)}`,
        foundURL,
        modelData.format,
        setOpenContextPanel,
        setSwipedUp

      );
    }
    getDownloadURL(storageRef).then(onResolve, (error) => { setLoadingModel(false); console.log(error) });

  }

  return (
    <Wrapper><ThreeDToolSwipeList data={models} handlePlaceModel={handlePlaceModel} handleSearch={handleSearch} searchTerm={searchTerm} swipedUp={swipedUp} setSwipedUp={setSwipedUp} /></Wrapper>
  );
};
export default ModelsList;
