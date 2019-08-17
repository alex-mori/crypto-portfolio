import React, { Component } from 'react';
import './App.css';
import SearchCrypto from './Component/SearchCrypto/SearchCrypto';
import CryptoTabel from './Component/CryptoTabel/CryptoTabel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

interface AppState {
  cryptoInTabel: Array<any>
};

class App extends Component <{}, AppState>{
  state = {
    cryptoInTabel: []
  }

  insertNewCrypto(newCrypto :object) {
    this.setState({
      cryptoInTabel: [...this.state.cryptoInTabel, newCrypto]
    }, ()=>console.log(this.state.cryptoInTabel));
  }

  chengeCryptoOrder(newOrder :object) {
    console.log(newOrder);
    this.setState({
      cryptoInTabel: [newOrder]
    });
  }

  render() {
    return (
      <div>
        <h1 id='title'>Cryptocurrency Portfolio</h1>
        <SearchCrypto onSent={content => this.insertNewCrypto(content)} />
        <Container>
          <CryptoTabel cryptoInTabel={ this.state.cryptoInTabel } cryptoOrder={newOrder=>this.chengeCryptoOrder(newOrder)} />
        </Container>
      </div>
    );
  }
}

export default App;
