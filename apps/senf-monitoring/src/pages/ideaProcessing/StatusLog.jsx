import React from "react";
import {
  LayerWhiteFirstDefault,
  List,
  StatusCard,
} from "senf-atomic-design-system";
import styled from "styled-components";
import { useAuthContext } from "senf-shared";

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  overflow: scroll;
`;
const StatusLog = ({ statusLogDocs }) => {
  const { user } = useAuthContext();

  return (
    <Wrapper>
      {statusLogDocs && (
        <List
          data={statusLogDocs}
          CardType={StatusCard}
          listEndText={" "}
          handle={user?.handle}
          user={user}
        />
      )}
      {/* {statusLogDocs.map((statusLogDoc) => (
        <div>
          {statusLogDoc.userId}
          {statusLogDoc.description}
        </div>
      ))} */}
    </Wrapper>
  );
};

export default StatusLog;
