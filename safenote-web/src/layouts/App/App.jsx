import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import {EventEmitter} from 'fbemitter';

// import Login from './Login';
// import HeaderBootstrap from './Header-Bootstrap';
// import Dashboard from './Dashboard';
// import Payment from "./Payment";
import Header from '../../Header';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../Sidebar';
import appRoutes from '../../routes/appRoutes';


const AppRouteWithProps = ({ component: Component, ...route}) => (
    <Route
        exact
        {...route}
        // path={route.path}
        //render={route.component}
        render={props => (
            // pass the sub-routes down to keep nesting
            <Component {...route } {...props}/>
            // key={key}/>
        )}
    />
);

class App extends Component {

    // guarda para repassar para outros componentes, que utilizarão o mesmo sistema de eventos
    _emitter = new EventEmitter();

    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            // o único componente que mostra mensagem fica na raiz da app
            _notificationSystem: null,
        };
    }

    componentDidMount(){
        this.setState({ _notificationSystem: this.refs.notificationSystem });
        var _notificationSystem = this.refs.notificationSystem;
        const TOPICO_MENSAGEM = 'mostraMensagem';
        // componentes que quiserem mostrar mensagens enviam um evento 'mostraMensagem' pelo emitter, que está escutando aqui
        this._emitter.addListener(TOPICO_MENSAGEM, (nivel, texto) => {
            _notificationSystem.addNotification({
                title: <span data-notify="icon" className="pe-7s-gift" />,
                message: (
                    <div>
                        {texto}
                    </div>
                ),
                level: `${nivel}`,
                position: "tr",
                autoDismiss: 4
            });
        });
    }

    render() {
        return (
            <div className="wrapper">
                <NotificationSystem ref="notificationSystem" />
                <Sidebar {...this.props} emitter={this._emitter}/>
                <div className="main-panel" ref="mainPanel">
                    <Header {...this.props} emitter={this._emitter} />
                    <Switch>
                        {appRoutes.map((props, key) => {
                            if(props.redirect)
                                return <Redirect from={props.path} to={props.to} key={key}/>;
                            else
                                return <AppRouteWithProps path={props.path} component={props.component} key={key} emitter={this._emitter} {...props}/>;
                        })}
                    </Switch>
                    <Footer />
                </div>
            </div>);
    }
}

export default App;
