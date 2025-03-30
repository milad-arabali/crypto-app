import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {coinsList, options, totalCoinsList} from "../../services/coinsApi.js";
import Table from "../modules/Table.jsx";


function Home() {
    const [coins, setCoins] = useState([]);
    const [load, setIsLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const totalRes = await fetch(totalCoinsList(), options);
                if (!totalRes.ok) {
                    throw new Error(`HTTP Error! Status: ${totalRes.status}`);
                }
                const totalData = await totalRes.json();
                const totalPageCount = Math.ceil(totalData.length / itemsPerPage);
                setTotalPages(totalPageCount);

                const coinsRes = await fetch(coinsList(itemsPerPage, currentPage), options);
                if (!coinsRes.ok) {
                    throw new Error(`HTTP Error! Status: ${coinsRes.status}`);
                }
                const coinsData = await coinsRes.json();
                setCoins(coinsData);
                setIsLoad(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [currentPage]);

    return (
        <div className="flex flex-col h-[630px] w-full sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto overflow-y-auto">
            <Table coins={coins} isLoading={load}/>
            <ReactPaginate
                previousLabel={"قبلی"}
                nextLabel={"بعدی"}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName="flex justify-center space-x-2 mt-4"
                pageClassName="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 transition"
                pageLinkClassName="text-gray-700"
                activeClassName="bg-blue-500 text-white font-bold"
                previousClassName="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 transition"
                nextClassName="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 transition"
                breakClassName="px-4 py-2 text-gray-500"
            />
        </div>
    );
}

export default Home;
