import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './CryptoTabel.css'
import getCryptoPrice from '../../Engine/GetCryptoPrice';

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

interface CryptoTabelState { itemsList: Array<CriptocurrencySynthesis> };

class CryptoTabel extends Component <{ cryptoOrder, cryptoInTabel }, CryptoTabelState>{
    constructor(props) {
        super(props);
        this.state = {
            itemsList: this.props.cryptoInTabel
        }
    }

    insertCrypto(crypto) {
        const cryptoIndex = this.state.itemsList.indexOf(crypto);
        if (cryptoIndex !== -1) {
            this.setState({
                itemsList: [...this.state.itemsList, crypto]
            });
        }
    }

    getCryptoPrice(crypto) {
        this.insertCrypto(crypto);
        // console.log(this.state, 'state')
        let socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${crypto.id}`);
        console.log(this.state.itemsList, 'son')
        socket.onmessage = msg => {
            return;
            // if (cryptoIndex !== -1) {
                const cryptoIndex = this.state.itemsList.indexOf(crypto);
                // console.log(cryptoIndex, this.state.itemsList)
                let cryptoPryce;
                cryptoPryce = msg.data;
                // console.log(msg.data);
                const newItemList = [...this.state.itemsList];
                newItemList[cryptoIndex].priceUsd = cryptoPryce;
                this.setState({
                    itemsList: {...this.state.itemsList}
                });
            // }
        }
    }

    reorder(col: string) {
        getCryptoPrice(this.props.cryptoInTabel[0].id);
        this.props.cryptoInTabel.sort((a, b)=>{
            let ordered;
            a[col].toLowerCase()>b[col].toLowerCase() ? ordered=1 : ordered=-1;
            return ordered;
        });
        this.props.cryptoOrder(this.props.cryptoInTabel);
    }

    render(){
        return <Container>
            <Row className='first-row'>
                <Col className='first-col col-1'>
                    Rank<span className='arrow' onClick={()=>this.reorder('rank')} />
                </Col>
                <Col className='col'>Symbol<span className='arrow' onClick={()=>this.reorder('symbol')} /></Col>
                <Col className='col'>Name<span className='arrow' onClick={()=>this.reorder('name')} /></Col>
                <Col className='col'>Price<span className='arrow' onClick={()=>this.reorder('priceUsd')} /></Col>
                <Col className='col d-none d-md-block col-3'>Market Cap<span className='arrow' onClick={()=>this.reorder('marketCapUsd')} /></Col>
                <Col className='col d-none d-md-block col-2'>
                    24h Price Change<span className='arrow' onClick={()=>this.reorder('changePercent24Hr')} />
                </Col>
            </Row>
            {this.props.cryptoInTabel.map(element=>{
                return <Row key={element.id} className='row'>
                    {this.getCryptoPrice(element)}
                    <Col className='first-col col-1'>{element.rank}</Col>
                    <Col className='col'>{element.symbol}</Col>
                    <Col className='col'>{element.name}</Col>
                    <Col className='col'>{element.priceUsd}</Col>
                    <Col className='col d-none d-md-block col-3'>{element.marketCapUsd}</Col>
                    <Col className='col d-none d-md-block col-2'>{element.changePercent24Hr}</Col>
                </Row>
            })}
        </Container>
    }
}

export default CryptoTabel;
