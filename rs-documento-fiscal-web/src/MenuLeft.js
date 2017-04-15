/**
 * Created by romuloscampini.
 */
import React, { Component } from 'react';
import {
    Clearfix,
    MenuItem
} from 'react-bootstrap';
import { Icon } from 'react-fa';

export default class MenuLeft extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return (
            <Clearfix>
                <ul className="dropdown-menu open">
                    <MenuItem header>Menu</MenuItem>
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem divider/>
                    <MenuItem header>Operações</MenuItem>
                    <MenuItem>Pagamentos</MenuItem>
                    <MenuItem>Recebimentos</MenuItem>
                </ul>
            </Clearfix>
        );
    }
}