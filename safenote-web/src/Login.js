/**
 * Created by romuloscampini.
 */
import React, {Component} from 'react';
import { FormControl, Checkbox } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Icon from 'react-fa';

import Input from './components/Input';

export default class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            username : '',
            password: 'Teste'
        }
    }

    render(){
        const title = (
            <h3>Login</h3>
        );

        return (
            <div>
                    <div className="col-md-4 col-md-offset-4">
                        <div className="text-center">
                            <h1 className="login-brand-text">SafeNote</h1>
                            <h3 className="text-muted"> Scampini Team</h3>
                        </div>
                    </div>
                    <Panel header={<h3>Please Sign In</h3>} className="login-panel">
                        <form role="form">
                            <fieldset>
                                <div className="form-group">
                                    <FormControl
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        name="name"
                                    />
                                </div>

                                <div className="form-group">
                                    <FormControl
                                        className="form-control"
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                    />
                                </div>
                                <Checkbox label="Remember Me" > Remember Me </Checkbox>
                                <Button type="submit" bsSize="large" bsStyle="success" block>Login</Button>
                            </fieldset>
                        </form>
                    </Panel>

            </div>
        );
    }
}