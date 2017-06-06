import React from 'react';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const SimpleLineChart = (props) => {
    console.log(props.measurements);
    return (
        <ResponsiveContainer>
            <LineChart data={props.measurements}
                       margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                <XAxis dataKey="time"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line connectNulls={true} type="monotone" dataKey="value" stroke="#8884d8"/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SimpleLineChart;