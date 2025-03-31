import React, {useEffect, useState} from 'react';
import {chartList, options} from "../../services/coinsApi.js";

function Chart({setModalIsOpen, coinId, currency}) {
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const fetchCharData = async () => {
            try {
                const totalRes = await fetch(chartList(coinId, currency), options);
                if (!totalRes.ok) {
                    throw new Error(`HTTP Error! Status: ${totalRes.status}`);
                }
                const totalData = await totalRes.json();
                console.log("ss", totalData);
                setChartData(totalData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCharData();


    }, [coinId, currency])
    return (<div>

            <h2 className="text-lg font-semibold mb-3">مدال React Modal</h2>
            <p className="text-gray-700">این یک مدال ساده است!</p>
            <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => setModalIsOpen(false)}
            >
                بستن
            </button>

        </div>);
}

export default Chart;
