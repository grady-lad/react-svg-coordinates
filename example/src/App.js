import React from 'react';
import GithubCorner from 'react-github-corner';
import { LineChart, AreaChart } from './Charts/';

const App = () => (
  <div>
    <div className="header-container">
      <GithubCorner
        href="https://github.com/grady-lad/react-svg-coordinates"
        target="_blank"
        direction="right"
        bannerColor="#f3acb1"
        size="145"
      />
      <h1 className="header">React SVG Coordinate Functions</h1>
      <p className="sub-header">
        A library that helps you map your dataset on an SVG
      </p>
    </div>
    <div className="container-ex" style={{ textAlign: 'center' }}>
      <section>
        <h2>Line Chart</h2>
        <div className="source-view">
          View source{' '}
          <a href="https://github.com/grady-lad/react-svg-coordinates/blob/master/example/src/Charts/LineChart/index.js">
            here
          </a>
        </div>
        <LineChart />
        <div />
      </section>
      <section>
        <h2>Area Chart</h2>
        <div className="source-view">
          View source{' '}
          <a href="https://github.com/grady-lad/react-svg-coordinates/blob/master/example/src/Charts/AreaChart/index.js">
            here
          </a>
        </div>
        <div>
          <AreaChart />
        </div>
      </section>
    </div>
  </div>
);

export default App;
