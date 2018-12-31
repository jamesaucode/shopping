import React, { Component } from 'react'
import EditingItem from './EditingItem';
import cancelButton from '../image/error.png'

export default class ListItem extends Component {
  state = {
    product: this.props.product,
    price: this.props.price,
    quantity: this.props.quantity,
    id: this.props.id
  }
  onEditClick = (e) => {
    this.setState({
      editing: !this.state.editing
    })
  }
  onEditClickTrue = (e) => {
    this.setState({
      editing: true
    })
  }
  onProductChange = (e) => {
    this.setState({
      product: e.target.value
    })
  }
  onPriceChange = (e) => {
    this.setState({
      price: e.target.value
    })
  }
  onQuantityChange = (e) => {
    this.setState({
      quantity: e.target.value
    })
  }
  handleEditSubmit = (e) => {
    this.props.onEditSubmit(this.state)
  }
  render() {
    return (
      <div className="listItem">
          { this.state.editing ?
          <EditingItem
            product={this.props.product}
            quantity={this.props.quantity}
            id={this.props.id}
            price={this.props.price}
            onEditClick={this.onEditClick}
            onInputSubmit={this.props.onInputSubmit}
            onInputChange={this.props.onInputChange}
            onPriceInputChange={this.props.onPriceInputChange}
            onQuantityInputChange={this.props.onQuantityInputChange}
            onEditSubmit={this.props.onEditSubmit}
          />
          :
          <div className="relative">
            <button className="testing" onClick={() => this.props.onDeleteClick(this.props)}>
            <img src={cancelButton}></img>
            </button>
            <div tabIndex="0" onBlur={this.handleEditSubmit}>
              <input className="name" onBlur={this.handleEditSubmit} onChange={this.onProductChange} value={this.state.product}></input>
              <input className="small-text" onChange={this.onQuantityChange} value={this.state.quantity}></input>
              <input className="small-text" onChange={this.onPriceChange} value={this.state.price}></input>
              <p className="medium-text">{this.state.quantity * this.state.price}</p>
            </div>
          </div>
          }   
      </div>
    )
  }
}
