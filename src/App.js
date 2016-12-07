import React, { Component } from 'react';
import './App.css';

import Wiper from './Wiper';

class App extends Component {

  render() {

    return (
      <div className="App">
        <Wiper
        	bgImage="http://assets.myntassets.com/v1479297908/radium/wiper/ImageClean.jpg"
        	bgMist="http://assets.myntassets.com/v1479297909/radium/wiper/ImageMyst.jpg"
        />
      </div>
    );
  }
}

export default App;
