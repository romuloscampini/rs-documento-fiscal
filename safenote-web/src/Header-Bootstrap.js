/**
 * Created by romuloscampini.
 */
import React, {Component} from 'react';
import {Grid, Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import {Icon} from 'react-fa';
import {LinkContainer} from 'react-router-bootstrap';

import logo from './logo.svg';

export default class HeaderBootstrap extends Component {

    render(){

        return(
            <div className="header">
                <Navbar staticTop inverse sidebar className="rs-navbar">
                    <Grid>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="/">SafeNote</a>
                                {/*<a href="/"><img src={logo} width="20px" title="SafeNote" alt="SafeNote"/>SafeNote</a>*/}
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        {/*<Nav pullLeft>*/}
                            {/*<LinkContainer to={'/'} exact>*/}
                                {/*<NavItem href="#"><Icon name="tachometer" /> Dashboard</NavItem>*/}
                            {/*</LinkContainer>*/}
                            {/*<LinkContainer to={'/compras'} exact>*/}
                                {/*<NavItem href="#"><Icon name="download" /> Pagamento</NavItem>*/}
                            {/*</LinkContainer>*/}
                            {/*<LinkContainer to={'/vendas'}>*/}
                                {/*<NavItem href="#"><Icon name="upload" /> Recebimento</NavItem>*/}
                            {/*</LinkContainer>*/}
                        {/*</Nav>*/}
                        <Navbar.Collapse>
                            <Nav pullLeft>
                                <LinkContainer to={'/'} exact>
                                    <NavItem href="#" eventKey={1}><Icon name="tachometer" /> Dashboard</NavItem>
                                </LinkContainer>
                                <NavDropdown title="Fiscal" eventKey={2} id='menu-opcoes-fiscal'>
                                    <LinkContainer to={'/payment'} exact>
                                        <MenuItem eventKey={2.1}><Icon name="download" /> Pagamento</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to={'/vendas'} exact>
                                        <MenuItem eventKey={2.2} disabled><Icon name="upload" /> Recebimento</MenuItem>
                                    </LinkContainer>
                                    {/*<NavItem href="#"><Icon name="download" /> Pagamento</NavItem>*/}
                                </NavDropdown>
                                {/*</LinkContainer>*/}
                                {/*<LinkContainer to={'/vendas'}>*/}
                                    {/*<NavItem href="#"><Icon name="upload" /> Recebimento</NavItem>*/}
                                {/*</LinkContainer>*/}

                            </Nav>
                            <Nav pullRight>
                                <LinkContainer to={'/logout'}>
                                    <NavItem href="#"><Icon name="user" /> Logout</NavItem>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Grid>
                </Navbar>
                {/*<div className="menu">*/}
                    {/*<Navbar>*/}
                        {/*<Grid>*/}
                            {/*/!*<Navbar.Brand/>*!/*/}
                            {/*<Nav pullLeft>*/}
                                {/*/!*<LinkContainer to={'/'} exact>*!/*/}
                                    {/*<NavItem href="#" eventKey={1}><Icon name="tachometer" /> Dashboard</NavItem>*/}
                                {/*/!*</LinkContainer>*!/*/}
                                {/*/!*<LinkContainer to={'/compras'} exact>*!/*/}
                                    {/*<NavDropdown title="Fiscal" eventKey={2}>*/}
                                        {/*<MenuItem eventKey={2.1}><Icon name="download" /> Pagamento</MenuItem>*/}
                                        {/*<MenuItem eventKey={2.2}><Icon name="upload" /> Recebimento</MenuItem>*/}
                                        {/*/!*<NavItem href="#"><Icon name="download" /> Pagamento</NavItem>*!/*/}
                                    {/*</NavDropdown>*/}
                                {/*/!*</LinkContainer>*!/*/}
                                {/*<LinkContainer to={'/vendas'}>*/}
                                    {/*<NavItem href="#"><Icon name="upload" /> Recebimento</NavItem>*/}
                                {/*</LinkContainer>*/}
                            {/*</Nav>*/}
                        {/*</Grid>*/}
                    {/*</Navbar>*/}
                {/*</div>*/}
            </div>

    );
    }
}
