import type { Card } from "./Card";

export type List = {
  id: string;
  cards: Card[];
  timestamp: string;
  title: string;
}