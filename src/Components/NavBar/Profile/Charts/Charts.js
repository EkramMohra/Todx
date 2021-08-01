import React from 'react';
import Todochart from './Todocharts'
import Timedchart from './Timedcharts'
import './Charts.css'


const Charts = () => {
    
    return (
        <div className="charts">
            <Todochart />
            <Timedchart />
        </div>
    );
};

export default Charts;