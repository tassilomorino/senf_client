/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import ThreeDToolSwipeList from "./ThreeDToolSwipeList";

import { ThreeDToolSwipeListProps } from "./ThreeDToolSwipeListProps.types";

export default {
  title: "Pages/ThreeDToolSwipeList",
  component: ThreeDToolSwipeList,
  argTypes: {},
} as Meta<typeof ThreeDToolSwipeList>;

const Template: Story<ThreeDToolSwipeListProps> = (args) => (
  <ThreeDToolSwipeList {...args} />
);
export const Default = Template.bind({});
Default.args = {
  data: [
    {
      screamId: "omweqsDYlFMkmTFAX1Ba",
      lat: 50.96734458192481,
      long: 7.00181320821256,
      title: "Straßenfest an der Wallstraße",
      body: "Vom Abschnitt Ecke Wallstr. bis Springbrunnen wird geplant ein Straßenfest zu veranstalten. Wohnst du in der Straße und willst deine Springbrunnen wird geplant ein Straßenfest zu veranstalten. Wohnst du in der Straße und willst deine Nachbar:innen",
      createdAt: "2021-07-12T11:10:22.413Z",
      commentCount: 0,
      likeCount: 1,
      status: "None",
      Thema: "Sport / Freizeit",
      Stadtteil: "Mülheim",
      color: "#f6c095",
      locationHeader: "Mülheimer Freiheit 142",
    },
    {
      screamId: "omweqsDYlFMkmTFAX1Ba",
      lat: 50.96734458192481,
      long: 7.00181320821256,
      title: "Straßenfest an der Wallstraße",
      body: "Vom Abschnitt Ecke Wallstr. bis Springbrunnen wird geplant ein Straßenfest zu veranstalten. Wohnst du in der Straße und willst deine Nachbar:innen ken",
      createdAt: "2021-07-12T11:10:22.413Z",
      commentCount: 0,
      likeCount: 1,
      status: "None",
      Thema: "Sport / Freizeit",
      Stadtteil: "Mülheim",
      color: "#f6c095",
      locationHeader: "Mülheimer Freiheit 142",
    },
  ],
};

export const SwipedUp = Template.bind({});
SwipedUp.args = {
  data: ""

};
