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
    Jumbotron,
    Tabs,
    Tab,
    Nav,
    NavItem,
    Panel,
    PanelGroup
} from 'react-bootstrap';
import $ from 'jquery';
import request from 'superagent';
import Dropzone from 'react-dropzone';
import { Icon } from 'react-fa';
import Input from '../components/Input';
import ModalDocumento from '../components/ModalDocumento';
import SelectBox from '../components/SelectBox';
import PubSub from 'pubsub-js';
import urlAPI from '../config/Routes';

class CompraForm extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.estadoInicial();
        this.handleModalChange = this.handleModalChange.bind(this);
        console.log('Modal DEPOIS do estado inicial: ' + this.state.showModal);
    }

    estadoInicial() {
        if (this.props.compra){
            this.state = {
                edicao: true,
                exibeModal: false,
                compra: {
                    nomeProduto: this.props.compra.nomeProduto,
                    nomeLoja: this.props.compra.nomeLoja,
                    nomeFornecedor: this.props.compra.nomeFornecedor,
                    dataCompra: this.props.compra.dataCompra,
                    valor: this.props.compra.valor,
                    tipo: this.props.compra.tipo,
                    categoria: this.props.compra.categoria
                    // documentosPagamento: {
                    //     documento:
                    // }
                },
                documentosPagamento: {
                    documento: []
                }
            }
        }else {
            this.state = {
                edicao: false,
                exibeModal: false,
                compra: {
                    documentosPagamento: {
                        documento: []
                    }
                }
            }
        }
    }

    onDrop(acceptedFiles, rejectedFiles) {
        console.log('Accepted files: ', acceptedFiles);
        console.log('Rejected files: ', rejectedFiles);

        this.setState({ compra: { documentosPagamento: { documento: acceptedFiles}}});
        // var req = request.post(urlAPI.pagamento + '/upload');
        // acceptedFiles.forEach((file)=> {
        //     req.attach(file.name, file);
        // });
        // req.end(function(err, res){
        //     console.log(res);
        // });
    }

    handleChange(propriedade, novoValor) {
        console.log('novo valor:', propriedade, novoValor);

        let compra = this.state.compra;
        compra[propriedade] = novoValor;

        // passando o nome da chave programaticamente usando []
        this.setState({[compra]: compra});

        console.log('handleChange', JSON.stringify(this.state.propriedade));
    }

    componentWillUpdate(){
        console.log('ShowModal do didMount: '+ this.state.showModal);
        PubSub.subscribe('mostraModal', function(topico,valor){
            console.log('recebeu notificao modal: '+ this.state.showModal);
            this.setState({exibeModal: valor});
        });
    }

    salvarCompra(){
        console.log('Salvar model');

        const {edicao, compra } = this.state;
        const _id = this.props.compra ? this.props.compra._id : null;

        // const compra = { nomeProduto, nomeLoja, nomeFornecedor, dataCompra, valor, tipo, categoria };

        let metodo = null;
        let url = urlAPI.pagamento;

        if (edicao) {
            url += '/' + _id;
            compra._id = _id;
            metodo = 'PUT';
        } else {
            console.log(url);
            url += '/salvar';
            console.log(url);
            metodo = 'POST';
        }

        // http://stackoverflow.com/questions/12693947/jquery-ajax-how-to-send-json-instead-of-querystring
        $.ajax({
            url: url,
            data: JSON.stringify(compra),
            contentType: 'application/json',
            type: metodo,
            // headers: {'x-access-token': this.props.token},
            success: (response) => {
                console.log(response, response.mensagem);

                PubSub.publish('salvouCompra', response.mensagem);
                PubSub.publish('mostraMensagemSucesso', 'Cadastro salvo com sucesso!');
                this.estadoInicial();
                console.log(this.state);
                // this.fechaFormulario();
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            },
            complete: (xhr, status) => {
                // this.setState({salvamentoEmProgresso: false});
            }
        });
    }

    handleModalChange() {
        console.log('Passando no handleModalChange principal: [ATUAL] ' + this.state.exibeModal);
        this.setState(prevState => ({
            exibeModal: !prevState.exibeModal
        }));
        console.log('Passando no handleModalChange principal: [NUEVO] ' + this.state.exibeModal);
    }

    render() {
        var style = {
            textAlign: "center",
            borderBottom: "0px",
            fontWeight: "normal"
        };

        const opcoes = [
            {
                valor: 'PRODUCT',
                label: 'Produto'
            },
            {
                valor: 'SERVICE',
                label: 'Serviço'
            }
            ];

        let dropzoneRef;

        return (
            <Grid bsClass="container-fluid">
                <Row style={{marginBottom: 15}}>
                    <Col lg={8} lgOffset={2}>
                        <Form horizontal>
                            <FormGroup>
                                <PageHeader><h3>Pagamentos</h3></PageHeader>
                                <PageHeader>
                                    <small><h4 className="rs-title">Informações de compra</h4></small>
                                </PageHeader>
                                <Input propriedade="nomeProduto" label="Produto" valor={this.state.compra.nomeProduto} handleChange={this.handleChange}/>
                                <Input propriedade="nomeLoja" label="Loja" valor={this.state.compra.nomeLoja} handleChange={this.handleChange}/>
                                <Input propriedade="nomeFornecedor" label="Fornecedor" valor={this.state.compra.nomeFornecedor} handleChange={this.handleChange} />
                                <Input propriedade="dataCompra" label="Data de Compra" valor={this.state.compra.dataCompra} handleChange={this.handleChange} />
                                <Input propriedade="valor" label="Valor (R$)" valor={this.state.compra.valor} handleChange={this.handleChange} />
                                <SelectBox propriedade="tipo" valor={this.state.compra.tipo} opcoes={opcoes} label="Tipo de Compra" handleChange={this.handleChange}/>
                                <Panel>
                                    <h4 className="rs-title">Documentos</h4>
                                    <Tabs defaultActiveKey={1}>
                                        <Tab eventKey={1} title="Boleto">
                                            <Dropzone ref={(node) => { dropzoneRef = node; }} onDrop={this.onDrop.bind(this)} multiple={false}>
                                                <h3> Arquivo anexo: </h3>

                                                <ul>
                                                    { this.state.compra.documentosPagamento.documento.map(f => <li>{f.name} - {f.size} bytes</li>)}
                                                </ul>
                                                {/*/!*{({ isDragActive, isDragReject }) => {*!/*/}
                                                {/*/!*if (isDragActive) {*!/*/}
                                                {/*/!*return "This file is authorized";*!/*/}
                                                {/*/!*}*!/*/}
                                                {/*/!*if (isDragReject) {*!/*/}
                                                {/*/!*return "This file is not authorized";*!/*/}
                                                {/*/!*}*!/*/}
                                                {/*/!*return "Try dropping some files";*!/*/}
                                                {/*/!*}}*!/*/}
                                                {/*/!*<div>Try dropping some files here, or click to select files to upload.</div>*!/*/}
                                                {/*/!*<p>Documentos adicionados: 0</p>*!/*/}
                                            </Dropzone>
                                            <br/>
                                            {/*<RSInput propriedade="documentosPagamento" tipo="file" label="Arquivo" valor={this.state.documentosPagamento.documento.data}/>*/}
                                            {/*<Button bsStyle="success" onClick={this.handleModalChange.bind(this)}>*/}
                                            <Button bsStyle="success" onClick={() => { dropzoneRef.open() }}>
                                                <Icon name="plus"/> Anexar
                                            </Button>
                                            <ModalDocumento titulo="Incluir Boleto"
                                                              propriedade="boleto"
                                                              exibeModal={this.state.exibeModal}
                                                              handleChange={this.handleChange}>
                                                {/*fecha={!this.state.showModal}>*/}
                                            </ModalDocumento>
                                        </Tab>
                                        <Tab eventKey={2} title="Comprovante de Pag.">Tab 2 content</Tab>
                                        <Tab eventKey={3} title="NF" >Tab 3 content</Tab>
                                        <Tab eventKey={4} title="DARF/Outros" >Tab 3 content</Tab>
                                    </Tabs>
                                </Panel>
                                <p></p>
                                <Button bsStyle="primary" onClick={this.salvarCompra.bind(this)}>
                                    <Icon name="floppy-o"/> Salvar
                                </Button>
                            </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Grid>
        );
    }
}


// class CompraBox extends Component {
//     render(){
//         return (
//           <div>
//               <FormularioCompra/>
//           </div>
//         );
//     }
// }

export default CompraForm;