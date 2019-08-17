const axios = require('axios');

type CriptocurrencySynthesis = {
    id: string,
    rank: number,
    symbol: string,
    name: string,
    supply: string,
    maxSupply: string,
    marketCapUsd: string,
    volumeUsd24Hr: string,
    priceUsd: string,
    changePercent24Hr: string,
    vwap24Hr: string
};

const getCryptoList = (searchKey :string) :Promise<Array<CriptocurrencySynthesis>>=> {
    let promise = axios.get(`https://api.coincap.io/v2/assets?search=${searchKey}`);
    return promise.then(x => x.data.data);
}

export default getCryptoList;
