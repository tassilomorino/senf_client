/** @format */

export const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export interface ChartItem {
  label: string;
  value: number;
}

export interface BarChartProps {
  dataList: ChartItem[];
  margin?: typeof defaultMargin;
  animate?: boolean;
}
