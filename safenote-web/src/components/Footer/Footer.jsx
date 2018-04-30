import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                {/*<Grid fluid>*/}
                <div className={"container-fluid"}>
                    <nav className="pull-left">
                        <ul>
                            <li>
                                <a href="#pablo">Dasboard</a>
                            </li>
                            <li>
                                <a href="#pablo">Company</a>
                            </li>
                            {/*<li>*/}
                                {/*<a href="#pablo">Portfolio</a>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                                {/*<a href="#pablo">Blog</a>*/}
                            {/*</li>*/}
                        </ul>
                    </nav>
                    <p className="copyright pull-right">
                        &copy; {new Date().getFullYear()}{" "}
                        Safe Expenses - <a href="http://www.scampini.com.br">Romulo Scampini</a>
                    </p>
                </div>
            </footer>
        );
    }
}

export default Footer;
