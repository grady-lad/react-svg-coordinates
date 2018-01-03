# react-svg-coordfuncs

A React component that provides functions to allow you to easily calculate x & y coordinates for each item in a given dataset to display on a svg TODO Update

## What is this? / Motivation

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save react-svg-coordfuncs
```

> This package also depends on `react` and `prop-types`. Please make sure you
> have those installed.

## Usage

Play with the example below on [codesandbox](add url to code sandbox).

```javascript
import { SvgCoords } from 'react-svg-coordfuncs';

const ages = [
  { age: 12 },
  { age: 2 },
  { age: 34 },
  { age: 76 },
  { age: 41 },
  { age: 33 },
  { age: 90 },
  { age: 3 },
  { age: 45 },
];

/**
 * SvgCoords needs an array of objects where each item
 * must have a x and y property.
 *
 * We want to display age along the y axis so lets map age to y.
 */
const svgData = ages.map((item, idx) => ({
  x: idx, // where the item will be displayed along the x axis of the svg
  y: item.age, // where the item will be displayed along the y axis of the svg
  ...item,
}));

/*
* Returns a path component which is basically a line that
* is drawn between each point in the array.
*/
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

const BasicExample = () => (
  <SvgCoords
    viewBoxHeigth={500}
    viewBoxWidth={1000}
    data={svgData}
    render={({ getSvgX, getSvgY }) => (
      <svg width="100%" viewBox={'0 0 1000 500'}>
        <g>
          <Line data={svgData} getSvgX={getSvgX} getSvgY={getSvgY} />
        </g>
      </svg>
    )}
  />
);
```

## Props

### data

> array [{x: number, y: number}] | defaults to []

The data for which we want to calculate svg co-ordinates for.

Each item in the array can be of any shape. But MUST contain a `x` and `y` prop.

The `x` props is the value where the item will appear along the x-axis.

The `y` props is the value where the item will appear along the y-axis.

### viewBoxWidth
 > number | defaults to 0
 
 Must be the same value as the width attribute used in the targeted svg.

### viewBoxHeigth

> number | defaults to 0
 
 Must be the same value as the height attribute used in the targeted svg.

### topBottomPadding

> number | defaults to 0

 If defined every item will be rendered taking padding into place
 (Useful if you are using axis)

### sidesPadding

> number | defaults to 0

 If defined every item will be rendered taking padding into place
 (Useful if you are using axis)


## Render Prop Function

This is where you can render your svg, the render prop provides the following functions to help you calculate coordiantes
for your dataset. 

### getMinX
 
Returns the item in the dataset with the smallest `x` value

### getMaxX

Returns the item in the dataset with the largest `x` value

### getMinY

Returns the item in the dataset with the smallest `y` value

### getMaxY

Returns the item in the dataset with the largest `y` value

### getSvgX

Returns x coordinate for the given parameter

### getSvgY 

Returns y coordinate for the given parameter

## Examples

Basic examples can be found in `/example`.
