import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const VictoryGraph = (props: any) => {
  return (
    <div>
      <br />
      <p>Question {props.question}</p>
      <VictoryChart
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={20}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={Array.from(props.keys)}
          tickFormat={Array.from(props.keys)}
        />
        {
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(y) => `${y}`}
          />
        }
        <VictoryBar data={props.data} x="x" y="y" />
      </VictoryChart>
    </div>
  );
};

export default VictoryGraph;
