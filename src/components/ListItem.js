import React, { Component } from 'react'
import EditingItem from './EditingItem';
import cancelButton from '../image/error.png'

export default class ListItem extends Component {
  state = {
    editing: false
  }
  onEditClick = (e) => {
    this.setState({
      editing: !this.state.editing
    })
  }
  render() {
    return (
      <div>
        <li>
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
            <div className="name">
              <p>{this.props.product}</p>
            </div>
            <p className="small-text">{this.props.quantity}</p>
            <p className="small-text">x</p>
            <p className="small-text">$ {this.props.price} per item</p>
            <p className="small-text">∥</p>
            <p className="medium-text">$ {this.props.quantity * this.props.price}</p>
            <button onClick={() => this.onEditClick()} className="btn--long">Edit</button>
          </div>
          }   
        </li>
      </div>
    )
  }
}
