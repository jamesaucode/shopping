import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import './style/app.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard />
      </div>
    );
  }
}

export default App;
