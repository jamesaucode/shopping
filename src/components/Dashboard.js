import React, { Component } from "react";
import EditableItem from "./EditableItem";
import addButton from "../image/plus.png";
import Select from "./Select";
import uuid from "uuid";

export default class Dashboard extends Component {
  state = {
    lists: {
      "Trip to TJ": [
        {
          product: "Pizza",
          price: 5,
          quantity: 1,
          note: "",
          id: uuid()
        },
        {
          product: "Soy Milk",
          price: 3,
          quantity: 2,
          note: "",
          id: uuid()
        }
      ],
      "Trip to Costco": [
        {
          product: "Starbucks Coffee",
          price: 25,
          quantity: 1,
          note: "",
          id: uuid()
        }
      ]
    },
    currentList: "Trip to TJ",
    search: "",
    input: "",
    priceInput: "",
    total: 0,
    quantity: 0,
    toggle: false
  };
  getTotal = list => {
    var totalPrice = 0;
    for (let i = 0; i < list.length; i++) {
      totalPrice += parseFloat(list[i].price * list[i].quantity);
    }
    console.log("Total updated");
    totalPrice = totalPrice.toFixed(2);
    return totalPrice;
  };
  plusTotal = price => {
    this.setState({
      total: this.state.total + price
    });
  };
  minusTotal = price => {
    this.setState({
      total: this.state.total - price
    });
  };
  onInputChange = e =>
    this.setState({
      input: e.target.value
    });
  onChangeSelect = e => {
    this.setState({
      currentList: e.target.value
    });
  };
  onPriceInputChange = e => {
    var input = e.target.value;
    if (input.match(/^\d*(\.\d{0,1})?\d$/)) {
      this.setState({
        priceInput: input
      });
    }
    if (input === "") {
      this.setState({
        priceInput: ""
      });
    }
  };
  onQuantityInputChange = e =>
    this.setState({
      quantity: parseFloat(e.target.value)
    });
  onInputSubmit = items => {
    console.log(items);
    var list = items;
    var input = this.state.input;
    var priceInput = parseFloat(this.state.priceInput);
    var quantity = this.state.quantity;
    list.push({
      product: input,
      price: priceInput,
      quantity: quantity,
      id: uuid()
    });
    this.setState({
      list: list,
      input: "",
      priceInput: ""
    });
    this.plusTotal(priceInput * quantity);
  };
  onDeleteClick = item => {
    var updatedList = this.state.lists;
    var currentList = updatedList[this.state.currentList];
    updatedList[this.state.currentList] = currentList.filter(i => i.id !== item.id)

    console.log(updatedList)

    this.setState({
      lists: updatedList
    })
    // var price = parseFloat(item.price * item.quantity);
    // this.minusTotal(price);
    // const list = [...this.state.list];
    // localStorage.setItem("list", JSON.stringify(list));
  };
  onEditSubmit = ({ product, price, quantity, id }) => {
    var updatedList = this.state.lists;
    var currentList = updatedList[this.state.currentList];
    currentList = currentList.map(item => {
      if (item.id === id) {
        return {
          product,
          price,
          quantity
        };
      } else {
        return item;
      }
    });

    Object.assign(updatedList[this.state.currentList], currentList);

    console.log(currentList);
    console.log(updatedList);
    this.setState({
      lists: updatedList
    });
  };
  onToggleClick = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };
  onItemToggleClick = () => {
    var updatedList = this.state.lists;
    var newList = updatedList[this.state.currentList];
    newList.push({
      product: "new item",
      price: 10,
      quantity: 1,
      id: uuid()
    });
    this.setState({
      lists: updatedList
    });
  };
  onSearchChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  componentDidMount = () => {
    // const cache = localStorage.getItem("list");
    // try {
    //   var list = JSON.parse(cache);
    //   this.setState({
    //     list
    //   });
    // } catch (e) {
    //   console.log("Empty list! Reseting the list");
    //   this.setState({
    //     list: [
    //       {
    //         product: "New item",
    //         price: 10,
    //         quantity: 1,
    //         id: uuid()
    //       }
    //     ]
    //   });
    this.getTotal(this.state.lists[this.state.currentList]);
  };
  componentDidUpdate = (prevProps, prevState) => {
    console.log("updated");
    var newTotal = this.getTotal(this.state.lists[this.state.currentList]);
    if (this.state.total !== newTotal) {
      this.setState({
        total: newTotal
      });
    }
  };

  render() {
    const searchTerm = this.state.search;
    const showList = this.state.lists[this.state.currentList].filter(item => {
      if (item.product.toLowerCase().includes(searchTerm.toLowerCase())) {
        return item;
      }
    });
    return (
      <div className="dashboard">
        <h1 className="heading">Easy Shopping List</h1>
        <select onChange={this.onChangeSelect}>
          {Object.keys(this.state.lists).map(key => (
            <Select value={key} />
          ))}
        </select>
        <form>
          <input className="input--main" type="text" placeholder="Add list" />
        </form>
        <input
          className="search"
          placeholder="Search"
          value={this.state.search}
          onChange={this.onSearchChange}
        />
        {this.state.toggle ? (
          <button className="total-price" onClick={this.onToggleClick}>
            ↓
          </button>
        ) : (
          <button className="total-price" onClick={this.onToggleClick}>
            ↑
          </button>
        )}

        {!this.state.toggle && (
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
        )}
        <button className="btn--add" onClick={() => this.onItemToggleClick()}>
          <img src={addButton} />
        </button>
      </div>
    );
  }
}
