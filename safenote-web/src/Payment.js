/**
 * Created by romuloscampini.
 */
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CompraForm from "./Pagamento/CompraForm";
import CompraBox from "./Pagamento/CompraBox";

class Payment extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Route
                    exact
                    path={this.props.match.path}
                    // component={CompraBox}
                    render={(props) => <CompraBox {...this.props} />}
                />
                <Route
                    path={`${this.props.match.path}/form`}
                    render={(props) => <CompraForm {...this.props} />}
                />
                {/*<Route path={`${this.props.match.path}/two`} component={HomePageTwo} />*/}
            </div>
        );
    }
}

export default Payment;
