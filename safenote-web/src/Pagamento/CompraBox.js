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
    Button,
    ControlLabel,
    ButtonToolbar,
    Panel
} from 'react-bootstrap';
import Promise from 'es6-promise';
import { Icon } from 'react-fa';
import { LinkContainer } from 'react-router-bootstrap';
import urlApi from '../config/Routes';

import CompraTabela from "./CompraTabela";
import Input from "../components/Input";
import SelectBox from "../components/SelectBox";

const request = require('superagent-promise')(require('superagent'), Promise);

const getJson = (res) => {
    return res.body;
};

class PagamentoBusca extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSearching: false,
            nomeProduto: '',
            sexo: '',
            dataNascimento: '',
            protocolo: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(activeKey) {
        console.log(activeKey);
        this.props.handleSelect({activeKey: activeKey});
    }

    handleChoose(opcao) {
        this.setState({sexo: opcao ? opcao.value : ''});
    }

    handleChange(propriedade, novoValor) {
        console.log('novo valor:', propriedade, novoValor);
        this.setState({[propriedade]: novoValor});
    }

    render() {
        let isSearching = this.state.isSearching;

        return (
            <Form>
                <Row>
                    <Input
                        size={3}
                        tipo="input"
                        propriedade="nome"
                        valor={this.state.nomeProduto}
                        label="Nome do Produto"
                        handleChange={this.handleChange}/>
                </Row>

                <ButtonToolbar>
                    <Button
                        // onClick={!isSearching ? this.handleClick : null}>
                        type="submit"
                        bsStyle="primary"
                        disabled={isSearching}>
                        <Icon name="search"/>
                        {isSearching ? ' Procurando...' : ' Procurar'}
                    </Button>

                    <Button
                        // onClick={this.limpaCampos}>
                        type="submit"
                        bsStyle="default">
                        <Icon name="eraser"/>
                        {' Limpar campos'}
                    </Button>
                </ButtonToolbar>

            </Form>
        );
    }
}
class CompraBox extends Component{

    constructor(props) {
        super(props);

        this.state = {
            pagamentos: []
        };
    }

    componentWillMount(){
        request.get(urlApi.pagamento)
            .accept('application/json')
            .then(getJson)
            .then(dados => {
                console.log("Size de Dados: " + dados.length);
                console.log("Dados: " + dados);
                this.setState({pagamentos: dados});
                // console.log('tamanho array: ' + this.state.compras.length);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
            {/*<Grid bsClass="container-fluid">*/}
        return (
            <Grid>
                <Row style={{marginBottom: 15}}>
                    {/*<Col xs={12} md={10} mdOffset={1}>*/}
                    <Col>
                        <Form horizontal>
                            <PageHeader>
                                <small><h3>Pagamentos
                                <LinkContainer to={'/form'} exact className="pull-right">
                                    <Button className="pull-right" bsStyle="success">
                                        <Icon name="plus"/> Novo Pagamento
                                    </Button>
                                </LinkContainer>
                                </h3></small>
                            </PageHeader>
                            <Panel header="Busca de Pagamentos">
                                <PagamentoBusca/>
                            </Panel>

                            <Panel header="Lista de Pagamentos">
                                    <CompraTabela pagamentos={this.state.pagamentos} />
                                </Panel>
                        </Form>
                    </Col>
                </Row>
            </Grid>

        );
    }
}

export default CompraBox;