import React, { Component, FC, useEffect, useRef, useState } from "react";
import MapboxClient from "mapbox";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Input from "../inputs/Input";
import { GeocoderProps } from "./Geocoder.types";
import Divider from "../divider/Divider";
import Box from "../box/Box";
import Icon from "../icons/Icon";
import { Arrow, Close, Location } from "../../../assets/icons";
import Typography from "../typography/Typography";
import IdeaPin from "../../../assets/icons/IdeaPin";
import Locate from "../../../assets/icons/Locate";
import { geolocateControl } from "../map/hooks/useGeolocateControl";
import Results from "./Results";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import DropdownListContainer from "../contentDropdown/DropdownListContainer";
import { useOnClicAndTouchOutside } from "../../../hooks/useOnClickOutside";

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100vw;
  position: fixed;
  padding-top: 70px;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.greyscale.greyscale10};
  z-index: -1;
`;

const Geocoder: FC<GeocoderProps> = ({
  statefulMap,
  placeholder,
  formik,
  handleSetClose,
}) => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom();
  const debounceTimeout = null;
  const [searchTerm, setSearchTerm] = useState("");
  const [geocoder, setGeocoder] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [detectLocationIcons, setDetectLocationIcons] = useState(false);
  const outerRef = useRef(null);

  useOnClicAndTouchOutside(outerRef, () => setShowResults(false));
  useEffect(() => {
    const accessToken =
      "pk.eyJ1IjoiZGF0dHdvb2QxOTg2IiwiYSI6ImNraTI5cnAwcDByZHUycnBleWphMHR1dDcifQ.u7pG_sZ7Su685A11r6-uuw";
    const mapboxGeocoder = new MapboxClient(accessToken);
    setGeocoder(mapboxGeocoder);
  }, []);

  useEffect(() => {
    if (formik?.values?.address) {
      setSearchTerm(formik?.values?.address);
    }
  }, [formik?.values?.address]);

  const onChange = (queryString) => {
    setSearchTerm(queryString);
    setDetectLocationIcons(true);
    if (queryString.length > 1) {
      setDetectLocationIcons(false);
      setResults([]);
    }

    if (queryString.length >= 3) {
      geocoder
        .geocodeForward(queryString, {
          limit: 5,
          autocomplete: true,
          fuzzyMatch: true,
          language: "de",
          bbox: [6.7, 50.8, 7.2, 51],
          types:
            "country,region,postcode,district,place,locality,neighborhood,address,poi",
          // proximity: Bias the response to favor results that are closer to this location. Provided as two comma-separated coordinates in longitude,latitude order, or the string ip to bias based on reverse IP lookup.
          // https://docs.mapbox.com/api/search/geocoding/
        })
        .then((res) => {
          setShowResults(true);
          setResults(res.entity.features);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          // setSearchTerm("")
        });
    }
  };

  const onSelected = (item) => {
    console.log(item);
    setSearchTerm(item.place_name);

    statefulMap.flyTo({
      center: [item.center[0], item.center[1]],
      zoom: 16.5,
      duration: 2700,
      pitch: 30,
    });

    setShowResults(false);
  };

  const handleGeolocate = () => {
    geolocateControl(statefulMap);

    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  return (
    <div
      ref={outerRef}
      style={{ width: "100%" }}
    >
      {/* <OverlayIcon onClick={() => setShowResults(!showResults)}>
          <Icon icon={<Arrow transform="" />} />
        </OverlayIcon> */}

      <Input
        name="searchAddress"
        type="text"
        leadingIcon={
          showResults ? <Arrow transform="rotate(180)" /> : <Location />
        }
        leadingIconClick={() =>
          showResults ? setShowResults(false) : setShowResults(true)
        }
        placeholder={t("geocoder_address")}
        trailingIcon={searchTerm.length > 0 ? <Close /> : undefined}
        trailingIconClick={
          searchTerm.length > 0
            ? () => {
                setSearchTerm("");
                setResults([]);
                formik.setFieldValue("address", "");
              }
            : undefined
        }
        // placeholder={t("searchAddress")}
        onChange={(event) => onChange(event?.target?.value)}
        onClick={() => {
          setShowResults(true);
          setDetectLocationIcons(true);
        }}
        value={searchTerm}
      />

      {showResults && isMobile && (
        <ResultsContainer>
          <Results
            results={results}
            onSelected={onSelected}
            detectLocationIcons={detectLocationIcons}
            setShowResults={setShowResults}
            handleGeolocate={handleGeolocate}
          />
        </ResultsContainer>
      )}

      {showResults && !isMobile && (
        <DropdownListContainer options={{ open: true, width: "330px" }}>
          <Results
            results={results}
            onSelected={onSelected}
            detectLocationIcons={detectLocationIcons}
            setShowResults={setShowResults}
            handleGeolocate={handleGeolocate}
          />
        </DropdownListContainer>
      )}
    </div>
  );
};

// Geocoder.propTypes = {
//   timeout: PropTypes.number,
//   queryParams: PropTypes.object,
//   viewport: PropTypes.object.isRequired,
//   onSelected: PropTypes.func.isRequired,
//   transitionDuration: PropTypes.number,
//   hideOnSelect: PropTypes.bool,
//   pointZoom: PropTypes.number,
//   mapboxApiAccessToken: PropTypes.string.isRequired,
//   formatItem: PropTypes.func,
//   className: PropTypes.string,
//   inputComponent: PropTypes.func,
//   itemComponent: PropTypes.func,
//   limit: PropTypes.number,
//   localGeocoder: PropTypes.func,
//   localOnly: PropTypes.bool,
//   updateInputOnSelect: PropTypes.bool,
//   initialInputValue: PropTypes.string,
// };

// Geocoder.defaultProps = {
//   timeout: 300,
//   transitionDuration: 0,
//   hideOnSelect: false,
//   updateInputOnSelect: false,
//   pointZoom: 16,
//   formatItem: (item) => item.place_name,
//   queryParams: {},
//   className: "",
//   limit: 5,
//   initialInputValue: "",
// };

export default Geocoder;
