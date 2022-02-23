/** @format */

import React from "react";
import { Button } from "senf-atomic-design-system";
const Blank = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        top: 0,
        left: 0,
        position: "fixed",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "content",
        textAlign: "center",
      }}
    >
      <Button
        handleButtonClick={() => alert("hi")}
        size="large"
        text={"hi"}
        zIndex="999"
        backgroundColor="#fed957"
        width="50px"
        textColor="#353535"
      />
    </div>
  );
};

export default Blank;
