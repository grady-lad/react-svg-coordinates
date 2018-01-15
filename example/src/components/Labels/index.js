import React from 'react';
import './labels.css';

export const XLabels = ({ labels, getSvgX }) => (
  <g>
    {labels.map(point => (
      <g
        key={`linechart_label_x_${point.x}`}
        className="linechart_label"
        transform={`translate(${getSvgX(point.x)}, 520)`}
      >
        <text
          className="label-font"
          transform="translate(0, 0)"
          textAnchor="middle"
        >
          {point.date}
        </text>
      </g>
    ))}
  </g>
);

export const YLabels = ({ labels, getSvgY }) => (
  <g>
    {labels.map(point => (
      <g
        key={`linechart_label_x_${point.y}`}
        className="linechart_label"
        transform={`translate(0, ${getSvgY(point.y)})`}
      >
        <text
          transform="translate(-10, 0)"
          textAnchor="middle"
          className="label-font"
        >
          {`${Math.round(point.y)} ppm `}
        </text>
      </g>
    ))}
  </g>
);
