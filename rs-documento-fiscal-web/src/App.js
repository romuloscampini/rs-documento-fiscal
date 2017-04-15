import React, { Component } from 'react';
import Header from './Header';
import MenuLeft from './MenuLeft';
// import CompraBox from './CompraForm';

class App extends Component {

  render() {
    return (
        <div>
            <Header/>
            <MenuLeft/>
            <div id="main">
                {this.props.children}
            </div>

        </div>
    );
  }
}

export default App;
