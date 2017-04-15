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
import RSInput from './RSInput';
import PubSub from 'pubsub-js';

class RSModalDocumento extends Component {

    constructor(props){
        super(props);
        console.log('passando no constructor');
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

    //     console.log('passando no handleModalChange');
    //
    //     this.setState(prevState => ({
    //         exibe: !prevState.exibe
    //     }));
    //
    //     PubSub.publish('mostraModal', !this.state.exibe);
    //     // this.props.handleChange('showModal', !this.state.exibe);
    }

    // componentWillReceiveProps(nextProps){
    //     console.log('Vai receber props: ' + nextProps.exibe);
    //     this.setState({exibe: nextProps.exibe})
    // }

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
                                            <RSInput propriedade="nomeProduto" label="Produto" valor="" handleChange={this.handleChange} />
                                            <RSInput propriedade="nomeLoja" label="Loja" valor="" handleChange={this.handleChange} />
                                            <RSInput propriedade="nomeFornecedor" label="Fornecedor" valor="" handleChange={this.handleChange} />
                                            <RSInput propriedade="dataCompra" label="Data de Compra" valor="" handleChange={this.handleChange} />
                                            <RSInput propriedade="valor" label="Valor (R$)" valor="" handleChange={this.handleChange} />
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

export default RSModalDocumento;