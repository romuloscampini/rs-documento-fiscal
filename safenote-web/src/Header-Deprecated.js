/**
 * Created by romuloscampini.
 */
import React, { Component } from 'react';
import {
    Navbar,
    Nav,
    NavDropdown,
    NavItem,
    MenuItem
} from 'react-bootstrap';
import { Icon } from 'react-fa';
import { Link } from 'react-router';

class HeaderDefault extends Component {

    render() {

        return (
            <Navbar collapseOnSelect>
                <Navbar.Header >
                    <Navbar.Brand >
                        <Link to="/">Controle Fiscal</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1}>
                            <Link to="/">Dashboard</Link>
                        </NavItem>
                        <NavDropdown eventKey={2} title="Operações" id="basic-nav-dropdown">
                            <MenuItem eventKey={2.1}>
                                <Link to="/compras">Compras / Pagamentos</Link>
                            </MenuItem>
                            {/*<MenuItem divider />*/}
                            <MenuItem eventKey={2.2}>
                                <Link to="/vendas">Vendas / Recebimentos</Link>
                            </MenuItem>
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
                        <NavItem eventKey={1}>
                            <Icon name="user" />
                            <Link to="/user"> User</Link>
                        </NavItem>
                        <NavItem eventKey={2}>
                            <Icon name="sign-out" />
                            <Link to="/logout"> Logout</Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default HeaderDefault;