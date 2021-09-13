/** @format */

import React from "react";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import topics from "../../data/topics";
import { useTranslation } from "react-i18next";

export function TopicFilter({ handleTopicSelector, topicsSelected }) {
  const { t } = useTranslation();
  // Handler at index 0 is for the "all" checkbox
  const topicFilters = topics.map((topic, i) => {
    return (
      <Checkbox
        color="default"
        icon={<FiberManualRecordIcon />}
        checkedIcon={<FiberManualRecordIcon className="activelegenditem" />}
        onChange={() => handleTopicSelector(topic.name)}
        data-cy={topic.name}
        checked={
          topicsSelected.includes(topic.name) && topicsSelected.length !== 7
        }
        style={{ color: topic.color }}
      />
    );
  });

  return (
    <div className="legendwrapper">
      <FormGroup row className="legend">
        <FormControlLabel
          control={
            <Checkbox
              icon={<FiberManualRecordIcon />}
              checkedIcon={
                <FiberManualRecordIcon className="activelegenditem" />
              }
              data-cy="topic-all"
              onChange={() => handleTopicSelector("all")}
              checked={topicsSelected.length === 7}
              style={{ color: "#000000" }}
            />
          }
          label={t("topics_all")}
        />
        {topics.map((topic, i) => (
          <FormControlLabel
            key={`${topic.name}-${i}`}
            control={topicFilters[i]}
            label={topic.label}
          />
        ))}
      </FormGroup>
    </div>
  );
}

export default TopicFilter;
