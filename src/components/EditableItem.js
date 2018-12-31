import React, { Component } from "react";
import EditingItem from "./EditingItem";
// import editIcon from '../image/edit.png';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Item from "./Item";

export default class ListItem extends Component {
  state = {
    product: this.props.product,
    price: this.props.price,
    quantity: this.props.quantity,
    id: this.props.id,
    note: this.props.note,
    editing: this.props.editing,
    checked: false
  };
  onEditClick = e => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }));
  };
  onEditClickTrue = e => {
    this.setState({
      editing: true
    });
  };
  onProductChange = e => {
    this.setState({
      product: e.target.value
    });
  };
  onPriceChange = e => {
    this.setState({
      price: e.target.value
    });
  };
  onQuantityChange = e => {
    this.setState({
      quantity: e.target.value
    });
  };
  onToggleChecked = e => {
    this.setState(prevState => ({
      checked: !prevState.checked,
      editing: true
    }));
  };
  handleEditSubmit = e => {
    this.props.onEditSubmit(this.state);
  };
  handleDeleteClick = e => {
    this.props.onDeleteClick(this.state);
  };
  componentDidUpdate = (prevProps, prevState) => {
    const { product, price, quantity, note } = this.state;
    if (
      this.props.product !== product ||
      this.props.price !== price ||
      this.props.quantity !== quantity ||
      this.props.note !== note
    ) {
      this.setState({
        product: this.props.product,
        price: this.props.price,
        quantity: this.props.quantity,
        note: this.props.note
      });
    }
  };

  render() {
    const { product, price, quantity, note, id, checked } = this.state;
    if (this.state.editing) {
      return (
        <EditingItem
          product={product}
          price={price}
          quantity={quantity}
          id={id}
          note={note}
          onEditClick={this.onEditClick}
          onEditSubmit={this.props.onEditSubmit}
        />
      );
    } else {
      return (
        <Item
          product={product}
          quantity={quantity}
          checked={checked}
          note={note}
          onEditClick={this.onEditClick}
          handleDeleteClick={this.handleDeleteClick}
          onToggleChecked={this.onToggleChecked}
        />
      );
    }
  }
}
