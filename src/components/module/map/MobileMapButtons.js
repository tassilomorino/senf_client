/** @format */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trans } from "react-i18next";
import {
  CustomButton,
  CustomIconButton,
} from "../module/CustomButtons/CustomButton";
import {
  setMapViewport,
  setResetMapBounds,
} from "../../redux/actions/mapActions";
import { closeScream } from "../../redux/actions/screamActions";

const MobileMapButtons = ({ handleShowResults, number }) => {
  const { mapBounds } = useSelector((state) => state.data);

  const dispatch = useDispatch();

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
    <React.Fragment>
      {/* <CustomButton
        text={
          <Trans i18nKey="show_number_ideas" number={number}>
            Show {{ number }} ideas
          </Trans>
        }
        backgroundColor="white"
        textColor="#353535"
        position="fixed"
        bottom="80px"
        marginLeft="calc(50% - 20px)"
        handleButtonClick={handleShowResults}
        animation={true}
      />  <div
        style={
          (mapBounds.latitude1 < 50.95) |
          (mapBounds.latitude2 > 50.82) |
          (mapBounds.longitude2 > 6.812) |
          (mapBounds.longitude3 < 7.07)
            ? { opacity: 1 }
            : { opacity: 0, pointerEvents: "none" }
        }
      >
        <CustomIconButton
          name="CircularArrow"
          margin="0px"
          position="fixed"
          bottom="80px"
          marginLeft="calc(50% + 80px)"
          handleButtonClick={handleMapBoundsReset}
          animation={true}
        />
      </div> */}
    </React.Fragment>
  );
};

export default MobileMapButtons;
