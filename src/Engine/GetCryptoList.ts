import CriptocurrencySynthesis from '../GlobalTypes/CriptocurrencySynthesis';
const axios = require('axios');

const getCryptoList = (searchKey :string) :Promise<Array<CriptocurrencySynthesis>>=> {
    let promise = axios.get(`https://api.coincap.io/v2/assets?search=${searchKey}`);
    return promise.then(x => x.data.data);
}

export default getCryptoList;
