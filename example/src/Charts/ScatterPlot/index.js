import React from 'react';
import { SvgCoords } from 'react-svg-coordfuncs';
import './scatterplot.css';
import { Axis } from '../../components';

const svgData = [];
const getType = (idx) => {
  if (idx % 2 === 0) {
    return 'blue';
  }
  if (idx % 5 === 0) {
    return 'green';
  }
  if (idx % 3 === 0) {
    return 'red';
  }
  return 'orange';
};

for (let i = 0; i <= 80; i++) {
  const randomInt = Math.random() * (40 - 1) + 1;
  svgData.push({
    x: i,
    y: randomInt,
    type: getType(i),
    label: i,
  });
}

const XLabels = ({ data, getSvgX, xLoc }) => {
  const initSample = Math.round(data.length / 5);
  const labels = [];
  labels.push(data[0]);
  for (let i = initSample; i <= data.length; i += initSample) {
    labels.push(data[i]);
  }
  return (
    <g>
      {labels.map(point => (
        <g
          key={`linechart_label_x_${point.x}`}
          className="linechart_label"
          transform={`translate(${getSvgX(point.x)}, ${xLoc})`}
        >
          <text transform="translate(0, 0)" textAnchor="middle">
            {point.label}
          </text>
        </g>
      ))}
    </g>
  );
};

const YLabels = ({ data, getSvgY, Y }) => {
  const { minY, maxY } = Y;
  const initSample = Math.round(40 / 4);
  const labels = [];
  // Sort this data it will be easier
  labels.push(minY);
  for (let i = initSample; i <= 40; i += initSample) {
    labels.push({
      ...data[i],
      y: i,
    });
  }
  labels.push(maxY); // TODO: Remove duplicates
  return (
    <g>
      {labels.reverse().map(point => (
        <g
          key={`linechart_label_x_${point.y}`}
          className="linechart_label"
          transform={`translate(0, ${getSvgY(point.y)})`}
        >
          <text transform="translate(0, 0)" textAnchor="middle">
            {Math.round(point.y)}
          </text>
        </g>
      ))}
    </g>
  );
};

const Points = ({ data, getSvgX, getSvgY }) => (
  <g className="linechart_points">
    {data.map((point, i) => (
      <circle
        className={point.type}
        key={`linechart_point_${i}`}
        r={5}
        cx={getSvgX(point.x)}
        cy={getSvgY(point.y)}
        onClick={() => console.log(point.y)}
      />
    ))}
  </g>
);

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
            <XLabels data={svgData} getSvgX={getSvgX} xLoc={500} />
            <YLabels
              data={svgData}
              getSvgY={getSvgY}
              xLoc={500}
              Y={{ minY: getMinY(), maxY: getMaxY() }}
            />

            <Axis
              X={{ minX: getMinX(), maxX: getMaxX() }}
              Y={{ minY: getMinY(), maxY: getMaxY() }}
              getSvgX={getSvgX}
              getSvgY={getSvgY}
            />
            <Points data={svgData} getSvgX={getSvgX} getSvgY={getSvgY} />
          </g>
        </svg>
      )}
    />
  </div>
);

export default LineChart;
