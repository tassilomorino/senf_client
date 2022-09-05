import Weg from "../assets/surfaces/weg.png";
import Img57 from "../assets/surfaces/57.png";

export const Grounds = [
  {
    objectId: 0,
    title: "Radweg",
    objectType: "Grounds",
    imgUrl: Weg,
    drawType: "draw_line_string",
    drawStyle: { lineColor: "pink", lineWidth: [5, 20], lineDash: [1, 1] },
  },
  {
    objectId: 0,
    title: "Zebrastreifen",
    objectType: "Grounds",
    imgUrl: Weg,
    drawType: "draw_line_string",
    drawStyle: {
      lineColor: "white",
      lineWidth: 5,
      linePattern: "CrosswalkPattern",
      lineDash: [0.1, 0.2],
    },
  },
  {
    objectId: 1,
    title: "Wiese",
    objectType: "Grounds",
    imgUrl: Img57,
    drawType: "polygon",
  },
  {
    objectId: 1,
    title: "Wiese",
    objectType: "Grounds",
    imgUrl: Img57,
  },
  {
    objectId: 1,
    title: "Wiese",
    objectType: "Grounds",
    imgUrl: Img57,
  },
  {
    objectId: 1,
    title: "Wiese",
    objectType: "Grounds",
    imgUrl: Img57,
  },
];
