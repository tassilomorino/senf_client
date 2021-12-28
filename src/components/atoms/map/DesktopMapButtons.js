/** @format */

import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { CustomButton, CustomIconButton } from "../CustomButtons/CustomButton";
import { closeScream } from "../../../redux/actions/screamActions";
import {
  setMapBounds,
  setMapViewport,
} from "../../../redux/actions/mapActions";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { SubmitButton } from "../CustomButtons/SubmitButton";

export const DesktopMapButtons = memo(({ viewport, mapRef }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openScream = useSelector((state) => state.UI.openScream);
  const initialMapBounds = useSelector((state) => state.data.initialMapBounds);
  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );

  const handleMapBoundsSet = (viewport) => {
    const map = mapRef.current.getMap();
    var canvas = map.getCanvas(),
      w = canvas.width,
      h = canvas.height,
      NW = map.unproject([0, 0]).toArray(),
      SE = map.unproject([w, h]).toArray();
    var boundsRar = [NW, SE];

    const bounds = {
      latitude1: boundsRar[0][1],
      latitude2: boundsRar[1][1],
      longitude2: boundsRar[0][0],
      longitude3: boundsRar[1][0],
    };

    dispatch(setMapBounds(bounds));

    dispatch(closeScream());

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleMapBoundsReset = () => {
    dispatch(setMapViewport(initialMapViewport));
    dispatch(setMapBounds(initialMapBounds));

    dispatch(closeScream());
  };

  return (
    !openInfoPage &&
    !openScream && (
      <div
      // style={isMobileCustom ? { transform: "scale(0.8)" } : {}}
      >
        {isMobileCustom ? (
          <SubmitButton
            text={t("Ideen im Bereich anzeigen")}
            backgroundColor="white"
            textColor="#353535"
            position="fixed"
            bottom="130px"
            animation={true}
            handleButtonClick={() => handleMapBoundsSet(viewport)}
            smallSubmitButton={true}
          />
        ) : (
          <CustomButton
            text={t("map_filterIdeas")}
            backgroundColor="white"
            textColor="#353535"
            position="fixed"
            top="40px"
            animation={true}
            handleButtonClick={() => handleMapBoundsSet(viewport)}
          />
        )}
        <CustomIconButton
          name="CircularArrow"
          margin="0px"
          position="fixed"
          top="40px"
          marginLeft="calc(50% + 200px)"
          handleButtonClick={handleMapBoundsReset}
          animation={true}
        />
      </div>
    )
  );
});
