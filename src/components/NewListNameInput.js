import React, { Component } from 'react'

export default class NewListNameInput extends Component {
    state = {
        currentList: this.props.currentList
    }
    onCurrentListChange = e => {
        this.setState({
            currentList: e.target.value
        })
    }
    handleCurrentListChange = e => {
        this.props.onCurrentListSubmit(this.state.currentList)
        this.props.onEditListNameClick(e);
    }
  render() {
    return (
        <input 
        className="select--list border-green"
        value={this.state.currentList} 
        onChange={this.onCurrentListChange}
        onBlur={this.handleCurrentListChange} 
        autoFocus>
        </input>
    )
  }
}
