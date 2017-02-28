/**
 * Created by romuloscampini.
 */
import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';
import { Icon } from 'react-fa';

class Header extends React.Component {
    render() {
        return (
            <Navbar collapseOnSelect>
                <Navbar.Header >
                    <Navbar.Brand >
                        <a href="#">Controle Fiscal</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">Dashboard</NavItem>
                        <NavDropdown eventKey={2} title="Operações" id="basic-nav-dropdown">
                            <MenuItem eventKey={2.1}>Compras / Pagamentos</MenuItem>
                            {/*<MenuItem divider />*/}
                            <MenuItem eventKey={2.2}>Vendas / Recebimentos</MenuItem>
                        </NavDropdown>
                        <NavDropdown eventKey={3} title="Configurações" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Listar</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            {/*<MenuItem divider />*/}
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            <Icon name="user" /> User
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            <Icon name="sign-out" /> Logout
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;