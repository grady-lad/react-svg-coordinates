import React from 'react';
import { LineChart, AreaChart, ScatterPlot } from './Charts/';

const App = () => (
  <div>
    <div className="header-container">
      <h1 className="header">React SVG Coordinate Functions</h1>
      <p className="sub-header">
        A library that helps you map your data set on an svg
      </p>
    </div>
    <div className="container-ex" style={{ textAlign: 'center' }}>
      <section>
        <h2>Line Chart</h2>
        <LineChart />
        <div />
      </section>
      <section>
        <h2>Area Chart</h2>
        <div>
          <AreaChart />
        </div>
      </section>
      <section>
        <h2>Scatter Plot</h2>
        <div> View source enter github url here</div>
      </section>
    </div>
  </div>
);

export default App;
