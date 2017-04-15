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
    Tab,
    Nav,
    NavItem,
    InputGroup
} from 'react-bootstrap';
import $ from 'jquery';
import request from 'superagent';
import Dropzone from 'react-dropzone';
import { Icon } from 'react-fa';
import RSInput from './components/RSInput';
import RSModalDocumento from './components/RSModalDocumento';
import RSSelectBox from './components/RSSelectBox';
import PubSub from 'pubsub-js';

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
                edicao:         true,
                exibeModal:     false,
                nomeProduto:    this.props.compra.nomeProduto,
                nomeLoja:       this.props.compra.nomeLoja,
                nomeFornecedor: this.props.compra.nomeFornecedor,
                dataCompra:     this.props.compra.dataCompra,
                valor:          this.props.compra.valor,
                tipo:           this.props.compra.tipo,
                categoria:      this.props.compra.categoria
                // documentosPagamento: {
                //     documento:
                // }
            }
        }else{
            this.state = {
                edicao:         false,
                exibeModal:     false,
                nomeProduto:    '',
                nomeLoja:       '',
                nomeFornecedor: '',
                dataCompra:     '',
                valor:          '',
                tipo:           'PRODUCT',
                categoria:      '',
                documentosPagamento: {
                    documento:{
                        data: '',
                        contentType: ''
                    }
                }
            }
        }
    }

    onDrop(acceptedFiles, rejectedFiles) {
        console.log('Accepted files: ', acceptedFiles);
        console.log('Rejected files: ', rejectedFiles);
        let urlAPI = 'http://localhost:3005/compras';
        var req = request.post(urlAPI + '/upload');
        acceptedFiles.forEach((file)=> {
            req.attach(file.name, file);
        });
        req.end(function(err, res){
            console.log(res);
        });
    }

    handleChange(propriedade, novoValor) {
        console.log('novo valor:', propriedade, novoValor);

        // passando o nome da chave programaticamente usando []
        this.setState({[propriedade]: novoValor});

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
        console.log('Salvar compra');

        const {edicao, nomeProduto, nomeLoja, nomeFornecedor, dataCompra, valor, tipo, categoria } = this.state;
        const _id = this.props.compra ? this.props.compra._id : null;

        const compra = { nomeProduto, nomeLoja, nomeFornecedor, dataCompra, valor, tipo, categoria };

        let urlAPI = 'http://localhost:3005/compras/';

        let metodo = null;

        if (edicao) {
            urlAPI += _id;
            compra._id = _id;
            metodo = 'PUT';
        } else {
            urlAPI += 'criar';
            metodo = 'POST';
        }

        // http://stackoverflow.com/questions/12693947/jquery-ajax-how-to-send-json-instead-of-querystring
        $.ajax({
            url: urlAPI,
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

        return (
            <Grid bsClass="container-fluid">
                <Row style={{marginBottom: 15}}>
                    <Col lg={9} lgOffset={3}>
                        <Form horizontal>
                            <FormGroup>
                                <PageHeader>Compra</PageHeader>
                                <PageHeader><small><h4 className="rs-title">Informações de compra</h4></small></PageHeader>
                                <RSInput propriedade="nomeProduto" label="Produto" valor={this.state.nomeProduto}  handleChange={this.handleChange}/>
                                <RSInput propriedade="nomeLoja" label="Loja" valor={this.state.nomeLoja}  handleChange={this.handleChange}/>
                                <RSInput propriedade="nomeFornecedor" label="Fornecedor" valor={this.state.nomeFornecedor} handleChange={this.handleChange} />
                                <RSInput propriedade="dataCompra" label="Data de Compra" valor={this.state.dataCompra} handleChange={this.handleChange} />
                                <RSInput propriedade="valor" label="Valor (R$)" valor={this.state.valor} handleChange={this.handleChange} />
                                <RSSelectBox propriedade="tipo" valor={this.state.tipo} opcoes={opcoes} label="Tipo de Compra" handleChange={this.handleChange}/>
                                <PageHeader><small><h4 className="rs-title">Documentos</h4></small></PageHeader>
                                <Row>
                                    <Col lg={8} lgOffset={0}>
                                        <Jumbotron>
                                            <br/>
                                            <Tab.Container id="left-tabs" defaultActiveKey="boleto">
                                                <Row className="clearfix" style={{marginLeft: -50, marginTop: -30}}>
                                                    <Col sm={4} smOffset={0}>
                                                        <Nav bsStyle="pills" stacked>
                                                            {/*<NavItem eventKey="tab-title" disabled>*/}
                                                                {/*Tipo de Documento*/}
                                                            {/*</NavItem>*/}
                                                            <NavItem eventKey="boleto">
                                                                Boleto
                                                            </NavItem>
                                                            <NavItem eventKey="comprovantePagamento">
                                                                Comprovante de Pagamento
                                                            </NavItem>
                                                            <NavItem eventKey="documentoFiscal">
                                                                Documento Fiscal (NF)
                                                            </NavItem>
                                                            <NavItem eventKey="registroFiscal">
                                                                Registro Fiscal (DARF)
                                                            </NavItem>
                                                        </Nav>
                                                    </Col>
                                                    <Col sm={7}>
                                                        <Tab.Content animation>
                                                            <Tab.Pane eventKey="boleto">
                                                                <Dropzone onDrop={this.onDrop} multiple={false}>
                                                                    {/*{({ isDragActive, isDragReject }) => {*/}
                                                                        {/*if (isDragActive) {*/}
                                                                            {/*return "This file is authorized";*/}
                                                                        {/*}*/}
                                                                        {/*if (isDragReject) {*/}
                                                                            {/*return "This file is not authorized";*/}
                                                                        {/*}*/}
                                                                        {/*return "Try dropping some files";*/}
                                                                    {/*}}*/}
                                                                    <div>Try dropping some files here, or click to select files to upload.</div>
                                                                </Dropzone>
                                                                {/*<RSInput propriedade="documentosPagamento" tipo="file" label="Arquivo" valor={this.state.documentosPagamento.documento.data}/>*/}
                                                                <p>Documentos adicionados: 0</p>
                                                                <Button bsStyle="success" onClick={this.handleModalChange.bind(this)}>
                                                                    <Icon name="plus"/> Incluir
                                                                </Button>
                                                                <RSModalDocumento titulo="Incluir Boleto"
                                                                                  propriedade="boleto"
                                                                                  exibeModal={this.state.exibeModal}
                                                                                  handleChange={this.handleChange}>
                                                                                  {/*fecha={!this.state.showModal}>*/}
                                                                </RSModalDocumento>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="comprovantePagamento">
                                                                <p>Documentos adicionados: 0</p>
                                                                <Button bsStyle="success" onClick={this.handleModalChange.bind(this)}>
                                                                    <Icon name="plus"/> Incluir
                                                                </Button>
                                                                {/*<RSModalDocumento titulo="Comprovante de Pagamento"*/}
                                                                                  {/*propriedade="comprovantePagamento"*/}
                                                                                  {/*exibe={this.state.showModal}>*/}
                                                                                  {/*/!*fecha={this.closeModalDocPagamento}>*!/*/}
                                                                {/*</RSModalDocumento>*/}
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="documentoFiscal">
                                                                <p>Documentos adicionados: 0</p>
                                                                <Button bsStyle="success" onClick={this.handleModalChange.bind(this)}>
                                                                    <Icon name="plus"/> Incluir
                                                                </Button>
                                                                {/*<RSModalDocumento titulo="Documento Fiscal"*/}
                                                                                  {/*propriedade="docFiscal"*/}
                                                                                  {/*exibe={this.state.showModal}>*/}
                                                                {/*</RSModalDocumento>*/}
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="registroFiscal">
                                                                <p>Documentos adicionados: 0</p>
                                                                <Button bsStyle="success" onClick={this.handleModalChange.bind(this)}>
                                                                    <Icon name="plus"/> Incluir
                                                                </Button>
                                                                {/*<RSModalDocumento titulo="Registro Fiscal"*/}
                                                                                  {/*propriedade="regFiscal"*/}
                                                                                  {/*exibe={this.state.showModal}>*/}
                                                                {/*</RSModalDocumento>*/}
                                                            </Tab.Pane>
                                                        </Tab.Content>
                                                    </Col>
                                                </Row>
                                            </Tab.Container>
                                        </Jumbotron>
                                    </Col>
                                </Row>
                                <p></p>
                                <Button bsStyle="primary" onClick={this.salvarCompra.bind(this)}>
                                    Salvar
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