import React, { Component } from 'react'

export default class EditingItem extends Component {
  state = {
    product: this.props.product,
    price: this.props.price,
    quantity: this.props.quantity,
    id: this.props.id,
    done: false
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
  onSubmit = () => {
    if (this.state.done) {
      this.props.onEditSubmit(this.state)
      this.props.onEditClick()
    } 
  }
  render() {
    return (
      <div>
        <div className="wrap--editing-item">
        <input 
            type="text"
            name="product"
            className="name-edit--input"
            onChange={this.onInputChange}
            value={this.state.product} 
            autoFocus
        />
        </div>
        <div className="wrap--editing-item">
          <label 
            className="label" 
            for="quantity">
            Quantity: 
          </label>
          <input 
            className="small-text"
            name="quantity"
            type="text" 
            onChange={this.onQuantityInputChange}
            value={this.state.quantity} 
          />
        </div>
        <div className="wrap--editing-item">
          <label 
            className="label" 
            for="price">
            Price: 
          </label>
          <input 
            className="small-text"
            name="price"
            type="text"
            onChange={this.onPriceInputChange}
            value={this.state.price} 
          />
        </div>
      </div>
    )
  }
}
