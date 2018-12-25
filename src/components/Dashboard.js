import React, { Component } from 'react'
import ListItem from './ListItem';
import addButton from '../image/plus.png';
import uuid from 'uuid';

export default class Dashboard extends Component {
    state = {
        list: [
            {
                product: 'testing',
                price: 10,
                quantity: 1,
                id: uuid()
            }
        ],
        search: '',
        input: '',
        priceInput: '',
        total: 0,
        quantity: 1,
        toggle: false
    };
    getTotal = (list) => {
        var totalPrice = 0
        for (let i = 0;i < list.length; i++) {
            totalPrice += parseFloat(list[i].price * list[i].quantity)
        }
        this.setState({
            total: totalPrice
        })
    }
    plusTotal = (price) => {
        this.setState({
            total: this.state.total + price
        })
    }
    minusTotal = (price) => {
        this.setState({
            total: this.state.total - price
        })
    }
    onInputChange = (e) => (
        this.setState({
            input: e.target.value
        })
    );
    onPriceInputChange = (e) => {
        var input = e.target.value
        if (input.match(/^\d*(\.\d{0,1})?\d$/))
        {   
            this.setState({
                priceInput: input
            })
        }
        if (input === "") {
            this.setState({
                priceInput: ""
            })
        }
    }
    onQuantityInputChange = (e) => (
        this.setState({
            quantity: parseFloat(e.target.value)
        })
    )
    onInputSubmit = (items) => {
        console.log(items)
        var list = items
        var input = this.state.input
        var priceInput = parseFloat(this.state.priceInput)
        var quantity = this.state.quantity
        list.unshift({
            product: input,
            price: priceInput,
            quantity: quantity,
            id: uuid()
        })
        this.setState({
            list: list,
            input: '',
            priceInput: ''
        })
        this.plusTotal(priceInput * quantity);
    };
    onDeleteClick = (item) => {
        this.setState({
            list: this.state.list.filter(del =>(
                del.id !== item.id
            ))
        })
        console.log("deleting! " + item.id);
        var price = parseFloat(item.price * item.quantity)
        this.minusTotal(price)
    }
    onEditSubmit = (edit) => {
        console.log(edit)
        this.setState({
            list: this.state.list.map((item) => {
                if (item.id === edit.id) {
                    return Object.assign({}, item, {
                        product: edit.product,
                        price: edit.price,
                        quantity: edit.quantity
                      })
                } else {
                    return item
                }
            })
        })
    }
    onToggleClick = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    onItemToggleClick = () => {
        var newList = this.state.list
        newList.unshift({
            product: 'new',
            price: 10,
            quantity: 1,
            id: uuid()
        })
        this.setState({
            list: newList,
            total: this.state.total + 10
        })
    }
    onSearchChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    componentDidMount = () => {
      this.getTotal(this.state.list)
    }
    componentDidUpdate = (prevProps, prevState) => {
      console.log('updated')
    }
    
    
  render() {
    const searchTerm = this.state.search
    const showList = this.state.list.filter((item) => {
        if (item.product.includes(searchTerm.toLowerCase())) {
            return item
        }
    })
    return (
      <div className="dashboard">
        <h1 className="heading">Shopping List</h1>
        <h2 className="total-price">Total Price: $ {this.state.total} </h2>
        <h2 className="total-price">Total items:  {this.state.list.length} </h2>
        <input className="small-text" placeholder="Search" value={this.state.search} onChange={this.onSearchChange}></input>
        {
        this.state.toggle ? 
        <button className="total-price" onClick={this.onToggleClick}>↓</button>
        :
        <button className="total-price" onClick={this.onToggleClick}>↑</button>
        }
        <button className="btn--add" onClick={() => this.onItemToggleClick()}>
            <img src={addButton}></img>
        </button>
        {
        !this.state.toggle &&
        <div>
            <div className="itemlist">
            {showList.map(({product, price, quantity, id}) => (
                <ListItem
                product={product}
                price={price}
                quantity={quantity}
                id={id}
                onDeleteClick={this.onDeleteClick}
                onInputSubmit={this.onInputSubmit}
                onInputChange={this.onInputChange}
                onPriceInputChange={this.onPriceInputChange}
                onQuantityInputChange={this.onQuantityInputChange}
                onEditSubmit={this.onEditSubmit}
                />
            ))}
            </div>
                {/* <input 
                className="small-text"
                type="text" 
                placeholder="What do you want to buy?" 
                value={this.state.input}
                onChange={this.onInputChange}
                autoFocus
                />
                <select onChange={this.onQuantityInputChange}>
                    <option value="1">How many?</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <input 
                className="small-text"
                type="number" 
                placeholder="How much per item?" 
                value={this.state.priceInput}
                onChange={this.onPriceInputChange}
                />
                <button 
                className="btn--long"
                onClick={(e) => this.onInputSubmit(this.state.list)}>
                Submit
                </button> */}
            </div>
        }
        </div> 
    )
  }
}
