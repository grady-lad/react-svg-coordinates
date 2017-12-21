import React from 'react';
import { SvgCoords } from 'react-svg-coordfuncs';

import './areachart.css';

import { Axis, AreaPath, Points } from '../../components';

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

const XLabels = ({ data, getSvgX }) => (
  <g>
    {data.map(point => (
      <g
        key={`linechart_label_x_${point.x}`}
        className="linechart_label"
        transform={`translate(${getSvgX(point.x)}, 520)`}
      >
        <text transform="translate(0, 0)" textAnchor="middle">
          {point.date}
        </text>
      </g>
    ))}
  </g>
);

const YLabels = ({ data, getSvgY }) => {
  const labels = [];
  for (let i = 0; i <= 10; i++) {
    labels.push({
      y: 400 + i,
    });
  }
  return (
    <g>
      {labels.reverse().map(point => (
        <g
          key={`linechart_label_x_${point.y}`}
          className="linechart_label"
          transform={`translate(0, ${getSvgY(point.y)})`}
        >
          <text transform="translate(-10, 0)" textAnchor="middle">
            {`${Math.round(point.y)} ppm `}
          </text>
        </g>
      ))}
    </g>
  );
};

const LineChart = () => (
  <div className="graph-container">
    <SvgCoords
      topBottomPadding={30}
      sidesPadding={30}
      viewBoxHeigth={500}
      viewBoxWidth={1000}
      data={svgData}
      render={({ getMinX, getMaxX, getMinY, getMaxY, getSvgX, getSvgY }) => (
        <svg
          style={{ padding: '50px' }}
          className="linechart"
          width="100%"
          viewBox={'0 0 1000 500'}
          data-ident="ident-ppm-chart"
          preserveAspectRatio="none"
        >
          <g>
            <XLabels data={svgData} getSvgX={getSvgX} getSvgY={getSvgY} />
            <YLabels data={svgData} getSvgY={getSvgY} />
            <Axis
              X={{ minX: getMinX(), maxX: getMaxX() }}
              Y={{ minY: getMinY(), maxY: getMaxY() }}
              getSvgX={getSvgX}
              getSvgY={getSvgY}
            />
            <AreaPath
              data={svgData}
              coordFuncs={{
                getMinX,
                getMaxX,
                getMinY,
                getMaxY,
                getSvgX,
                getSvgY,
              }}
            />
            <Points data={svgData} getSvgX={getSvgX} getSvgY={getSvgY} />
          </g>
        </svg>
      )}
    />
  </div>
);

export default LineChart;
