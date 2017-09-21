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
import Input from './Input';
import PubSub from 'pubsub-js';

class ModalDocumento extends Component {

    constructor(props){
        super(props);
        // this.state = {exibe: this.props.exibe};
        this.handleChange = this.handleChange.bind(this);
        this.handleModalChange = this.handleModalChange.bind(this);
    }

    handleChange(event) {
        console.log('Handle change: ' + this.props.propriedade + ' && Valor: ' + event.target.value);
        this.props.handleChange(this.props.propriedade, event.target.value);
    }


    handleModalChange(event) {
        this.props.handleChange('exibeModal', event.target.value);
    }

    render() {
        var style = {
            textAlign: "center",
            borderBottom: "0px",
            fontWeight: "normal"
        };

        if(!this.props.exibeModal){
            return null;
        }

        console.log('Passou do state null');

        return (
            <FormGroup key={this.props.propriedade}>
                <Modal show={this.props.exibeModal} onHide={this.handleModalChange}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.titulo}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid>
                            <Row style={{marginBottom: 15}}>
                                <Col lg={6} lgOffset={1}>
                                    <Form horizontal>
                                        <FormGroup>
                                            <Input propriedade="nomeProduto" label="Produto" valor="" handleChange={this.handleChange} />
                                            <Input propriedade="nomeLoja" label="Loja" valor="" handleChange={this.handleChange} />
                                            <Input propriedade="nomeFornecedor" label="Fornecedor" valor="" handleChange={this.handleChange} />
                                            <Input propriedade="dataCompra" label="Data de Compra" valor="" handleChange={this.handleChange} />
                                            <Input propriedade="valor" label="Valor (R$)" valor="" handleChange={this.handleChange} />
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </Grid>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleModalChange}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </FormGroup>
        );
    }
}

export default ModalDocumento;