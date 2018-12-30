import React, { Component } from 'react'
import EditingItem from './EditingItem';
import cancelButton from '../image/error.png';
import editIcon from '../image/edit.png';
import checkedIcon from '../image/checked.png';
import uncheckedIcon from '../image/unchecked.png';
import trashIcon from '../image/trash.png';

export default class ListItem extends Component {
  state = {
    product: this.props.product,
    price: this.props.price,
    quantity: this.props.quantity,
    id: this.props.id,
    editing : false,
    checked: false
  }
  onEditClick = (e) => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
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
  onToggleChecked = (e) => {
    this.setState(prevState => ({
      checked: !prevState.checked
    }))
  }
  handleEditSubmit = (e) => {
    this.props.onEditSubmit(this.state)
  }
  handleDeleteClick = (e) => {
    this.props.onDeleteClick(this.state);
  }
  componentDidUpdate = (prevProps, prevState) => {
    const {product, price, quantity} = this.state;
    if (this.props.product !== product || this.props.price !== price || this.props.quantity !== quantity) {
      this.setState({
        product: this.props.product,
        price: this.props.price,
        quantity: this.props.quantity,
      })
    }
  }
  
  render() {
    const { product, price, quantity, id, checked } = this.state;
    return (
      <div className="listItem">
            {this.state.editing ?
              <EditingItem 
                product={product}
                price={price}
                quantity={quantity}
                id={id}
                onEditClick={this.onEditClick}
                onEditSubmit={this.props.onEditSubmit}
              />
              :
              <div className="listItem--editable">
                <p>{this.props.product}</p>
                <div>
                  {checked ? 
                    <img 
                    onClick={this.onToggleChecked} 
                    className="icon" 
                    alt="Checked"
                    src={checkedIcon}>
                    </img>
                  :
                    <img 
                    onClick={this.onToggleChecked}
                    className="icon"
                    alt="Unchecked" 
                    src={uncheckedIcon}>
                    </img>
                  }
                  <img 
                  onClick={this.onEditClick}
                  className="icon"
                  src={editIcon}
                  >
                  </img>
                  <img 
                  onClick={this.handleDeleteClick}
                  className="icon"
                  src={trashIcon}
                  >
                  </img>
                </div>
              </div>
            }
            {!this.state.editing && <p className="notes">NOTES!</p>}
      </div>
    )
  }
}
