const getCryptoPrice = (cryptoName:string) => {
    let socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${cryptoName}`)
    socket.onmessage = msg => console.log(msg.data);
    return;
}

export default getCryptoPrice;
