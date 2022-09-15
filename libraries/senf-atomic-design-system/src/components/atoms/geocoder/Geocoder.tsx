import React, { Component, useEffect, useState } from "react";
import MapboxClient from "mapbox";
import styled from "styled-components";
import Input from "../inputs/Input";
import { GeocoderProps } from "./Geocoder.types";
import Divider from "../divider/Divider";
import Box from "../box/Box";
import Icon from "../icons/Icon";
import { Arrow, Location } from "../../../assets/icons";
import Typography from "../typography/Typography";
import IdeaPin from "../../../assets/icons/IdeaPin";
import Locate from "../../../assets/icons/Locate";
import { geolocateControl } from "../map/hooks/useGeolocateControl";

const ResultsContainer = styled.div`
height:100vh;
width:100vw;
position:fixed;
top:0;
left:0;
background-color:${({ theme }) => theme.colors.greyscale.greyscale10};
z-index:998;

@media (min-width: 768px) {
  width:400px;
}


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
      geocoder.geocodeForward(queryString, {
        limit: 5,
        autocomplete: true,
        fuzzyMatch: true,
        language: "de",
        bbox: [6.7, 50.8, 7.2, 51],
        types: "country,region,postcode,district,place,locality,neighborhood,address,poi"
        // proximity: Bias the response to favor results that are closer to this location. Provided as two comma-separated coordinates in longitude,latitude order, or the string ip to bias based on reverse IP lookup.
        // https://docs.mapbox.com/api/search/geocoding/
      }).then((res) => {
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

  const handleGeolocate = () => {
    geolocateControl(statefulMap)

    setTimeout(() => {
      setShowResults(false)
    }, 200);


  }



  return (
    <React.Fragment>
      <Box zIndex={999} width="100%"
      // position={showResults && "fixed"} top={showResults && 0}
      >
        {/* <OverlayIcon onClick={() => setShowResults(!showResults)}>
          <Icon icon={<Arrow transform="" />} />
        </OverlayIcon> */}

        <Input
          name="searchAddress"
          type="search"
          leadingIcon={<Arrow transform="rotate(180deg)" />}
          leadingIconClick={() => showResults ? setShowResults(false) : handleSetClose()}
          placeholder={"searchAddress"}
          // placeholder={t("searchAddress")}
          onChange={(event) => onChange(event?.target?.value)}
          onClick={() => setShowResults(true)}
          value={searchTerm}
        />
      </Box>


      {showResults && (
        <ResultsContainer>
          <div style={{ height: "80px" }} />
          {results?.map((item, index) => (
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

          <Result
            onClick={handleGeolocate}
          >
            <Box>
              <Box width="46px" justifyContent="center" alignItems="center"> <Icon icon={<Locate />} /></Box>
              <Box flexDirection="column" width="calc(100%  - 70px)" >
                <Box flexDirection="column" marginBlock="20px">
                  <Typography variant="bodyBg" fontWeight={600}> Aktuellen Standort verwenden</Typography>
                </Box>
                <Divider />
              </Box>
            </Box>
          </Result>

          <Result
            onClick={() => setShowResults(false)}
          >
            <Box>
              <Box width="46px" justifyContent="center" alignItems="center"> <IdeaPin transform="scale(0.7)" /></Box>
              <Box flexDirection="column" width="calc(100%  - 70px)" >
                <Box flexDirection="column" marginBlock="20px">
                  <Typography variant="bodyBg" fontWeight={600}> Standort auf  der Karte festlegen</Typography>
                </Box>
              </Box>
            </Box>
          </Result>
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
