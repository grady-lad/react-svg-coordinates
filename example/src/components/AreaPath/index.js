import React from 'react';

const getMarkerTo = (getSvgX, getSvgY, data = [{}]) =>
  `M ${getSvgX(data[0].x)} ${getSvgY(data[0].y)}`;

const getLinePath = (getSvgX, getSvgY, data = [{}], markerTo = '') =>
  data.reduce(
    (pathString, point) =>
      `${pathString}L ${getSvgX(point.x)} ${getSvgY(point.y)} `,
    markerTo,
  );
const AreaPath = ({ data, coordFuncs }) => {
  const { getSvgX, getSvgY, getMaxX, getMinX, getMinY } = coordFuncs;
  // Where the line of the graph will start from
  const markerTo = getMarkerTo(getSvgX, getSvgY, data);
  // The actual line of the graph
  const linePath = getLinePath(getSvgX, getSvgY, data, markerTo);
  // We need to draw another path which which we can fill for the shaded area
  let shadedPath = linePath;
  shadedPath +=
    `L ${getSvgX(getMaxX().x)} ${getSvgY(getMinY().y)} ` +
    `L ${getSvgX(getMinX().x)} ${getSvgY(getMinY().y)} `;
  return (
    <g>
      <path className="areachart_area" d={shadedPath} />
      <path className="areachart_path" d={linePath} />
    </g>
  );
};
export default AreaPath;
