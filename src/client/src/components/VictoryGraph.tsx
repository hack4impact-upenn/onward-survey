import React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryGroup,
} from 'victory';

const VictoryGraph = (props: any) => {
  return (
    <div>
      <VictoryChart
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        padding={{ left: props.textLength, top: 50, right: 10, bottom: 50 }}
        domainPadding={{ x: 15 }}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          style={{
            axis: { stroke: '#756f6a' },
            ticks: { stroke: 'grey', size: 2 },
            tickLabels: { fontSize: 8, padding: 0 },
          }}
          tickValues={Array.from(props.keys)}
          tickFormat={Array.from(props.keys)}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          style={{
            axis: { stroke: '#756f6a' },
            axisLabel: { fontSize: 20, padding: 1 },
            grid: { stroke: '#756f6a', strokeWidth: 0.25 },
            ticks: { stroke: 'grey', size: 5 },
            tickLabels: { fontSize: 11, padding: 5 },
          }}
        />
        <VictoryLabel
          text={props.question}
          x={245}
          y={20}
          textAnchor="middle"
          style={{ fontSize: 16 }}
        />
        <VictoryLabel
          text={props.description}
          x={245}
          y={35}
          textAnchor="middle"
          style={{ fontSize: 10 }}
        />
        <VictoryBar
          horizontal
          data={props.data}
          x="x"
          y="y"
          labels={({ datum }) => (datum.y == 0 ? '' : datum.y)}
          labelComponent={
            <VictoryLabel style={{ fontSize: 8, fill: 'white' }} dx={-10} />
          }
          style={{
            data: { fill: '#00AADE' },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default VictoryGraph;
