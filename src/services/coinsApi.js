const options = {
    method: 'GET', headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Y8hDy824aUD2ECtne9A14HqR'}
}
const coinsList = () => {
    return 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
}

export {coinsList, options};
