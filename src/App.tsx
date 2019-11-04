import React, { Component } from 'react';
import './App.css';
import SearchCrypto from './Component/SearchCrypto/SearchCrypto';
import CryptoTabel from './Component/CryptoTabel/CryptoTabel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import CriptocurrencySynthesis from './GlobalTypes/CriptocurrencySynthesis';

interface AppState {
  cryptoInTabel :Array<CriptocurrencySynthesis>
};

class App extends Component <{}, AppState>{
  state = {
    cryptoInTabel: []
  }

  insertNewCrypto(newCrypto :CriptocurrencySynthesis) {
    this.setState({
      cryptoInTabel: [...this.state.cryptoInTabel, newCrypto]
    });
  }

  deleteCrypto(crypto :CriptocurrencySynthesis) {
    const purgedArray = this.state.cryptoInTabel.filter(x=>x!==crypto);
    this.setState({
      cryptoInTabel: purgedArray
    });
  }

  changeCryptoOrder(newOrder :CriptocurrencySynthesis) {
    this.setState({
      cryptoInTabel: [newOrder]
    });
  }

  changeCryptoPrice(newPricedCrypto :Array<CriptocurrencySynthesis>) {
    this.setState({
      cryptoInTabel: [...newPricedCrypto]
    })
  }

  render() {
    return (
      <div>
        <h1 id='title'>Cryptocurrency Portfolio</h1>
        <SearchCrypto onSent={content => this.insertNewCrypto(content)} cryptoInTabel={ this.state.cryptoInTabel } />
        <Container>
          <CryptoTabel cryptoInTabel={ this.state.cryptoInTabel } 
            cryptoOrder={newOrder=>this.changeCryptoOrder(newOrder)} 
            cryptoPrice={newPricedCrypto=>this.changeCryptoPrice(newPricedCrypto)}
            cryptoToDelete={crypto=>this.deleteCrypto(crypto)}
          />
        </Container>
      </div>
    );
  }
}

export default App;
