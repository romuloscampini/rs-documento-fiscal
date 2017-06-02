import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import CompraBox from './Compra/CompraBox';
import CompraForm from './Compra/CompraForm';

class App extends Component {

  render() {
    return (
        <Router>
            <div>
                <Header/>
                <Route exact path='/' component={Home}/>
                <Route path='/compras' component={CompraBox}/>
                <Route path='/form' component={CompraForm}/>
            </div>
        </Router>
    );
  }
}

export default App;
