import React, { Component } from 'react';
import { Navbar } from "react-bootstrap";

import HeaderLinks from './HeaderLinks';
import appRoutes from "./routes/appRoutes";

class Header extends Component{
    constructor(props){
        super(props);
    }

    getPageName() {
        var name;
        appRoutes.map((prop, key) => {
            if (prop.redirect) {
                if (prop.path === this.props.location.pathname) {
                    name = prop.name;
                }
            } else {
                if (prop.path === this.props.location.pathname) {
                    name = prop.name;
                }
            }
        });
        return name;
    }

    render() {
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">{this.getPageName()}</a>
                    </Navbar.Brand>
                    {/*<Navbar.Toggle onClick={this.mobileSidebarToggle} />*/}
                </Navbar.Header>
                <Navbar.Collapse>
                    <HeaderLinks />
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
