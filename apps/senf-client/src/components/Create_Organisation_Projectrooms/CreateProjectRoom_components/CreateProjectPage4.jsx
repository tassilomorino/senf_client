/** @format */

import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import MapDialog from "../Components/MapDialog";
import {
  ComponentWrapper,
  ComponentInnerWrapper,
} from "../styles/sharedStyles";

// firebase
import { db } from "../../../firebase";
import Navigation from "../Components/Navigation";
import { StyledH3 } from "../../../styles/GlobalStyle";

const CreateProjectPage4 = ({
  onClickNext,
  onClickPrev,
  set,
  pagesData,
  index,
}) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);

  const [mapOpen, setMapOpen] = useState(false);
  const mapRef = useRef(null);
  const [drawnPolygon, setDrawnPolygon] = useState(null);

  const handleNext = () => {
    setNextClicked(true);

    setTimeout(() => {
      if (localStorage.getItem("createProjectRoomPostEdit") === "true") {
        set(pagesData.length - 1);
      } else {
        onClickNext();
      }
    }, 200);
  };

  return (
    <React.Fragment>
      <MapDialog
        mapOpen={mapOpen}
        setMapOpen={setMapOpen}
        drawnPolygon={drawnPolygon}
        setDrawnPolygon={setDrawnPolygon}
      />
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH3
            textAlign="center"
            margin="20px"
          >
            {pagesData[index].subTitle}
          </StyledH3>
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
        set={set}
        disabled={!drawnPolygon || nextClicked}
        loading={nextClicked}
        pagesData={pagesData}
        index={index}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage4;
