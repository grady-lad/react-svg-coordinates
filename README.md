# react-svg-coordinates

A React component that provides functions to allow you to easily calculate x & y coordinates for each item in a given dataset to display on a SVG. See [here][example-site] for some examples

## What is this?

This library aims to help you map your dataset for an SVG over the SVG coordinate system, common usescase's of this would be creating a chart using SVG such as a line-chart or area-chart.

There are a lot of out of the box charting solutions which help you create a basic graph in no time, but these charts are hard to extend when you want to introduce some custom functionality.

react-svg-coordinates provides you the functionality to calculate the SVG coordinates of each item in your dataset, giving you full control when composing your own SVG charts.

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save react-svg-coordinates
```

> This package also depends on `react` and `prop-types`. Please make sure you
> have those installed.

## Usage
[![codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/13lnlm6r74)

```javascript
import { SvgCoords } from 'react-svg-coordinates';

// Our data
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
  x: idx, // where the item will be displayed along the x axis of the SVG (usually linear e.g 1,2,3,...10)
  y: item.age, // where the item will be displayed along the y axis of the SVG
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
    viewBoxHeight={500}
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

The data for which we want to calculate SVG co-ordinates for.

Each item in the array can be of any shape. But MUST contain a `x` and `y` prop.

The `x` props is the value where the item will appear along the x-axis (this is usually linear E.G index where item appears in the array).

The `y` props is the value where the item will appear along the y-axis.

### viewBoxWidth
 > number | defaults to 0

 Must be the same value as the width attribute used in the viewbox property of the targeted SVG.

### viewBoxHeight

> number | defaults to 0

 Must be the same value as the height attribute used in the viewbox property of the targeted SVG.

### yAxisArea

> number | defaults to 0

 If defined the yAxis will have a width of the value passed, allowing you to render labels.

### xAxisArea

> number | defaults to 0

If defined the xAxis will have a height of the value passed, allowing you to render labels.

## Render Prop Function

This is where you can render your SVG, the render prop function contains one parameter which is an object containing various functions which can help you calculate SVG coordinates for your dataset.

### Summary of render props parameter object.
| property | type               | description                                                        |
|--------- |------------------- |------------------------------------------------------------------- |
| getMinX  | `function()`       | Returns an item in the dataset with the smallest `x` value         |
| getMaxX  | `function()`       | Returns the item in the dataset with the largest `x` value         |
| getMinY  | `function()`       | Returns an item in the dataset with the smallest `y` value         |
| getMaxY  | `function()`       | Returns an item in the dataset with the largest `y` value          |
| getSvgX  | `function(number)` | Returns the SVG x coordinate for the number passed to the function |
| getSvgY  | `function(number)` | Returns the SVG y coordinate for the number passed to the function |

## Using as a HOC

The lib can also be used a HOC to use the HOC please import `SvgCoordsHOC` from the library.

## Examples

Basic examples can be found in `/example` or [here][example-site]

An example of a production app using the lib can be found at [carbondoomsday](http://www.carbondoomsday.com/).

Repo for the production app can be found [here](https://github.com/giving-a-fuck-about-climate-change/carbon-inferno)

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[example-site]: https://grady-lad.github.io/react-svg-coordinates/
