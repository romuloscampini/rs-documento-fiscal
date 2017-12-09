import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import {EventEmitter} from 'fbemitter';

import Header from './Header';
import Home from './Home';
import Payment from "./Payment";

class App extends Component {

    // o único componente que mostra mensagem fica na raiz da app
    _notificationSystem = null;

    // guarda para repassar para outros componentes, que utilizarão o mesmo sistema de eventos
    _emitter = new EventEmitter();


    constructor(props){
        super(props);
    }

    componenDidMount(){
        this._notificationSystem = this.refs.notificationSystem;
        const TOPICO_MENSAGEM = 'mostraMensagem';

        // this._emitter.subscribe(TOPICO_MOSTRA_MENSAGEM, (nivel, texto) => {
        //     console.log('CHEGOU NO TOPICO');
        //     this._notificationSystem.addNotification({
        //         message: texto,
        //         level: nivel,
        //         position: 'tc',
        //         autoDismiss: 3
        //     });
        // });
        //
        // this._emitter.publish(TOPICO_MOSTRA_MENSAGEM, 'success');

        // componentes que quiserem mostrar mensagens enviam um evento 'mostraMensagem' pelo emitter, que está escutando aqui
        this._emitter.addListener(TOPICO_MENSAGEM, (nivel, texto) => {
            this._notificationSystem.addNotification({
                message: texto,
                level: nivel,
                position: 'tc',
                autoDismiss: 3
            });
        });

    }

    render() {
        return (
            <div style={{marginBottom: 20}}>
                <NotificationSystem ref="notificationSystem" />
                <Router>
                    <div>
                    <Header/>
                    <Route
                        exact
                        path='/'
                        render={(props) => <Home {...props} emitter={this._emitter}  />}
                    />
                    <Route
                        path='/payment'
                        render={(props) => <Payment {...props} emitter={this._emitter}  />}
                    />
                    </div>
                    {/*<Route*/}
                        {/*path='/form'*/}
                        {/*render={(props) => <CompraForm {...props} emmiter={this._emitter} />}*/}
                    {/*/>*/}
                </Router>
            </div>
        );
    }
}

export default App;
