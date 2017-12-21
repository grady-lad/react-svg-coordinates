import React from 'react';

export const XLabels = ({ data, getSvgX }) => (
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

export const YLabels = ({ data, getSvgY }) => {
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

