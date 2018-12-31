import React, { Component } from 'react'
import add from '../image/add.png';
import minus from '../image/minus.png';

export default class EditingItem extends Component {
  state = {
    product: this.props.product,
    price: this.props.price,
    quantity: this.props.quantity,
    id: this.props.id,
    focused: true
  }
  onInputChange = (e) => {
    this.setState({
      product: e.target.value
    })
  }
  onPriceInputChange = (e) => {
    this.setState({
      price: e.target.value
    })
  }
  onQuantityInputChange = (e) => {
    this.setState({
      quantity: e.target.value
    })
  }
  onQuantityIncrementClick = (e) => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1
    }))
  }
  onQuantityDecrementClick = (e) => {
    {
      if (this.state.quantity - 1 > 0) {
        this.setState(prevState => (
          {
            quantity: prevState.quantity - 1
          }))
      }
    }
  }
  onSubmit = () => {
    this.props.onEditSubmit(this.state);
    this.props.onEditClick();
  }
  onFocus = () => {
    this.setState({
      focused: true
    })
  }
  onBlur = (e) => {
    this.setState({
      focused: false
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
  }

  render() {
    return (
      <div
        className="listItem--editing">
        <form
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onSubmit={this.onSubmit}>
          <div className="wrap--editing-item">
            <input
              type="text"
              name="product"
              className="input--name-edit"
              placeholder="Product name"
              onChange={this.onInputChange}
              value={this.state.product}
              autoFocus
            />
          </div>
          <div className="wrap--editing-item">
            <label
              className="label"
              htmlFor="quantity">
              Quantity:
          </label>
            <img src={minus} onClick={this.onQuantityDecrementClick}></img>
            <p>{this.state.quantity}</p>
            <img src={add} onClick={this.onQuantityIncrementClick}></img>
          </div>
          {/* <div className="wrap--editing-item">
          <label 
            className="label" 
            htmlFor="price">
            Price: 
          </label>
          <input 
            className="input--quantity"
            name="price"
            type="text"
            onChange={this.onPriceInputChange}
            value={this.state.price} 
          />
        </div> */}
        </form>
        <div onClick={this.onSubmit} className="whole-screen">
        </div>
      </div>
    )
  }
}
