/** @format */

import React, { Component } from "react";

import PropTypes from "prop-types";

// Redux
import { useDispatch } from "react-redux";
import { openProject } from "../../../redux/actions/projectActions";
import ExpandButton from "../CustomButtons/ExpandButton";

const ProjectCard = (props) => {
  const {
    project: { title, owner, imgUrl, project, startDate, endDate },
  } = props;
  const dispatch = useDispatch();
  const pushScreamId = (project) => {
    dispatch(openProject(project));
  };

  return (
    <div className="projectCard">
      <ExpandButton
          handleButtonClick={() => pushScreamId(project)}
         />

      <div className="leftWrapper">
        <img
          src={imgUrl}
          width="100%"
          alt="profile"
          className="profile-image"
        />
      </div>
      <div className="rightWrapper">
        <div className="owner"> {owner} </div>
        <div className="title">{title}</div>

        {endDate ? (
          <div className="date">
            {" "}
            {startDate} – {endDate}{" "}
          </div>
        ) : (
          <div className="date">{startDate} </div>
        )}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  openProject: PropTypes.func.isRequired,
};

export default ProjectCard;
