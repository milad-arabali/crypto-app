import React from 'react';

function Table({coins}) {
    console.log("ddd", coins);
    return (
        <div className="overflow-y-auto max-h-[640px]">
            <table className="min-w-full table-auto border-collapse relative">
                <thead className="bg-white bg-opacity-20 backdrop-blur-lg sticky top-0 z-20 shadow-xl rounded-t-lg">
                <tr className="text-left">
                    <th className="px-4 py-2">Coins</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Current Price</th>
                    <th className="px-4 py-2">24h Change</th>
                    <th className="px-4 py-2">Total Volume</th>
                </tr>
                </thead>
                <tbody>
                {coins.map((coin) => (
                    <tr key={coin.id} className="hover:bg-gray-50 cursor-pointer">
                        <td className="px-4 py-2 border-b">
                            <div className="flex items-center space-x-2">
                                <img src={coin.image} alt={coin.name} width="30px" />
                                <span className="font-semibold">{coin.symbol.toUpperCase()}</span>
                            </div>
                        </td>
                        <td className="px-4 py-2 border-b">{coin.name}</td>
                        <td className="px-4 py-2 border-b text-right">${coin.current_price.toLocaleString()}</td>
                        <td className="px-4 py-2 border-b text-right">
                                <span className={coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}>
                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                </span>
                        </td>
                        <td className="px-4 py-2 border-b text-right">{coin.total_volume.toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;


