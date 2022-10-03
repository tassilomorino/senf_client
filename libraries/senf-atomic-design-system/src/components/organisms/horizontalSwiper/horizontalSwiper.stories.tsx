/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import HorizontalSwiper from "./HorizontalSwiper";

import { HorizontalSwiperProps } from "./HorizontalSwiper.types";

import WorkTogether from "../../../assets/illustrations/workTogether.png";
import OpenBook from "../../../assets/illustrations/openBook.png";
import WeAreHere from "../../../assets/illustrations/weAreHere.png";

export default {
  title: "Organisms/HorizontalSwiper",
  component: HorizontalSwiper,
  argTypes: {},
} as Meta<typeof HorizontalSwiper>;

const Template: Story<HorizontalSwiperProps> = (args) => (
  <HorizontalSwiper {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "x",
  pages: [
    {
      title: "Werdet sichtbar",
      text: "Zeigt der Community, dass ihr euch aktiv mit Bürgerbeteiligung beschäftigt",
      img: WeAreHere,
      id: 0,
    },
    {
      title: "Erstellt eure Projekträume",
      text: "Als eingetragene Organisation könnt ihr Projekträume für eure Vorhaben erstellen",
      img: WorkTogether,
      id: 1,
    },
    {
      title: "Informiert",
      text: "Fügt Beschreibungen, Kontakdaten und FAQs hinzu, um Interessierte zu informieren",
      img: OpenBook,
      id: 2,
    },
  ],
};
