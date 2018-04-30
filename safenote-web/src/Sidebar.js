/**
 * Created by romuloscampini.
 */
import React, {Component} from 'react';
import {Grid, Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import {Icon} from 'react-fa';
import {LinkContainer} from 'react-router-bootstrap';
import {NavLink} from 'react-router-dom';

import logo from './logo.svg';
import appRoutes from "./routes/appRoutes";
import HeaderLinks from "./HeaderLinks";

export default class Sidebar extends Component {

    activeRoute(routeName) {
        return this.props.location.pathname === routeName ? "active" : "";
    }


    render(){

        return(
            <div id='sidebar' className="sidebar" data-color="black">
                <div className="logo">
                    <a
                        href="http://www.scampini.com.br"
                        className="simple-text logo-mini"
                    >
                        <div className="logo-img">
                            <img src={logo} alt="logo_image" />
                        </div>
                    </a>
                    <a
                        href="http://www.scampini.com.br"
                        className="simple-text logo-normal"
                    >
                        Safe Expenses
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        {/*null*/}
                        {appRoutes.map((prop, key) => {
                            if (!prop.redirect && !prop.hideFromSidebar){
                                return (
                                    <li
                                        className={this.activeRoute(prop.path)}
                                        key={key}
                                    >
                                        <NavLink
                                            exact
                                            to={prop.path}
                                            className="nav-link"
                                            activeClassName="active"
                                        >
                                            <i className={prop.icon} />
                                            <p>{prop.name}</p>
                                        </NavLink>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
            </div>

    );
    }
}
