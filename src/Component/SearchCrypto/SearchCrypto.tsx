import React, { Component } from 'react';
import getCryptoList from '../../Engine/GetCryptoList';
import Autocomplete from 'react-autocomplete';
import CriptocurrencySynthesis from '../../GlobalTypes/CriptocurrencySynthesis';

interface SearchFormState { content: string, itemsList: Array<CriptocurrencySynthesis> };

class SearchForm extends Component <{ onSent, cryptoInTabel }, SearchFormState> {
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
            const filteredItems = items.filter(item=>{
                const result = context.props.cryptoInTabel.some(element => {
                    console.log('ciao')
                    console.log(item.id, element.id)
                    // if (element.id === item.id) {
                    //     debugger
                    // }
                    return element.id !== item.id
                });
                // console.log(result);
                return result;
            });
            
            // const filteredItems = items.filter(item=>{
            //     return this.props.cryptoInTabel.indexOf(item) === -1;
            // });
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
