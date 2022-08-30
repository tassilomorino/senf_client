import React, { memo } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartsProps } from './Charts.types';



const SimpleBarChart: FC<ChartsProps> = ({ data, direction = "horizontal", stacked = true }) => {
    return (
        <div style={{ width: "50vw", height: "20vh" }}>
            <ResponsiveContainer width="99%" aspect={1}>
                <BarChart
                    width={600}
                    height={300}
                    data={data}
                    layout={direction === "horizontal" ? "vertical" : "horizontal"}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    {direction === 'horizontal' ? <XAxis type="number" /> : <XAxis type="category" dataKey="name" />}
                    {direction === 'horizontal' ? <YAxis type="category" dataKey="name" /> : <YAxis type="number" />}


                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey="rad" stackId={stacked && "a"} fill="#8884d8" />
                    <Bar dataKey="verkehr" stackId={stacked && "a"} fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default memo(SimpleBarChart);

