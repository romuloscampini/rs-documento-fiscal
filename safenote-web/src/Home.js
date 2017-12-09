/**
 * Created by romuloscampini.
 */
import React, { Component } from 'react';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';

class Home extends Component{

    constructor(props){
        super(props);
        console.log(props);
    }

    render(){
        return(
            <div className="content" id="content">
                <Grid bsClass="container-fluid">
                    <Row style={{marginBottom: 15}}>
                        <Col lg={8} lgOffset={4}>
                            <h2>Bem vindo ao sistema de Controle Fiscal</h2>
                            <h4>Dashboard</h4>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Home;