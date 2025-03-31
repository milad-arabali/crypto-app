import React, {useEffect, useState} from 'react';
import {options, searchCoinsList} from "../../services/coinsApi.js";
import {CirclesWithBar} from "react-loader-spinner";


function Search({currency, setCurrency}) {
    const [searchText, setSearchText] = useState("");
    const [searchCoinList, setSearchCoinList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (!searchText) {
            setSearchCoinList([]);
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        const search = async () => {
            try {
                const response = await fetch(searchCoinsList(searchText), {...options, signal});
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }

                const data = await response.json();
                setIsLoading(false);
                setSearchCoinList(data.coins || []);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Error fetching search results:", error);
                }
            }
        };
        setIsLoading(true);
        search();

        return () => controller.abort();
    }, [searchText]);

    return (
        <div className="relative flex flex-col sm:w-[300px] md:w-[400px]
         gap-2 p-2 rounded-lg text-white ">
            <div className="flex items-center gap-2">
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    placeholder="Search Coin..."
                    type="text"
                    className="p-1 text-gray-900 bg-white rounded-md border border-gray-300
                    focus:ring-1 focus:ring-blue-500 focus:outline-none w-[300px]"
                />

                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="p-1 text-gray-900 bg-white rounded-md border border-gray-300
                    focus:ring-1 focus:ring-blue-500 focus:outline-none w-20"
                >
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="jpy">JPY</option>
                </select>
            </div>

            {isLoading ? (
                <div className="absolute top-full left-0 w-full bg-white text-gray-900 rounded-md border z-50
            border-gray-300 mt-1 p-2 max-h-40 overflow-y-auto shadow-lg sm:w-[300px] md:w-[400px]">
                    <div className="flex items-center justify-center">
                        <CirclesWithBar
                            height="100"
                            width="100"
                            color="#4fa94d"
                            outerCircleColor="#4fa94d"
                            innerCircleColor="#4fa94d"
                            barColor="#4fa94d"
                            ariaLabel="circles-with-bar-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                </div>
            ) : (
                searchCoinList.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white text-gray-900 rounded-md border z-50
                border-gray-300 mt-1 p-2 max-h-40 overflow-y-auto shadow-lg sm:w-[300px] md:w-[400px]">
                        {searchCoinList.map((coin) => (
                            <div key={coin.id} className="flex items-center gap-2 p-1 border-b last:border-none">
                                <img src={coin.thumb} alt={coin.name} className="w-6 h-6 rounded-full"/>
                                <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}


export default Search;



