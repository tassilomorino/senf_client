import { collection, getDocs, query } from "firebase/firestore";
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
import { db } from "../../firebase";
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

const IdeaProcessPanel = ({ idea }) => {
  const [statusLogDocs, setStatusLogDocs] = useState([]);

  const getStatusLogDocs = async () => {
    try {
      const divisionsRef = collection(db, `screams/${idea.ideaId}/statusLog`);
      const q = query(divisionsRef);
      const divisionsQuerySnapshot = await getDocs(q);
      const statusLogDocsData = [];

      divisionsQuerySnapshot.forEach((doc) => {
        statusLogDocsData.push({
          ...doc.data(),
          divisionId: doc.id,
        });
      });
      setStatusLogDocs(statusLogDocsData);
      console.log(statusLogDocsData);
    } catch (error) {
      throw new Error(error, "Error in Memberlist");
    }
  };

  useEffect(() => {
    if (idea?.ideaId) {
      getStatusLogDocs();
    }
  }, [idea]);

  return (
    <Wrapper>
      <Box
        flexDirection="column"
        height="100%"
        justifyContent="flex-start"
      >
        <Box
          flexDirection="column"
          height="max-content"
          maxHeight="200px"
          gap="10px"
        >
          <Typography variant="h2">{idea?.title}</Typography>
          <Typography variant="bodyBg">
            Internes Aktivitätenprotokoll aller Aktionen, Kommentare und
            Fortschritte.
          </Typography>
          <Divider />
        </Box>
        <StatusLog statusLogDocs={statusLogDocs} />

        <EditStatusPanel
          ideaId={idea?.ideaId}
          getStatusLogDocs={getStatusLogDocs}
        />
      </Box>
    </Wrapper>
  );
};

export default IdeaProcessPanel;
