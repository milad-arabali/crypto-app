import React from 'react';
import {CirclesWithBar} from "react-loader-spinner";

function Table({coins, isLoading, setModalIsOpen, setCoinId}) {
    const coinIdHandler = (id) => {
        setCoinId(id);
        setModalIsOpen(true);
    }
    return (<div className="overflow-y-auto max-h-[640px]">{isLoading ? (

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

        ) : (<table className="min-w-full table-auto border-collapse relative">
                <thead className="bg-white bg-opacity-20 backdrop-blur-lg sticky top-0  shadow-xl rounded-t-lg">
                <tr className="text-center">
                    <th className="px-4 py-2">Coins</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Current Price</th>
                    <th className="px-4 py-2">24h Change</th>
                    <th className="px-4 py-2">Total Volume</th>
                </tr>
                </thead>
                <tbody>
                {coins.map((coin) => (<tr key={coin.id} className="hover:bg-gray-50 cursor-pointer text-center">
                        <td className="px-4 py-2 border-b">
                            <div className="flex items-center justify-center space-x-2"
                                 onClick={() => coinIdHandler(coin.id)}>
                                <img src={coin.image} alt={coin.name} width="30px"/>
                                <span className="font-semibold">{coin.symbol.toUpperCase()}</span>
                            </div>
                        </td>
                        <td className="px-4 py-2 border-b">{coin.name}</td>
                        <td className="px-4 py-2 border-b text-center">
                            ${coin.current_price.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 border-b text-center">
                    <span className={coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}>
                        {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                        </td>
                        <td className="px-4 py-2 border-b text-center">
                            {coin.total_volume.toLocaleString()}
                        </td>
                    </tr>))}
                </tbody>
            </table>


        )}

        </div>);
}

export default Table;


