import React, { Component } from 'react';

import CDEScreen from './CDE/CDEScreen';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <CDEScreen />
      </div>
    );
  }
}

export default App;
