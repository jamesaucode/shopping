import React, { Component } from 'react'

export default class Select extends Component {
  render() {
    return (
        <option value={this.props.value}>{this.props.value}</option>
    )
  }
}
