import { AxisBottom, AxisLeft } from "@visx/axis";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { GradientTealBlue } from "@visx/gradient";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { scaleBand, scaleLinear } from "@visx/scale";
import { BarChartProps, ChartItem } from "./barChart.types";

export function BarChart({ dataList }: BarChartProps) {
  // accessors
  const getLetter = (d: ChartItem) => d.label;
  const getLetterFrequency = (d: ChartItem) => Number(d.value);

  const verticalMargin = 120;
  const margins = {
    left: 30,
  };

  return (
    <ParentSize>
      {({ width, height }) => {
        const maxHeightVal = 1080;
        const maxHeight = Math.min(height, maxHeightVal);
        // bounds
        const xMax = width - margins.left;
        const yMax = height - verticalMargin;

        // scales, memoize for performance
        const xScale = scaleBand<string>({
          range: [0, xMax],
          round: true,
          domain: dataList.map(getLetter),
          padding: 0.4,
        });

        const yScale = scaleLinear<number>({
          range: [yMax, 0],
          round: true,
          domain: [0, Math.max(...dataList.map(getLetterFrequency))],
        });
        return width < 10 ? null : (
          <svg
            width={width}
            height={maxHeight}
          >
            <GradientTealBlue id="teal" />
            <rect
              width={width}
              height={height}
              fill="url(#teal)"
              rx={14}
            />
            <Group
              top={verticalMargin / 2}
              left={margins.left}
            >
              {dataList.map((d) => {
                const letter = getLetter(d);
                const barWidth = xScale.bandwidth();
                const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0);
                const barX = xScale(letter);
                const barY = yMax - barHeight;
                return (
                  <Bar
                    key={`bar-${letter}`}
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill="rgba(23, 233, 217, .5)"
                  />
                );
              })}
              <AxisBottom
                numTicks={dataList.length}
                top={yMax}
                scale={xScale}
                tickLabelProps={() => ({
                  fill: "#ffeb3b",
                  fontSize: 11,
                  textAnchor: "middle",
                })}
              />
              <AxisLeft
                scale={yScale.nice()}
                numTicks={10}
                top={0}
                tickLabelProps={(e) => ({
                  fill: "#ffeb3b",
                  fontSize: 10,
                  textAnchor: "end",
                  x: -12,
                  y: (yScale(e) ?? 0) + 3,
                })}
              />
            </Group>
          </svg>
        );
      }}
    </ParentSize>
  );
}
