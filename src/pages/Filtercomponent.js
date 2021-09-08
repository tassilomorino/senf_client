/** @format */

import React, { Component } from "react";
import TopicFilter from "../components/layout/TopicFilter";

export class Filtercomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicsSelected: [
        "Verkehr",
        "Versorgung",
        "Umwelt und Grün",
        "Rad",
        "Inklusion / Soziales",
        "Sport / Freizeit",
        "Sonstige",
      ],
      latitude1: 51.08,
      latitude2: 50.79,
      longitude2: 6.712,
      longitude3: 7.17,
    };
  }

  handleTopicSelector = (topic) => {
    const index = this.state.topicsSelected.indexOf(topic);
    if (topic === "all") {
      this.setState({
        topicsSelected: [
          "Verkehr",
          "Versorgung",
          "Umwelt und Grün",
          "Rad",
          "Inklusion / Soziales",
          "Sport / Freizeit",
          "Sonstige",
        ],
      });
    } else if (this.state.topicsSelected.length === 7) {
      this.setState({
        topicsSelected: [topic],
      });
    } else if (index === -1) {
      this.setState({
        topicsSelected: this.state.topicsSelected.concat(topic),
      });
    } else {
      this.state.topicsSelected.splice(index, 1);
      this.setState({
        topicsSelected: this.state.topicsSelected,
      });
    }
  };

  render() {
    const ideas = [
      // nb of total ideas currently = 217
      {
        id: 1,
        age: 17, // age of the user who created the ide
        title: "idea 1",
        topic: "Rad", // [1, 3]
        long: 6.94756775540919,
        lat: 50.94361588950614,
        // votes: [17, 25]
      },
      {
        id: 2,
        age: 14,
        title: "idea 2",
        topic: "Verkehr",
        long: 6.94756775540919,
        lat: 50.94361588950614,
      },
      {
        id: 3,
        age: 16,
        title: "idea 3",
        topic: "Rad",
        long: 6.94756775540919,
        lat: 50.94361588950614,
      },
      {
        id: 4,
        age: 29,
        title: "idea 4",
        topic: "Versorgung",
        long: 6.94756775540919,
        lat: 50.94361588950614,
      },
      // etc.
    ];

    const filteredIdeasNew = ideas.filter(
      ({ topic, lat, long }) =>
        this.state.topicsSelected.includes(topic) &&
        lat <= this.state.latitude1 &&
        lat >= this.state.latitude2 &&
        long >= this.state.longitude2 &&
        long <= this.state.longitude3
    );

    return (
      <>
        <TopicFilter
          handleTopicSelector={this.handleTopicSelector}
          topicsSelected={this.state.topicsSelected}
        ></TopicFilter>

        <div style={{ position: "absolute", marginLeft: "400px", top: 0 }}>
          {filteredIdeasNew.map((idea) => (
            <div className="card" style={{ backgroundColor: "white" }}>
              <h1>{idea.title} </h1>
              <p>{idea.topic} </p>
              <br />
            </div>
          ))}{" "}
        </div>
      </>
    );
  }
}

export default Filtercomponent;
