import React, { Component } from 'react';
import getCryptoList from '../../Engine/GetCryptoList';
import Autocomplete from 'react-autocomplete';

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
interface SearchFormState { content: string, itemsList: Array<CriptocurrencySynthesis> };

class SearchForm extends Component <{ onSent }, SearchFormState> {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            itemsList: []
        }
    }

    selectItems(itemToSearch) {
        const context = this;
        getCryptoList(itemToSearch).then(items => {
            context.setState({
                content: itemToSearch,
                itemsList: items
            });
        });
    }

    sendValue(name) {
        const crypto = this.state.itemsList.find(el=>{
            return el.name===name
        });
        this.props.onSent(crypto);
    }

    render() {
        return <div>
            <Autocomplete
                getItemValue={item => item.name}
                items={this.state.itemsList}
                renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.id}>
                        {item.symbol} {item.name}
                    </div>
                }
                value={this.state.content}
                onChange={changeEvt => this.selectItems(changeEvt.target.value)}
                onSelect={val => this.sendValue(val)}
            />
        </div>
    }
}

export default SearchForm;
