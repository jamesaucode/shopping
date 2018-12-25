import React, { Component } from 'react'

export default class EditingItem extends Component {
  state = {
    product: this.props.product || '',
    price: this.props.price || '',
    quantity: this.props.quantity || '',
    id: this.props.id || ''
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
    this.props.onEditSubmit(this.state)
    this.props.onEditClick()
  }
  render() {
    return (
      <div>
        <input 
            type="text"
            className="name-edit--input"
            onChange={this.onInputChange}
            value={this.state.product} 
            autoFocus
        />
            <input 
            className="small-text"
            type="text"
            onChange={this.onQuantityInputChange}
            value={this.state.quantity} 
            />
            <input 
            className="small-text"
            type="text"
            onChange={this.onPriceInputChange}
            value={this.state.price} 
            />
            <button className="btn--long" onClick={this.onSubmit}>Submit</button>
            <button className="btn--long" onClick={(e) => this.props.onEditClick()}>Cancel</button>
      </div>
    )
  }
}
