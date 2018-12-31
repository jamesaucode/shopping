import React, { Component } from "react";
import EditableItem from "./EditableItem";
import addButton from "../image/plus.png";
import { getTotal } from "../Helper";
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
          editing: false,
          id: uuid()
        },
        {
          product: "Soy Milk",
          price: 3,
          quantity: 2,
          note: "",
          editing: false,
          id: uuid()
        }
      ],
      "Trip to Costco": [
        {
          product: "Starbucks Coffee",
          price: 25,
          quantity: 1,
          note: "",
          editing: false,
          id: uuid()
        }
      ]
    },
    currentList: "Trip to TJ",
    search: "",
    sortBy: "",
    // input: "",
    // priceInput: "",
    total: 0,
    quantity: 0,
    toggle: false
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
    var target = e.target.value;
    if (target === "Add") {
      console.log("Adding another list");
      this.onAddListSelect();
    } else {
      this.setState({
        currentList: target
      });
    }
  };
  onAddListSelect = () => {
    var key = "Newlist";
    var updatedList = this.state.lists;
    updatedList[key] = [
      {
        product: "lul",
        price: 10,
        quantity: 1,
        id: uuid()
      }
    ];
    // console.log(newObj)
    this.setState({
      lists: updatedList
    });
    console.log(this.state.lists);
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
    updatedList[this.state.currentList] = currentList.filter(
      i => i.id !== item.id
    );

    console.log(updatedList);

    this.setState({
      lists: updatedList
    });
    // var price = parseFloat(item.price * item.quantity);
    // this.minusTotal(price);
    // const list = [...this.state.list];
    // localStorage.setItem("list", JSON.stringify(list));
  };
  onEditSubmit = ({ product, price, quantity, id }) => {
    var updatedList = this.state.lists;
    var currentList = updatedList[this.state.currentList];
    if (product.length > 0) {
      currentList = currentList.map(item => {
        if (item.id === id) {
          return {
            product,
            price,
            quantity,
            id
          };
        } else {
          return item;
        }
      });

      Object.assign(updatedList[this.state.currentList], currentList);

      this.setState({
        lists: updatedList
      });
    }
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
      product: "",
      price: 10,
      quantity: 1,
      id: uuid(),
      editing: true
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
  onSortByChange = e => {
    this.setState({
      sortBy: e.target.value
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
    getTotal(this.state.lists[this.state.currentList]);
  };
  componentDidUpdate = (prevProps, prevState) => {
    var newTotal = getTotal(this.state.lists[this.state.currentList]);
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
      } else {
        return null;
      }
    });
    if (this.state.sortBy === "Alphabetical") {
      showList.sort((a, b) => {
        if (a.product.toLowerCase() < b.product.toLowerCase()) {
          return -1;
        }
        if (a.product.toLowerCase() > b.product.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    }
    if (this.state.sortBy === "Alphabetical") {
      showList.sort(a => {
        if (a.product == "") {
          return 1;
        } else {
          return -1;
        }
        return 0;
      });
    }
    return (
      <div className="dashboard">
        <div className="wrapper--nav-bar">
          <nav className="nav-bar">
            <h1 className="heading">Easy Shopping List</h1>
            <select
              className="select--list"
              value={this.state.currentList}
              onChange={this.onChangeSelect}
            >
              {Object.keys(this.state.lists).map(key => (
                <Select value={key} key={uuid()} />
              ))}
              <option value="Add">-----Add another list-----</option>
            </select>
            <select
              className="select--sortBy"
              value={this.state.sortBy}
              onChange={this.onSortByChange}
            >
              <option defaultValue>Date Added</option>
              <option>Alphabetical</option>
            </select>
          </nav>
        </div>
        {/* <form>
          <input className="input--main" type="text" placeholder="Add list" />
        </form> */}
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
            {showList.map(({ product, price, quantity, id, editing }) => (
              <EditableItem
                editing={editing}
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
          <img alt="Add button" src={addButton} />
        </button>
        <input type="hidden" autoFocus={true} />
      </div>
    );
  }
}
