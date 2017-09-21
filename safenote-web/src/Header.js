/**
 * Created by romuloscampini.
 */
import React, {Component} from 'react';
import {Grid, Nav, NavItem, Navbar, Breadcrumb, Row} from 'react-bootstrap';
import {Icon} from 'react-fa';
import {LinkContainer} from 'react-router-bootstrap';

import logo from './logo.svg';

export default class Header extends Component {

    render(){

        return(
            <div className="header">
                <Navbar staticTop inverse className="rs-navbar">
                    <Grid>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="/"><img src={logo} width="20px" title="SafeNote" alt="SafeNote" /></a>
                            </Navbar.Brand>
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
                        <Nav pullRight>
                            <LinkContainer to={'/logout'}>
                                <NavItem href="#"><Icon name="user" /> Logout</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Grid>
                </Navbar>
                {/*<div className="menu">*/}
                    <Navbar>
                        <Grid>
                            {/*<Navbar.Brand/>*/}
                            <Nav pullLeft>
                                <LinkContainer to={'/'} exact>
                                    <NavItem href="#"><Icon name="tachometer" /> Dashboard</NavItem>
                                    </LinkContainer>
                                    <LinkContainer to={'/compras'} exact>
                                        <NavItem href="#"><Icon name="download" /> Pagamento</NavItem>
                                    </LinkContainer>
                                    <LinkContainer to={'/vendas'}>
                                    <NavItem href="#"><Icon name="upload" /> Recebimento</NavItem>
                                </LinkContainer>
                            </Nav>
                        </Grid>
                    </Navbar>
                {/*</div>*/}
            </div>

    );
    }
}