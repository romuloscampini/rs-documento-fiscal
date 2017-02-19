/**
 * Created by romuloscampini.
 */
import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    Grid,
    Row,
    Col,
    PageHeader,
    Button,
    Jumbotron
} from 'react-bootstrap';
import { Icon } from 'react-fa';
import RSInput from './components/RSInput';
import FormDocPagamento from './FormDocPagamento';
import PubSub from 'pubsub-js';

class FormCompra extends Component {

    constructor(props){
        super(props);
        this.state = { showModal : false};
        this.showModalDocPagamento = this.showModalDocPagamento.bind(this);
    }

    showModalDocPagamento(){
        this.setState({showModal: true});
    }

    closeModalDocPagamento(){
        this.setState({showModal: false});
    }

    render() {
        var style = {
            textAlign: "center",
            borderBottom: "0px",
            fontWeight: "normal"
        };

        return (
            <Grid bsClass="container-fluid">
                <Row style={{marginBottom: 15}}>
                    <Col lg={9} lgOffset={3}>
                        <Form horizontal>
                            <FormGroup>
                                <PageHeader>Compra</PageHeader>
                                <PageHeader><small><h3 className="rs-title">Informações de compra</h3></small></PageHeader>
                                    <RSInput propriedade="nomeProduto" label="Produto" valor="" handleChange={this.handleChange} />
                                    <RSInput propriedade="nomeLoja" label="Loja" valor="" handleChange={this.handleChange} />
                                    <RSInput propriedade="nomeFornecedor" label="Fornecedor" valor="" handleChange={this.handleChange} />
                                    <RSInput propriedade="dataCompra" label="Data de Compra" valor="" handleChange={this.handleChange} />
                                    <RSInput propriedade="valor" label="Valor (R$)" valor="" handleChange={this.handleChange} />

                                <PageHeader><small><h4 className="rs-title">Documentos</h4></small></PageHeader>
                                <Row>
                                    <Col lg={5} lgOffset={0}>
                                        <Jumbotron className="rs-title">
                                            <p>Documento para Pagamento</p>
                                            <p>
                                                <Button bsStyle="success" onClick={this.showModalDocPagamento.bind(this)}>
                                                    <Icon name="plus"/> Incluir
                                                </Button>
                                                <FormDocPagamento exibe={this.state.showModal} fecha={this.state.showModal}></FormDocPagamento>
                                            </p>
                                        </Jumbotron>
                                    </Col>
                                    <Col lg={5} lgOffset={0}>
                                        <Jumbotron className="rs-title ">
                                            <p>Comprovante de Pagamento</p>
                                            <p>
                                                <Button bsStyle="success"><Icon name="plus"/> Incluir </Button>
                                            </p>
                                        </Jumbotron>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={5} lgOffset={0}>
                                        <Jumbotron className="rs-title">
                                            <p>Documento Fiscal (NF)</p>
                                            <p>
                                                <Button bsStyle="success"><Icon name="plus"/> Incluir</Button>
                                            </p>
                                        </Jumbotron>
                                    </Col>
                                    <Col lg={5} lgOffset={0}>
                                        <Jumbotron className="rs-title ">
                                            <p>Registro Fiscal (DARF)</p>
                                            <p>
                                                <Button bsStyle="success"><Icon name="plus"/> Incluir </Button>
                                            </p>
                                        </Jumbotron>
                                    </Col>
                                </Row>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Grid>
        );
    }
}

export default FormCompra;