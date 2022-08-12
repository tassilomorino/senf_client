import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import MapboxClient from "mapbox";
import { WebMercatorViewport } from "viewport-mercator-project";
import styled from "styled-components";
import Input from "../inputs/Input";
import { GeocoderProps } from "./Geocoder.types";
import Divider from "../divider/Divider";
import Box from "../box/Box";
import Icon from "../icons/Icon";
import { Arrow, Location } from "../../../assets/icons";
import Typography from "../typography/Typography";

const ResultsContainer = styled.div`
height:100vh;
width:100vw;
position:fixed;
top:0;
left:0;
background-color:${({ theme }) => theme.colors.greyscale.greyscale10};
z-index:998;

`
const Result = styled.div`
height:64px;
width:100%;
`
const Geocoder: FC<GeocoderProps> = ({ statefulMap, placeholder, finalAddress, handleSetClose }) => {
  const debounceTimeout = null;
  const [searchTerm, setSearchTerm] = useState("");
  const [geocoder, setGeocoder] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  useEffect(() => {
    const accessToken =
      "pk.eyJ1IjoiZGF0dHdvb2QxOTg2IiwiYSI6ImNraTI5cnAwcDByZHUycnBleWphMHR1dDcifQ.u7pG_sZ7Su685A11r6-uuw";
    const mapboxGeocoder = new MapboxClient(accessToken)
    setGeocoder(mapboxGeocoder)

  }, [])

  useEffect(() => {
    if (finalAddress) {
      setSearchTerm(finalAddress)
    }
  }, [finalAddress])


  const onChange = (queryString) => {
    setSearchTerm(queryString)

    if (queryString.length >= 3) {
      geocoder.geocodeForward(queryString, { limit: 3 }).then((res) => {
        setShowResults(true)
        setResults(res.entity.features)

      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        // setSearchTerm("")
      })
    }

  };

  const onSelected = (item) => {

    console.log(item)
    setSearchTerm(item.place_name)

    statefulMap.flyTo({
      center: [item.center[0], item.center[1]],
      zoom: 16.5,
      duration: 2700,
      pitch: 30,
    });

    setShowResults(false)


  };

  return (
    <React.Fragment>
      <Box zIndex={999} margin="16px" width="100%">
        {/* <OverlayIcon onClick={() => setShowResults(!showResults)}>
          <Icon icon={<Arrow transform="" />} />
        </OverlayIcon> */}
        <Input
          key="searchAddress"
          id="searchAddress"
          name="searchAddress"
          type="search"
          icon={<Arrow transform="rotate(180deg)" />}
          iconClick={() => showResults ? setShowResults(false) : handleSetClose()}
          placeholder={"searchAddress"}
          // placeholder={t("searchAddress")}
          // onChange={(event) => onChange(event?.target?.value)}
          setSearchTerm={onChange}
          // onBlur={() => setShowResults(false)}
          onFocus={() => setShowResults(true)}
          searchTerm={searchTerm}
          value={searchTerm}
        />
      </Box>


      {showResults && !!results?.length && (
        <ResultsContainer>
          <div style={{ height: "80px" }} />
          {results.map((item, index) => (
            <React.Fragment>

              <Result
                key={index}
                onClick={() => onSelected(item)}
                item={item}
              >
                <Box>
                  <Box width="46px" justifyContent="center" alignItems="center"> <Icon icon={<Location />} /></Box>
                  <Box flexDirection="column" width="calc(100%  - 70px)" >
                    <Box flexDirection="column" marginBlock="10px">
                      <Typography variant="bodyBg" fontWeight={600}> {item?.text}</Typography>
                      <Typography variant="bodySm"> {item?.context[0]?.text}, {item?.context[1]?.text} </Typography>
                    </Box>
                    <Divider />
                  </Box>

                </Box>
              </Result>

            </React.Fragment>

          ))}
        </ResultsContainer>
      )
      }
    </React.Fragment >
  );

}

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
