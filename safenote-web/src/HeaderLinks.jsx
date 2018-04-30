import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class HeaderLinks extends Component {
    render() {
        const accountDropdown = (
            <div>
                <i className="fa fa-user-circle" />
                <b className="caret" />
            </div>
        );

        return (
            <div>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        <i className="fa fa-dashboard" />
                        <p className="hidden-lg hidden-md">Dashboard</p>
                    </NavItem>
                    <NavItem eventKey={3} href="#">
                        <i className="fa fa-search" />
                        <p className="hidden-lg hidden-md">Search</p>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavDropdown
                        eventKey={1}
                        title={accountDropdown}
                        noCaret
                        id="basic-nav-dropdown"
                    >
                        <MenuItem eventKey={1.1}>Action</MenuItem>
                        <MenuItem eventKey={1.2}>Another action</MenuItem>
                        <MenuItem eventKey={1.3}>Something</MenuItem>
                        <MenuItem eventKey={1.4}>Another action</MenuItem>
                        <MenuItem eventKey={1.5}>Something</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={1.5}>Separated link</MenuItem>
                    </NavDropdown>
                    <NavItem eventKey={2} href="#">
                        <i className="fas fa-sign-out-alt"></i>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
