import React from 'react';

const Line = ({ data, getSvgX, getSvgY }) => {
  const markerTo = `M ${getSvgX(data[0].x)} ${getSvgY(data[0].y)} `;
  const createLine = (d, mTo) =>
    d.reduce(
      (pathString, point) =>
        `${pathString}L ${getSvgX(point.x)} ${getSvgY(point.y)} `,
      mTo,
    );

  return (
    <path
      style={{
        strokeWidth: 2,
        fill: 'none',
        stroke: '#f3acb1',
      }}
      d={createLine(data, markerTo)}
    />
  );
};
export default Line;
