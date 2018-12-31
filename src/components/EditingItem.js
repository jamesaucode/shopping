import React, { Component } from 'react'
import add from '../image/add.png';
import minus from '../image/minus.png';

export default class EditingItem extends Component {
  state = {
    product: this.props.product,
    price: this.props.price,
    quantity: this.props.quantity,
    id: this.props.id,
    note: this.props.note,
    focused: true
  }
  onInputChange = (e) => {
    this.setState({
      product: e.target.value
    })
  }
  onNoteChange = (e) => {
    this.setState({
      note: e.target.value
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
    if (this.state.quantity - 1 > 0) {
      this.setState(prevState => (
        {
          quantity: prevState.quantity - 1
        }))
    }
  }
  onSubmit = () => {
    this.props.onEditSubmit(this.state);
    this.props.onEditClick();
  }

  componentDidUpdate = (prevProps, prevState) => {
  }

  render() {
    const { product, quantity, note } = this.state;
    return (
      <div className="modal">
        <div
          className="listItem--editing">
          <form
            onSubmit={this.onSubmit}>
            <div className="wrap--editing-item">
              <input
                type="text"
                name="product"
                className="input--name-edit"
                placeholder="Product name"
                onChange={this.onInputChange}
                value={product}
                autoFocus
              />
            </div>
            <div className="wrap--editing-item">
              <label
                className="label"
                htmlFor="quantity">
                Quantity:
              </label>
              <img src={minus} alt="decrement click" onClick={this.onQuantityDecrementClick}></img>
              <p>{quantity}</p>
              <img src={add} alt="increment click" onClick={this.onQuantityIncrementClick}></img>
            </div>
            <div className="wrap--editing-item">
              <label
                className="label"
                htmlFor="note">
                Notes:
              </label>
              <textarea onChange={this.onNoteChange} value={note} className="textarea--note" name="note"></textarea>
            </div>
          </form>
          <div onClick={this.onSubmit} className="whole-screen"></div>
        </div>
      </div>
    )
  }
}
