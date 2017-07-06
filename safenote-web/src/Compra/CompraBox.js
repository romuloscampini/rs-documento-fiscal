/**
 * Created by romuloscampini.
 */
import React, { Component } from 'react';
import {
    Form,
    Grid,
    Row,
    Col,
    FormGroup,
    PageHeader,
    Button
} from 'react-bootstrap';
import Promise from 'es6-promise';
import { Icon } from 'react-fa';
import { LinkContainer } from 'react-router-bootstrap';
import urlApi from '../config/Routes';

import CompraTabela from "./CompraTabela";

const request = require('superagent-promise')(require('superagent'), Promise);

const getJson = (res) => {
    return res.body;
};

class CompraBox extends Component{

    constructor(props) {
        super(props);

        this.state = {
            compras: []
        };
    }

    componentWillMount(){
        request.get(urlApi.pagamento)
            .accept('application/json')
            .then(getJson)
            .then(dados => {
                console.log("Size de Dados: " + dados.length);
                console.log("Dados: " + dados);
                this.setState({compras: dados});
                // console.log('tamanho array: ' + this.state.compras.length);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render(){
            {/*<Grid bsClass="container-fluid">*/}
        return (
            <Grid>
                <Row style={{marginBottom: 15}}>
                    <Col xs={12} md={10} mdOffset={1}>
                        <Form horizontal>
                            <FormGroup>
                                <PageHeader>

                                    <small><h3>Pagamentos
                                    <LinkContainer to={'/form'} exact>
                                        <Button className="pull-right" bsStyle="success">
                                            <Icon name="plus"/> Novo Pagamento
                                        </Button>
                                    </LinkContainer>
                                    </h3></small>
                                </PageHeader>
                                <CompraTabela compras={this.state.compras} />

                                {/*<PageHeader><small><h4 className="rs-title">Informações de compra</h4></small></PageHeader>*/}
                                {/*<Button*/}
                                    {/*bsStyle="success">*/}
                                    {/*<Icon name="plus"/>*/}
                                    {/*<LinkContainer to={'/compras'}>*/}
                                        {/*Novo*/}
                                    {/*</LinkContainer>*/}
                                {/*</Button>*/}
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Grid>

        );
    }
}

export default CompraBox;