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
    PageHeader
} from 'react-bootstrap';
import { Icon } from 'react-fa';
import FormCompraInput from './FormCompraInput';

class FormCompra extends Component {

    render() {
        var style = {
            textAlign: "center",
            borderBottom: "0px",
            fontWeight: "normal"
        };
        const titleInfoCompra = (
            <h3>Informações de Compra</h3>
        );

        const titleDocPagamento = (
            <h3>Documento para Pagamento</h3>
        );

        const titleComPagamento = (
            <h3>Comprovante de Pagamento</h3>
        );

        const titleDocFiscal = (
            <h3>Documento Fiscal (NF)</h3>
        );

        const titleRegFiscal = (
            <h3>Registro Fiscal (DARF)</h3>
        );

        return (
            <Grid>
                <Row style={{marginBottom: 15}}>
                    <Col lg={8} lgOffset={2}>
                        <PageHeader><small>Registro de Compra</small></PageHeader>
                        <Form horizontal>
                            <FormGroup>
                {/*<FormControl>*/}
                                <Panel header="Informações de Compra" bsStyle="primary">
                                    <FormCompraInput propriedade="nomeProduto" label="Produto" valor="" handleChange={this.handleChange} />
                                    <FormCompraInput propriedade="nomeLoja" label="Loja" valor="" handleChange={this.handleChange} />
                                    <FormCompraInput propriedade="nomeFornecedor" label="Fornecedor" valor="" handleChange={this.handleChange} />
                                    <FormCompraInput propriedade="dataCompra" label="Data de Compra" valor="" handleChange={this.handleChange} />
                                    <FormCompraInput propriedade="valor" label="Valor (R$)" valor="" handleChange={this.handleChange} />
                                </Panel>

                                <Panel header={titleComPagamento} bsStyle="primary">
                                    Panel content
                                </Panel>

                                <Panel header={titleDocFiscal} bsStyle="primary">
                                    Panel content
                                </Panel>

                                <Panel header={titleRegFiscal} bsStyle="primary">
                                    Panel content
                                </Panel>
                            {/*</FormControl>*/}
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Grid>
        );
    }
}

export default FormCompra;