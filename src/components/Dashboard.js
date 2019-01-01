import React, { Component } from "react";
import EditableItem from "./EditableItem";
import NewListNameInput from './NewListNameInput';
import addButton from "../image/plus.png";
import garbageIcon from '../image/garbage.png';
import { handleRemoveList, getKeyValuesFromList } from "../Helper";
import editIcon from '../image/edit.png';
import Select from "./Select";
import uuid from "uuid";

export default class Dashboard extends Component {
  state = {
    lists: {
      "New list 1": [
        {
          product: "New product",
          price: 10,
          quantity: 2,
          note: "",
          editing: false,
          id: uuid()
        }
      ]
    },
    currentList: "New list 1",
    search: "",
    sortBy: "",
    creatingNewList: false,
    editingListName: false,
    newListName: "",
    deletingList: false,
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
      this.setState({
        creatingNewList: true
      });
    } else {
      this.setState({
        currentList: target
      });
    }
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
  onDeleteListClick = e => {
    this.setState({
      deletingList: true
    })
  }
  onDeleteListSubmit = e => {
    // A helper function in Helper.js,
    // to remove a list , and replace currentlist with another list
    var lists = handleRemoveList(this.state.lists, this.state.currentList);
    var keys = getKeyValuesFromList(this.state.lists, this.state.currentList);
    this.setState({
      lists,
      currentList: keys[0]
    })
  }
  onEditSubmit = ({ product, price, quantity, id, note }) => {
    var updatedList = this.state.lists;
    var currentList = updatedList[this.state.currentList];
    if (product.length > 0) {
      currentList = currentList.map(item => {
        if (item.id === id) {
          return {
            product,
            price,
            quantity,
            id,
            note
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

  onEditListNameClick = e => {
    this.setState(prevState => ({
      editingListName: !prevState.editingListName
    }))
  }
  onToggleClick = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };
  onItemToggleClick = () => {
    var updatedList = this.state.lists;
    var newList = updatedList[this.state.currentList];
    newList.unshift({
      product: "",
      price: 10,
      quantity: 1,
      id: uuid(),
      note: '',
      editing: true
    });
    this.setState({
      lists: updatedList
    });
  };
  onNewListSubmit = e => {
    e.preventDefault();
    if (this.state.newListName.trim().length > 0) {
      var lists = this.state.lists;
      lists[this.state.newListName] = [];
      this.setState({
        lists,
        newListName: "",
        creatingNewList: false
      });
    }
    this.setState({
      creatingNewList: false
    })
  };
  onCurrentListSubmit = newName => {
    var lists = this.state.lists;
    var oldName = this.state.currentList;
    if (oldName !== newName) {
      Object.defineProperty(lists, newName,
        Object.getOwnPropertyDescriptor(lists, oldName));
      delete lists[oldName]
    }
    this.setState({
      lists,
      currentList: newName
    })
    console.log(this.state.lists)
  }
  onNewListChange = e => {
    this.setState({
      newListName: e.target.value
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
    const cachedList = localStorage.getItem("list");
    const cachedCurrentList = localStorage.getItem("currentList");
    const lists = JSON.parse(cachedList)
    const currentList = JSON.parse(cachedCurrentList);
    console.log(cachedList)
    console.log(cachedCurrentList)
    if (cachedList && cachedCurrentList) {
      this.setState({
        lists,
        currentList
      })
    }
    // getTotal(this.state.lists[this.state.currentList]);
  };
  componentDidUpdate = (prevProps, prevState) => {
    // var newTotal = getTotal(this.state.lists[this.state.currentList]);
    // if (this.state.total !== newTotal) {
    //   this.setState({
    //     total: newTotal
    //   });
    // }
    localStorage.setItem("list", JSON.stringify(this.state.lists))
    localStorage.setItem("currentList", JSON.stringify(this.state.currentList))
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
          return 1;
        }
        if (a.product.toLowerCase() > b.product.toLowerCase()) {
          return -1;
        }
        return 0;
      });
    }
    if (this.state.sortBy === "Alphabetical") {
      showList.sort(a => {
        if (a.product === "") {
          return -1;
        } else {
          return 1;
        }
      });
    }
    return (
      <div className="dashboard">
        <div className="wrapper--nav-bar">
          <nav className="nav-bar">
            <h1 className="heading">Easy Shopping List</h1>
            <label className="label-with-width margin-left-auto" htmlFor="sort">
              Sort By:
            </label>
            <select
              name="sort"
              className="select--sortBy"
              value={this.state.sortBy}
              onChange={this.onSortByChange}
            >
              <option defaultValue>Date Added</option>
              <option>Alphabetical</option>
            </select>
          </nav>
        </div>
        {this.state.creatingNewList && (
          <form onSubmit={this.onNewListSubmit}>
            <input
              className="search"
              placeholder="New list name"
              onBlur={() => this.setState({ creatingNewList: false })}
              value={this.state.newListName}
              onChange={this.onNewListChange}
              autoFocus
            />
          </form>
        )}
        <input
          className="search"
          placeholder="Search"
          value={this.state.search}
          onChange={this.onSearchChange}
        />

        {/* The toggle button, if the state is toggled, then the button will 
        be up arrow, vice versa. */}
        {this.state.toggle ? (
          <button className="total-price" onClick={this.onToggleClick}>
            ↓
          </button>
        ) : (
            <button className="total-price" onClick={this.onToggleClick}>
              ↑
          </button>
          )}

        {/* All the list names */}
        <div>
          {this.state.editingListName ?
            <NewListNameInput
              currentList={this.state.currentList}
              onCurrentListSubmit={this.onCurrentListSubmit}
              onEditListNameClick={this.onEditListNameClick}
            />
            :
            <div className="wrapper-select--list">
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
              <img
                className="icon"
                alt="Edit icon"
                onClick={this.onEditListNameClick}
                value={this.state.currentList}
                src={editIcon}>
              </img>
              <img
                className="icon"
                alt="Garbage icon"
                onClick={this.onDeleteListSubmit}
                src={garbageIcon}
              >
              </img>
            </div>
          }

        </div>
        {!this.state.toggle && (
          <div className="itemlist">
            <button className="btn--add" onClick={() => this.onItemToggleClick()}>
              <img alt="Add button" src={addButton} />
            </button>
            {showList.map(({ product, price, quantity, id, editing, note }) => (
              <EditableItem
                editing={editing}
                product={product}
                price={price}
                quantity={quantity}
                id={id}
                key={id}
                note={note}
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
      </div>
    );
  }
}
