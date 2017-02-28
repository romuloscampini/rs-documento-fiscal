import React, { Component } from 'react';
import Header from './Header';
import CompraBox from './Compra';

class App extends Component {

  render() {
    return (
        <div>
            <Header/>
            <CompraBox/>
        </div>
    );
  }
}

export default App;
