import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './CryptoTabel.css';
import CriptocurrencySynthesis from '../../GlobalTypes/CriptocurrencySynthesis';

interface CryptoTabelState { itemsList: Array<CriptocurrencySynthesis> };

class CryptoSocket {
    socket: WebSocket | null = null;
    
    open(cryptoInfos :CriptocurrencySynthesis[], callback :(msg: object) => void) {
        if(this.socket) {
            this.socket.close();
        }
        if(!cryptoInfos.length) return;
        const cryptoIdList = cryptoInfos.map(({id}) => id).join(',');
        const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${cryptoIdList}`);
        this.socket = socket;
        socket.onmessage = msg => {
            callback(msg);
        };
    }
}

class CryptoTabel extends Component <{ cryptoOrder, cryptoInTabel, cryptoPrice, cryptoToDelete }, CryptoTabelState>{

    socketManager :CryptoSocket = new CryptoSocket();
    
    sendCryptoToDelete(crypto: CriptocurrencySynthesis) {
        this.props.cryptoToDelete(crypto);
    }

    getPricelistner() {
        this.socketManager.open(this.props.cryptoInTabel, (msg :any)=> {
            const changes = JSON.parse(msg.data);
            const itemList = [...this.props.cryptoInTabel];
            Object.entries(changes).forEach(([cryptoCode, price]) => {
                const foundCrypto = itemList.find(crypto => crypto.id === cryptoCode);
                foundCrypto.priceUsd = price;
            });
            this.props.cryptoPrice(itemList);
        });
    }

    reorder(col: string) {
        this.props.cryptoInTabel.sort((a, b)=>{
            let ordered;
            a[col].toLowerCase()>b[col].toLowerCase() ? ordered=1 : ordered=-1;
            return ordered;
        });
        this.props.cryptoOrder(this.props.cryptoInTabel);
    }

    render(){
        this.getPricelistner();
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
                <Col className='col' />
            </Row>
            {this.props.cryptoInTabel.map(element=>{
                return <Row key={element.id} className='row'>
                    <Col className='first-col col-1'>{element.rank}</Col>
                    <Col className='col'>{element.symbol}</Col>
                    <Col className='col'>{element.name}</Col>
                    <Col className='col'>{element.priceUsd}</Col>
                    <Col className='col d-none d-md-block col-3'>{element.marketCapUsd}</Col>
                    <Col className='col d-none d-md-block col-2'>{element.changePercent24Hr}</Col>
                    <Col className='col'>
                        <button onClick={
                            ()=>{
                                this.sendCryptoToDelete(element);
                            }
                        }> X </button>
                    </Col>
                </Row>
            })}
        </Container>
    }
}

export default CryptoTabel;
