import React, { FC } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { GeocoderProps } from "./Geocoder.types";
import Divider from "../divider/Divider";
import Box from "../box/Box";
import Icon from "../icons/Icon";
import { Location } from "../../../assets/icons";
import Typography from "../typography/Typography";
import IdeaPin from "../../../assets/icons/IdeaPin";
import Locate from "../../../assets/icons/Locate";

const Result = styled.div`
  height: 64px;
  width: 100%;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.greyscale.greyscale20};
    border-radius: ${({ theme }) => theme.radii[0]}px;
  }
`;
const Results: FC<GeocoderProps> = ({
  results,
  onSelected,
  detectLocationIcons,
  setShowResults,
  handleGeolocate,
}) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {results?.map((item, index) => (
        <Result
          key={`geocoder_result${index}`}
          onClick={() => onSelected(item)}
          item={item}
        >
          <Box>
            <Box
              width="46px"
              justifyContent="center"
              alignItems="center"
            >
              <Icon icon={<Location />} />
            </Box>
            <Box
              flexDirection="column"
              width="calc(100%  - 70px)"
            >
              <Box
                flexDirection="column"
                marginBlock="10px"
              >
                <Typography
                  variant="bodyBg"
                  fontWeight={600}
                >
                  {item?.text}
                </Typography>
                <Typography variant="bodySm">
                  {item?.context[0]?.text}, {item?.context[1]?.text}{" "}
                </Typography>
              </Box>
              <Divider />
            </Box>
          </Box>
        </Result>
      ))}
      {detectLocationIcons && (
        <>
          <Result onClick={handleGeolocate}>
            <Box>
              <Box
                width="46px"
                justifyContent="center"
                alignItems="center"
              >
                <Icon icon={<Locate />} />
              </Box>
              <Box
                flexDirection="column"
                width="calc(100%  - 70px)"
              >
                <Box
                  flexDirection="column"
                  marginBlock="20px"
                >
                  <Typography
                    variant="bodyBg"
                    fontWeight={600}
                  >
                    {t("geocoder_detect_location")}
                  </Typography>
                </Box>
                <Divider />
              </Box>
            </Box>
          </Result>

          <Result onClick={() => setShowResults(false)}>
            <Box>
              <Box
                width="46px"
                justifyContent="center"
                alignItems="center"
              >
                <IdeaPin transform="scale(0.7)" />
              </Box>
              <Box
                flexDirection="column"
                width="calc(100%  - 70px)"
              >
                <Box
                  flexDirection="column"
                  marginBlock="20px"
                >
                  <Typography
                    variant="bodyBg"
                    fontWeight={600}
                  >
                    {t("geocoder_find_on_map")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Result>
        </>
      )}
    </React.Fragment>
  );
};

export default Results;
