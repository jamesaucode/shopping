import React, { Component } from 'react'
import EditableItem from './EditableItem';
import addButton from '../image/plus.png';
import uuid from 'uuid';

export default class Dashboard extends Component {
    state = {
        list: [],
        search: '',
        input: '',
        priceInput: '',
        total: 0,
        quantity: 0,
        toggle: false
    };
    getTotal = (list) => {
        var totalPrice = 0
        for (let i = 0; i < list.length; i++) {
            totalPrice += parseFloat(list[i].price * list[i].quantity)
        }
        console.log('Total updated')
        totalPrice = totalPrice.toFixed(2)
        return totalPrice
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
        if (input.match(/^\d*(\.\d{0,1})?\d$/)) {
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
        list.push({
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
            list: this.state.list.filter(del => (
                del.id !== item.id
            ))
        })
        console.log("deleting! " + item.id);
        var price = parseFloat(item.price * item.quantity)
        this.minusTotal(price)
    }
    onEditSubmit = ({product, price, quantity, id}) => {
        this.setState({
            list: this.state.list.map((item) => {
                if (item.id === id) {
                    return Object.assign({}, item, {
                        product,
                        price,
                        quantity
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
        newList.push({
            product: 'new item',
            price: 10,
            quantity: 1,
            id: uuid()
        })
        this.setState({
            list: newList
        })
    }
    onSearchChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    componentDidMount = () => {
        var fakeList = []
        fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(data => data.json())
        .then(json => json.forEach((j) => {
            fakeList.push(
                {
                    product: j.title,
                    price: Math.random() * 10,
                    quantity: Math.floor(Math.random() * 10),
                    id: uuid()
                }
            )
        }))
        console.log(fakeList)
        this.setState({
            list: fakeList
        })
        console.log(Date.now())
        this.getTotal(this.state.list)
    }
    componentDidUpdate = (prevProps, prevState) => {
        console.log('updated')
        var newTotal = this.getTotal(this.state.list)
        if (this.state.total !== newTotal) {
            this.setState({
                total: newTotal
            })
        }
    }

    render() {
        const searchTerm = this.state.search
        const showList = this.state.list.filter((item) => {
            if (item.product.toLowerCase().includes(searchTerm.toLowerCase())) {
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
                            {showList.map(({ product, price, quantity, id }) => (
                                <EditableItem
                                    product={product}
                                    price={price}
                                    quantity={quantity}
                                    id={id}
                                    key={id}
                                    onDeleteClick={this.onDeleteClick}
                                    onInputSubmit={this.onInputSubmit}
                                    onInputChange={this.onInputChange}
                                    onPriceInputChange={this.onPriceInputChange}
                                    onQuantityInputChange={this.onQuantityInputChange}
                                    onEditSubmit={this.onEditSubmit}
                                />
                            ))}
                        </div>
                    </div>
                }
            </div>
        )
    }
}
