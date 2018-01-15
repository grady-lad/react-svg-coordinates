import React from 'react';
import { SvgCoords } from 'react-svg-coordfuncs';
import './scatterplot.css';
import { Axis, XLabels, YLabels } from '../../components';

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
const createSvgData = () => {
  const items = [];
  for (let i = 0; i <= 80; i++) {
    const randomInt = Math.random() * (40 - 1) + 1;
    items.push({
      x: i,
      y: randomInt,
      type: getType(i),
      label: i,
    });
  }
  return items;
};
const svgData = createSvgData();

const createLabels = (items = [], id) => {
  // we only want 6 labels so only sample when its greater than 6
  if (items.length > 0 && items.length >= 5) {
    const sampleRate = Math.round(items.length / 5); // calculate a 5th of the array
    let rate = sampleRate;
    const res = [items[0]];
    for (let i = 0; i <= 3; i++) {
      const item = items[rate];
      if (item) {
        res.push(items[rate]);
      }
      rate += sampleRate;
    }
    res.push(items[items.length - 1]);
    return res;
  }
  return items;
};

const yLabels = createLabels(svgData);

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
      yAxisArea={30}
      xAxisArea={30}
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
            <XLabels labels={yLabels} getSvgX={getSvgX} xLoc={500} />
            <YLabels
              labels={yLabels}
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
