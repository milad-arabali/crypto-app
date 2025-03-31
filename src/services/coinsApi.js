const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-Y8hDy824aUD2ECtne9A14HqR",
    },
};


const coinsList = (itemsPerPage, currentPage, currency) => {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=${itemsPerPage}&page=${currentPage}`;
};

const totalCoinsList = (currency) => {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`;
};
const searchCoinsList = (query) => {
    return `https://api.coingecko.com/api/v3/search?query=${query}`;
};

const chartList = (id, currency) => {
    return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=7`;
};


export {coinsList, totalCoinsList, searchCoinsList, chartList, options};
