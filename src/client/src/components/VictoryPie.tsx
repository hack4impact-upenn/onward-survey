import React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryGroup,
  VictoryPie,
  VictoryLegend,
} from 'victory';

const VictoryPieGraph = (props: any) => {
  return (
    <svg width={1000} height={750}>
      <VictoryLabel
        text={props.question}
        x={450}
        y={20}
        textAnchor="middle"
        style={{ fontSize: 30 }}
      />
      <br />
      <VictoryLabel
        text={props.description}
        x={450}
        y={60}
        textAnchor="middle"
        style={{ fontSize: 20 }}
      />
      <br />
      <VictoryLegend
        standalone={false}
        x={80}
        y={110}
        gutter={20}
        colorScale={[
          '#00D898',
          '#00AADE',
          '#FFC02D',
          '#42426F',
          '#878787',
          '#000000',
          '#039BE5',
          '#0288D1',
          '#0277BD',
          '#01579B',
        ]}
        orientation={props.oriented}
        itemsPerRow={props.numItemsInRow}
        title="Legend"
        centerTitle
        style={{
          border: { stroke: 'black' },
          title: { fontSize: 20 },
          labels: { fontSize: 20 },
        }}
        symbolSpacer={15}
        data={props.legend}
      />
      <VictoryPie
        standalone={false}
        data={props.data}
        colorScale={[
          '#00D898',
          '#00AADE',
          '#FFC02D',
          '#42426F',
          '#878787',
          '#000000',
          '#039BE5',
          '#0288D1',
          '#0277BD',
          '#01579B',
        ]}
        labels={({ datum }) =>
          datum.y != 0
            ? `${datum.y} (${((datum.y / props.totalAnswers) * 100).toFixed(
                1
              )}%)`
            : ''
        }
        labelRadius={90}
        style={{
          data: {
            fillOpacity: 0.9,
            stroke: 'white',
            strokeWidth: 3,
          },
          labels: {
            fontSize: 20,
            fill: 'white',
            padding: 5,
          },
        }}
        width={650}
        height={650}
        padding={{
          left: 280,
          bottom: 5,
          top: 50 + (90 * props.data.length) / props.numItemsInRow,
        }}
      />
    </svg>
  );
};

export default VictoryPieGraph;
