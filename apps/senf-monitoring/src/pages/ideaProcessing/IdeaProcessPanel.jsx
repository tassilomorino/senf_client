import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  Box,
  Divider,
  ExpandMap,
  LayerWhiteFirstDefault,
  Typography,
} from "senf-atomic-design-system";
import styled from "styled-components";
import EditStatusPanel from "./EditStatusPanel";
import StatusLog from "./StatusLog";

const Wrapper = styled.div`
  ${(props) => LayerWhiteFirstDefault}
  bottom: 0;
  max-width: 600px;
  width: 100%;
  height: calc(100vh - 20px);
  padding: 30px;
`;

const IdeaProcessPanel = () => {
  const params = useParams();
  const { ideaId } = params;
  const [idea, setIdea] = React.useState(null);
  const [mode, setMode] = useState("selectMunicipalities");
  const [statefulMap, setStatefulMap] = useState(null);

  const initialMapViewport = {
    latitude: 50.96,
    longitude: 6.95,
    zoom: 9.2,
    duration: 0,
    pitch: 0,
  };

  useEffect(() => {
    if (ideaId) {
      // query idea from db
    }
  }, [ideaId]);

  return (
    <Wrapper>
      <Box
        flexDirection="column"
        height="100%"
        justifyContent="flex-start">
        <Box
          flexDirection="column"
          height="max-content"
          maxHeight="200px"
          gap="10px">
          <Typography variant="h2">Fahrradweg am Aachener</Typography>
          <Typography variant="bodyBg">
            Internes Aktivitätenprotokoll aller Aktionen, Kommentare und
            Fortschritte.
          </Typography>
          <Divider />
        </Box>
        <StatusLog />
        <EditStatusPanel />
      </Box>
    </Wrapper>
  );
};

export default IdeaProcessPanel;
