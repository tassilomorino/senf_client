import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase";
import IdeaProcessPanel from "./IdeaProcessPanel";

const Wrapper = styled.div`
  top: 0;
  right: 0;
  max-width: 800px;
  width: 100%;
  overflow: scroll;
`;

const IdeaSidebarContent = ({ ideaId }) => {
  const [idea, setIdea] = useState({});
  useEffect(async () => {
    if (ideaId) {
      try {
        const ideaDoc = doc(db, `screams/${ideaId}`);
        const docSnapshot = await getDoc(ideaDoc);
        setIdea({ ...docSnapshot.data(), ideaId: docSnapshot.id });
        console.log(idea);
      } catch (error) {
        console.log(error);
      }
    }
  }, [ideaId]);

  return (
    <Wrapper>
      <IdeaProcessPanel idea={idea} />
    </Wrapper>
  );
};

export default IdeaSidebarContent;
