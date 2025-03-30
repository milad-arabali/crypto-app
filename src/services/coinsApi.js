const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-Y8hDy824aUD2ECtne9A14HqR",
    },
};


const coinsList = (itemsPerPage, currentPage) => {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${itemsPerPage}&page=${currentPage}`;
};

const totalCoinsList = () => {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`;
};

export {coinsList,totalCoinsList, options};
