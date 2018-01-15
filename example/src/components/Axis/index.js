import React from 'react';

const Axis = ({ X, Y, getSvgY, getSvgX }) => {
  const { minX: { x: minX }, maxX: { x: maxX } } = X;
  const { minY: { y: minY }, maxY: { y: maxY } } = Y;
  return (
    <g
      style={{
        stroke: '#17202A',
        strokeWidth: '1',
      }}
    >
      <line
        x1={getSvgX(minX)}
        y1={getSvgY(minY)}
        x2={getSvgX(maxX)}
        y2={getSvgY(minY)}
      />
      <line
        x1={getSvgX(minX)}
        y1={getSvgY(minY)}
        x2={getSvgX(minX)}
        y2={getSvgY(maxY)}
      />
    </g>
  );
};

export default Axis;
