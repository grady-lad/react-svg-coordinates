import React from 'react';
import { SvgCoords } from 'react-svg-coordfuncs';

import { Axis, Line, Points, XLabels, YLabels } from '../../components';

const graphData = [
  {
    ppm: 407.73,
    date: '2017-06-19',
  },
  {
    ppm: 402.31,
    date: '2017-06-20',
  },
  {
    ppm: 409.15,
    date: '2017-06-22',
  },
  {
    ppm: 400,
    date: '2017-06-23',
  },
  {
    ppm: 410,
    date: '2017-06-26',
  },
  {
    ppm: 407,
    date: '2017-06-27',
  },
  {
    ppm: 408.1,
    date: '2017-06-29',
  },
];

const svgData = graphData.map((item, idx) => ({
  x: idx,
  y: item.ppm,
  ...item,
}));

const labels = [];
for (let i = 0; i <= 10; i++) {
  labels.push({
    y: 400 + i,
  });
}

const LineChart = () => (
  <div className="graph-container">
    <SvgCoords
      yAxisArea={50}
      xAxisArea={30}
      viewBoxHeigth={500}
      viewBoxWidth={1000}
      data={svgData}
      render={({ getMinX, getMaxX, getMinY, getMaxY, getSvgX, getSvgY }) => (
        <svg
          className="linechart"
          width="100%"
          viewBox={'0 0 1000 500'}
          data-ident="ident-ppm-chart"
          preserveAspectRatio="none"
          overflow="visible"
        >
          <g>
            <XLabels labels={svgData} getSvgX={getSvgX} getSvgY={getSvgY} />
            <YLabels labels={labels} getSvgY={getSvgY} />
            <Axis
              X={{ minX: getMinX(), maxX: getMaxX() }}
              Y={{ minY: getMinY(), maxY: getMaxY() }}
              getSvgX={getSvgX}
              getSvgY={getSvgY}
            />
            <Line data={svgData} getSvgX={getSvgX} getSvgY={getSvgY} />
            <Points data={svgData} getSvgX={getSvgX} getSvgY={getSvgY} />
          </g>
        </svg>
      )}
    />
  </div>
);

export default LineChart;
