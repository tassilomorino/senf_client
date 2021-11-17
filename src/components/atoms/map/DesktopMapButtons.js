/** @format */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { CustomButton, CustomIconButton } from "../CustomButtons/CustomButton";
import { closeScream } from "../../../redux/actions/screamActions";
import {
  setMapBounds,
  setMapViewport,
  setResetMapBounds,
} from "../../../redux/actions/mapActions";

export const DesktopMapButtons = ({ viewport, mapRef }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);

  const handleMapBoundsSet = (viewport) => {
    const map = mapRef.current.getMap();
    var canvas = map.getCanvas(),
      w = canvas.width,
      h = canvas.height,
      NW = map.unproject([0, 0]).toArray(),
      SE = map.unproject([w, h]).toArray();
    var bounds = [NW, SE];

    dispatch(setMapBounds(bounds));

    dispatch(closeScream());

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleMapBoundsReset = () => {
    const viewport = {
      zoom: 11.5,
      pitch: 30,
      latitude: 50.95,
      longitude: 6.9503,
    };

    dispatch(setMapViewport(viewport));

    const bounds = {
      latitude1: 51.08,
      latitude2: 50.79,
      longitude2: 6.712,
      longitude3: 7.17,
    };

    dispatch(setResetMapBounds(bounds));
    dispatch(closeScream());
  };

  return (
    !openInfoPage && (
      <React.Fragment>
        <CustomButton
          text={t("map_filterIdeas")}
          backgroundColor="white"
          textColor="#353535"
          position="fixed"
          top="40px"
          animation={true}
          handleButtonClick={() => handleMapBoundsSet(viewport)}
        />
        <CustomIconButton
          name="CircularArrow"
          margin="0px"
          position="fixed"
          top="40px"
          marginLeft="calc(50% + 200px)"
          handleButtonClick={handleMapBoundsReset}
          animation={true}
        />
      </React.Fragment>
    )
  );
};
