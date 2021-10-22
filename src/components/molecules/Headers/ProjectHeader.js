/** @format */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import ShareModal from "../../molecules/Modals/ShareModal";
import Tabs from "../../atoms/Tabs/Tabs";
import { ProjectTabData } from "../../../data/ProjectTabData";

const FixedWrapper = styled.div`
  z-index: 91;
  position: fixed;
  width: 95%;

  height: 80px;
  background-color: white;
  top: ${(props) => (props.moveUp ? "-90px" : "10px")};
  left: 2.5%;
  border-radius: 20px 20px;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2);
  animation: animation 1.7s ease-in-out;

  @media (min-width: 768px) {
    left: 210px;
    width: 380px;
    animation: none;
  }

  @keyframes animation {
    0% {
      transform: translateY(-100%);
    }
    50% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    }
  }
`;

const FlexWrapper = styled.div`
  position: relative;
  width: 97.5%;
  height: 50px;
  top: 0px;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ImgWrapperMobile = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.8);
`;

const TitleWrapper = styled.div`
  font-size: 18px;
  font-family: PlayfairDisplay-Bold;
  color: #353535;
  text-align: center;
  width: 60%;
  margin-left: 20%;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const ProjectHeader = ({
  imgUrl,
  title,
  loading,
  calendar,
  order,
  handleClose,
  handleClick,
  path,
  project,
}) => {
  const { openScream } = useSelector((state) => state.UI);
  const [shareOpen, setShareOpen] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Senf.koeln – ${title}`,
          url: path,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      setShareOpen(true);
    }
  };

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }
  return (
    <React.Fragment>
      {shareOpen && (
        <ShareModal
          screamId={project}
          title={title}
          path={path}
          setShareOpen={setShareOpen}
        />
      )}

      <FixedWrapper moveUp={openScream}>
        <FlexWrapper>
          <CustomIconButton
            name="ArrowLeft"
            position="fixed"
            top="9px"
            shadow={false}
            handleButtonClick={handleClose}
          />

          <TitleWrapper>{truncateString(title, 18)}</TitleWrapper>

          <ImgWrapperMobile>
            <img src={imgUrl} width="100%" alt="project-thumbnail" />
          </ImgWrapperMobile>
        </FlexWrapper>
        {/* <div style={{ position: "absolute", top: "20px", right: "10px" }}>
          <CustomIconButton
            name="Share"
            margin="0px"
            left="calc(100% - 50px)"
            position="relative"
            handleButtonClick={handleShare}
          />
        </div> */}

        {/* <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <ShareModal screamId={project} title={title} path={path} />
      </div> */}

        <Tabs
          loading={loading}
          handleClick={handleClick}
          order={order}
          tabLabels={
            calendar
              ? ProjectTabData.map((item) => item.text)
              : ProjectTabData.map((item) => item.text).slice(0, 2)
          }
          marginTop={"0px"}
          marginBottom={"0px"}
          lineColor={"#cecece"}
        ></Tabs>
      </FixedWrapper>
    </React.Fragment>
  );
};

export default ProjectHeader;
