import React from 'react';
import { LineChart, AreaChart, ScatterPlot } from './Charts/';

const App = () => (
  <div className="container-ex" style={{ textAlign: 'center' }}>
    <h1>React SVG Coordiante Functions</h1>
    <p> Write some introduction here</p>
    <section>
      <h2>Line Chart</h2>
      <div>
        <LineChart />
      </div>
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
      <div>
        <ScatterPlot />
      </div>
    </section>
  </div>
);

export default App;
