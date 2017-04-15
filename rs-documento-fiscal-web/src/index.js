import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
// import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from './Home';
import CompraBox from './CompraBox';
import CompraForm from './CompraForm';


ReactDOM.render(
    (
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={ Home }/>
                <Route path="compras">
                    <IndexRoute component={CompraBox}/>
                    <Route path="form" component={CompraForm}/>
                </Route>
                <Route path="vendas"/>
            </Route>
        </Router>
    ),

  document.getElementById('root')
);
