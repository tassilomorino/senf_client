import Pie from "@visx/shape/lib/shapes/Pie";
import { scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { PieChartProps, defaultMargin, ChartItem } from "./pieChart.types";

const frequency = (d: ChartItem) => d.value;

export default function PieChart({
  dataList,
  margin = defaultMargin,
}: PieChartProps) {
  const getLetterFrequencyColor = scaleOrdinal({
    domain: dataList.map((l) => l.label),
    range: [
      "rgba(93,30,91,1)",
      "rgba(93,30,91,0.8)",
      "rgba(93,30,91,0.6)",
      "rgba(93,30,91,0.4)",
    ],
  });
  return (
    <ParentSize>
      {({ width, height }) => {
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const radius = Math.min(innerWidth, innerHeight) / 2;
        const centerY = innerHeight / 2;
        const centerX = innerWidth / 2;
        const top = centerY + margin.top;
        const left = centerX + margin.left;
        const pieSortValues = (a, b) => b - a;

        const maxHeightVal = 1080;
        const maxHeight = Math.min(height, maxHeightVal);
        return (
          <svg
            width={width}
            height={maxHeight}
          >
            <Group
              top={top}
              left={left}
            >
              <Pie
                data={dataList}
                pieValue={frequency}
                pieSortValues={pieSortValues}
                outerRadius={radius}
              >
                {(pie) => {
                  return pie.arcs.map((arc, index) => {
                    const { label } = arc.data;
                    const [centroidX, centroidY] = pie.path.centroid(arc);
                    const hasSpaceForLabel =
                      arc.endAngle - arc.startAngle >= 0.1;
                    const arcPath = pie.path(arc) || undefined;
                    const arcFill = getLetterFrequencyColor(label);
                    return (
                      <g key={`arc-${label}-${index}`}>
                        <path
                          d={arcPath}
                          fill={arcFill}
                        />
                        {hasSpaceForLabel && (
                          <text
                            x={centroidX}
                            y={centroidY}
                            dy=".33em"
                            fill="#ffffff"
                            fontSize={22}
                            textAnchor="middle"
                            pointerEvents="none"
                          >
                            {arc.data.label}
                          </text>
                        )}
                      </g>
                    );
                  });
                }}
              </Pie>
            </Group>
          </svg>
        );
      }}
    </ParentSize>
  );
}
