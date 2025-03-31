import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {coinsList, options, totalCoinsList} from "../../services/coinsApi.js";
import Table from "../modules/Table.jsx";
import Search from "../modules/search.jsx";


function Home() {
    const [coins, setCoins] = useState([]);
    const [load, setIsLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currency, setCurrency] = useState("usd");
    const itemsPerPage = 10;

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoad(true);
            try {
                const totalRes = await fetch(totalCoinsList(currency), options);
                if (!totalRes.ok) {
                    throw new Error(`HTTP Error! Status: ${totalRes.status}`);
                }
                const totalData = await totalRes.json();
                const totalPageCount = Math.ceil(totalData.length / itemsPerPage);
                setTotalPages(totalPageCount);

                const coinsRes = await fetch(coinsList(itemsPerPage, currentPage, currency), options);
                if (!coinsRes.ok) {
                    throw new Error(`HTTP Error! Status: ${coinsRes.status}`);
                }
                const coinsData = await coinsRes.json();
                setCoins(coinsData);
                setIsLoad(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoad(false);
            }
        };

        fetchData();
    }, [currentPage, currency]);

    return (
        <div className="flex flex-col h-[630px] w-full sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto overflow-y-auto">
            <Search currency={currency} setCurrency={setCurrency}/>
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
                pageClassName="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md transition duration-300 hover:bg-blue-500 hover:text-white hover:shadow-md cursor-pointer"
                activeClassName="bg-blue-600 text-white font-bold shadow-lg"
                previousClassName="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md transition duration-300 hover:bg-gray-300 hover:shadow-md cursor-pointer"
                nextClassName="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md transition duration-300 hover:bg-gray-300 hover:shadow-md cursor-pointer"
                breakClassName="flex justify-center items-center px-4 py-2 text-gray-500 cursor-pointer"
                pageLinkClassName="w-full h-full flex justify-center items-center"
            />


        </div>


    );
}

export default Home;
