import React from 'react';

const Points = ({ data, getSvgX, getSvgY }) => (
  <g className="linechart_points">
    {data.map((point, i) => (
      <circle
        key={`linechart_point_${i}`}
        r={5}
        cx={getSvgX(point.x)}
        cy={getSvgY(point.y)}
        onClick={() => console.log(point.ppm)}
      />
    ))}
  </g>
);

export default Points;

