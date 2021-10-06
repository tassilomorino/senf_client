/** @format */

import React from "react";

import PropTypes from "prop-types";

// Redux
import { useDispatch } from "react-redux";
import { openProject } from "../../../redux/actions/projectActions";
import ExpandButton from "../CustomButtons/ExpandButton";

import styled from "styled-components";

const ProjectCard = (props) => {
  const {
    project: { title, owner, imgUrl, project, startDate, endDate },
  } = props;
  const dispatch = useDispatch();
  const pushScreamId = (project) => {
    dispatch(openProject(project));
  };

  const ProjectCard = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    min-height: 100px;
    max-width: 95%;
    border-radius: 20px;
    /* box-shadow: 0 8px 40px -12px rgba(0,0,0,0); */
    max-height: 14em;
    /* background-color: rgb(255,255,255,0.6); */

    border-radius: 20px;
    overflow: hidden;
    /* background: transparent;
    box-shadow:  9px 9px 18px #f6d254,
                -9px -9px 18px #ffe05a; */
  `

  const LeftWrapper = styled.div`
    position: relative;
    width: 120px;
    height: 120px;
    background-color: white;
    border-radius: 20px;

    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    overflow: hidden;
  `
  // what about the LeftWrapper img?
  /* .leftWrapper img{
    width: 100%;
    margin-left: 0%;
  } */

  const RightWrapper = styled.div`
    margin-left: 10px;
    height: 120px;
    width: 60%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  `

  const Owner = styled.div`
    font-family: Futura PT W01 Book;
    color: #353535
  `
  // why 2 fonts?
  const Title = styled.div`
    font-size: 18px;
    font-family: PlayfairDisplay-Bold;
    font-family: Futura PT W01-Bold; 
    color: #353535;
  ` 
  const Date = styled.div`
    margin-top:10px;
    font-family: Futura PT W01 Book;
    color: #353535
  `
  // Understanding what they are (seem to be hidden?)
  // Ideacards IN the project view slightly different than when coming in...why?
  return (
    <ProjectCard>
      <ExpandButton
        handleButtonClick={() => pushScreamId(project)}
      />

      <LeftWrapper>
        <img
          src={imgUrl}
          width="100%"
          alt="profile"
          className="profile-image"
        />
      </LeftWrapper>
      <RightWrapper>
        <Owner> {owner} </Owner>
        <Title>{title}</Title>

        {endDate ? (
          <Date>
            {" "}
            {startDate} – {endDate}{" "}
          </Date>
        ) : (
          <Date>{startDate} </Date>
        )}
      </RightWrapper>
    </ProjectCard>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  openProject: PropTypes.func.isRequired,
};

export default ProjectCard;
