import React, {useEffect, useState} from 'react';
import {chartList, options} from "../../services/coinsApi.js";
import convertData from "../../helper/convertData.js";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

function Chart({setModalIsOpen, coinId, currency}) {
    const [chartData, setChartData] = useState([]);
    const [type, setType] = useState("prices");

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const totalRes = await fetch(chartList(coinId, currency), options);
                if (!totalRes.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                const data = await totalRes.json();
                const convertedData = convertData(data, type);
                setChartData(convertedData);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchChartData();
    }, [coinId, currency, type]);

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[80%] max-w-4xl h-[600px]">
                <h2 className="text-2xl font-semibold mb-5 text-center">chart coin</h2>


                <div className="flex justify-center mb-6">
                    <select
                        className="p-3 border rounded-lg w-52 text-gray-700 shadow-sm focus:ring focus:ring-blue-300"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="prices">prices</option>
                        <option value="market_caps">market_caps</option>
                        <option value="total_volumes">total_volumes</option>
                    </select>
                </div>

                <div className="w-full h-[300px] justify-center">
                    <ResponsiveContainer width="90%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 40,
                                left: 30,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis
                                dataKey="date"
                                tick={{fill: '#888', fontSize: 12}}
                                tickLine={{stroke: '#ddd', strokeWidth: 1}}
                                axisLine={{stroke: '#ddd', strokeWidth: 1}}
                                interval="preserveStartEnd"
                            />
                            <YAxis
                                domain={['auto', 'auto']}
                                tick={{fill: '#888', fontSize: 12}}
                                tickLine={{stroke: '#ddd', strokeWidth: 1}}
                                axisLine={{stroke: '#ddd', strokeWidth: 1}}
                                interval="preserveStartEnd"
                            />
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey={type} stroke="#8884d8" activeDot={{r: 8}}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>


                <div className="flex justify-center mt-8">
                    <button
                        className="px-7 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 shadow-lg"
                        onClick={() => setModalIsOpen(false)}
                    >
                        close
                    </button>
                </div>
            </div>
        </div>


    );
}

export default Chart;
