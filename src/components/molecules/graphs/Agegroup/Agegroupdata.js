/** @format */

import React from "react";

export function Agegroupdata(screams, likes, filteredTopic) {
  const listOfIdsPerTopic1 = [];

  for (const scream of screams) {
    if (scream.Thema === filteredTopic) {
      listOfIdsPerTopic1.push(scream.id);
    }
  }

  const votesTopic1agegroupUnder18 = likes.reduce((acc, cur) => {
    // cur refers to each object in the array votes & acc is a number that get returned

    if (
      listOfIdsPerTopic1.includes(cur.ideaId) &&
      cur.age >= 14 &&
      cur.age < 18
    ) {
      return ++acc;
    } else {
      return acc;
    }
  }, 0); // here, 0 is the initiual number for the accumulator

  const votesTopic1agegroupBetween18and24 = likes.reduce((acc, cur) => {
    if (
      listOfIdsPerTopic1.includes(cur.ideaId) &&
      cur.age >= 18 &&
      cur.age < 25
    ) {
      return ++acc;
    } else {
      return acc;
    }
  }, 0); // here, 0 is the initiual number for the accumulator

  const votesTopic1agegroupBetween25and34 = likes.reduce((acc, cur) => {
    if (
      listOfIdsPerTopic1.includes(cur.ideaId) &&
      cur.age >= 25 &&
      cur.age < 34
    ) {
      return ++acc;
    } else {
      return acc;
    }
  }, 0); // here, 0 is the initiual number for the accumulator

  const votesTopic1agegroupBetween35and44 = likes.reduce((acc, cur) => {
    if (
      listOfIdsPerTopic1.includes(cur.ideaId) &&
      cur.age >= 35 &&
      cur.age < 44
    ) {
      return ++acc;
    } else {
      return acc;
    }
  }, 0); // here, 0 is the initiual number for the accumulator

  const votesTopic1agegroupBetween45and54 = likes.reduce((acc, cur) => {
    if (
      listOfIdsPerTopic1.includes(cur.ideaId) &&
      cur.age >= 45 &&
      cur.age < 54
    ) {
      return ++acc;
    } else {
      return acc;
    }
  }, 0); // here, 0 is the initiual number for the accumulator

  const votesTopic1agegroupBetween55and64 = likes.reduce((acc, cur) => {
    if (
      listOfIdsPerTopic1.includes(cur.ideaId) &&
      cur.age >= 55 &&
      cur.age < 64
    ) {
      return ++acc;
    } else {
      return acc;
    }
  }, 0); // here, 0 is the initiual number for the accumulator

  const votesTopic1agegroupOver64 = likes.reduce((acc, cur) => {
    if (
      listOfIdsPerTopic1.includes(cur.ideaId) &&
      cur.age >= 65 &&
      cur.age < 104
    ) {
      return ++acc;
    } else {
      return acc;
    }
  }, 0); // here, 0 is the initiual number for the accumulator

  const bike_array_with_14_values = [
    -screams.filter(({ Thema, age }) => Thema === filteredTopic && age < 18)
      .length,
    votesTopic1agegroupUnder18,
    -screams.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 18 && age < 25
    ).length,
    votesTopic1agegroupBetween18and24,
    -screams.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 25 && age < 35
    ).length,
    votesTopic1agegroupBetween25and34,

    -screams.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 35 && age < 45
    ).length,
    votesTopic1agegroupBetween35and44,

    -screams.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 45 && age < 55
    ).length,
    votesTopic1agegroupBetween45and54,

    -screams.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 55 && age < 65
    ).length,
    votesTopic1agegroupBetween55and64,

    -screams.filter(
      ({ Thema, age }) => Thema === filteredTopic && age >= 65 && age < 105
    ).length,

    votesTopic1agegroupOver64,
  ];
  return bike_array_with_14_values;
}
