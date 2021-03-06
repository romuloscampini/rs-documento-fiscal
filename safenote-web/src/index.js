import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
// import 'bootstrap/dist/css/bootstrap-theme.css';
// import './assets/css/bootstrap.min.css';
// import './index.css';
import './assets/css/demo.css';
import indexRoutes from "./routes/indexRoutes";

// import './styles/css/sb-admin.css';

ReactDOM.render(
    <HashRouter>
        <Switch>
            {indexRoutes.map((prop, key) => {
                return <Route to={prop.path} component={prop.component} key={key} />;
            })}
        </Switch>
    </HashRouter>,
    document.getElementById('root')
);
