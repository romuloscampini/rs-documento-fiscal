/**
 * Created by romuloscampini.
 */
import React, { Component } from 'react';
import {
    Panel,
    Form,
    FormGroup,
    FormControl,
    Grid,
    Row,
    Col,
    PageHeader,
    Modal,
    Button
} from 'react-bootstrap';
import { Icon } from 'react-fa';
import RSInput from './components/RSInput';

class FormDocPagamento extends Component {

    constructor(){
        super();
        this.showModal = this.showModal.bind(this);
    }

    showModal(event) {
        this.props.showModal(this.props.exibe, event.target.value);
    }

    fechaConfirmacaoRemocao() {
        this.setState({mostraConfirmacaoRemocao: false});
    }

    render() {
        var style = {
            textAlign: "center",
            borderBottom: "0px",
            fontWeight: "normal"
        };

        console.log(this.props);

        return (

        <Modal show={this.props.exibe} onHide={this.props.fecha}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Grid>
                    <Row style={{marginBottom: 15}}>
                        <Col lg={8} lgOffset={3}>
                            <Form horizontal>
                                <FormGroup>
                                    <PageHeader>Compra</PageHeader>
                                    <PageHeader><small><h3>Informações de compra</h3></small></PageHeader>

                                    <RSInput propriedade="nomeProduto" label="Produto" valor="" handleChange={this.handleChange} />
                                    <RSInput propriedade="nomeLoja" label="Loja" valor="" handleChange={this.handleChange} />
                                    <RSInput propriedade="nomeFornecedor" label="Fornecedor" valor="" handleChange={this.handleChange} />
                                    <RSInput propriedade="dataCompra" label="Data de Compra" valor="" handleChange={this.handleChange} />
                                    <RSInput propriedade="valor" label="Valor (R$)" valor="" handleChange={this.handleChange} />

                                    <PageHeader><small><h4>Documento para Pagamento</h4></small></PageHeader>
                                    <Button bsStyle="primary"> <Icon name="plus" />Incluir</Button>
                                    <PageHeader><small><h4>Comprovante de Pagamento</h4></small></PageHeader>
                                    <PageHeader><small><h4>Documento Fiscal (NF)</h4></small></PageHeader>
                                    <PageHeader><small><h4>Registro Fiscal (DARF)</h4></small></PageHeader>


                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Grid>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default FormDocPagamento;