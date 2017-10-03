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
    PanelGroup,
    ButtonToolbar,
    Modal
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import NotificationSystem from 'react-notification-system';
import $ from 'jquery';
import request from 'superagent';
import { Icon } from 'react-fa';
import Dropzone from 'react-dropzone';
import Input from '../components/Input';
import DocumentoFormUpload from './DocumentoFormUpload';
import SelectBox from '../components/SelectBox';
import UploadBox from '../components/UploadBox';
import PubSub from 'pubsub-js';
import urlAPI from '../config/Routes';

class CompraForm extends Component {

    _notificationSystem = null;

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDocumentoChange = this.handleDocumentoChange.bind(this);
        this.estadoInicial();
        console.log('Modal DEPOIS do estado inicial: ' + this.state.showModalDocumento);
    }

    estadoInicial() {
        this.state = {
            showModalDocumento: false,
            edicao: false,
            pagamento: {
                tipo: "PRODUTO",
                classificacaoPagamento: "PESSOAL"
            },
            documentos: []
        };
    }

    uploadFile(id) {
        // console.log('Accepted files: ', acceptedFiles);
        // let documentos = this.state.documentos;
        // documentos.push();
        // this.setState({
        //     documentos: []
        // });
        const documentos = this.state.documentos;

        console.log(id);
        console.log(documentos);

        // var form = new FormData();
        documentos.forEach(doc => {
            request.post(urlAPI.pagamento + '/upload')
                .field('id', id)
                .attach('documento', doc.file)
                .field('tipoDocumento', doc.tipoDocumento)
                .end(function(err, res){
                    console.log(res);
                    console.log(err);
                });

        });
    }

    close = () => {
        this.setState({ showModalDocumento: false });
    }

    open = () => {
        this.setState({ showModalDocumento: true });
        // this.props.selectCourse(this.props.course.identifier);
    }


    handleChange(propriedade, novoValor) {
        console.log('novo valor:', propriedade, novoValor);

        let pagamento = this.state.pagamento;
        pagamento[propriedade] = novoValor;

        // passando o nome da chave programaticamente usando []
        this.setState({[pagamento]: pagamento});

        console.log('handleChange', JSON.stringify(this.state.propriedade));
    }

    handleDocumentoChange(documento) {
        console.log(`chamando metodo form com valor: ${documento}`);
        const documentos = this.state.documentos;
        documentos.push(documento);
        // passando o nome da chave programaticamente usando []
        // this.setState({[documentos]: documentos});
        documentos.forEach(f => {
            console.log(f.tipoDocumento);
        });
    }

    componentWillUpdate(){
        console.log('ShowModal do didMount: '+ this.state.showModalDocumento);
        PubSub.subscribe('mostraModal', function(topico,valor){
            console.log('recebeu notificao modal: '+ this.state.showModalDocumento);
            this.setState({exibeModal: valor});
        });
    }

    componentDidMount(){
        this._notificationSystem = this.refs.notificationSystem;
    }

    salvarCompra(){
        console.log('Salvar model');

        const {edicao, pagamento } = this.state;
        const _id = this.props.pagamento ? this.props.pagamento._id : null;
        // const nomeProduto = this.ref.nomeProduto;

        // console.log('Sera que imprime nome ? '+ nomeProduto);

        // const compra = { nomeProduto, nomeLoja, nomeFornecedor, dataCompra, valor, tipo, categoria };

        let metodo = null;
        let url = urlAPI.pagamento;

        if (edicao) {
            url += '/' + _id;
            pagamento._id = _id;
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
            data: JSON.stringify(pagamento),
            contentType: 'application/json',
            type: metodo,
            // headers: {'x-access-token': this.props.token},
            success: (response) => {
                console.log(response, response.mensagem);
                this.uploadFile(response.id)
                // PubSub.publish('salvouCompra', response.mensagem);
                // PubSub.publish('mostraMensagemSucesso', 'Cadastro salvo com sucesso!');
                this.estadoInicial();
                this._notificationSystem.addNotification({
                    title: 'SafeNote',
                    message: 'Cadastro realizado com sucesso',
                    level: 'success',
                    autoDismiss: 3
                });
                console.log(this.state);
                // this.fechaFormulario();
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
                this._notificationSystem.addNotification({
                    title: 'Mensagem',
                    message: 'Não foi possível salvar',
                    level: 'warning',
                    autoDismiss: 3
                });
            },
            complete: (xhr, status) => {
                // this.setState({salvamentoEmProgresso: false});
            }
        });
    }

    render() {
        var style = {
            textAlign: "center",
            borderBottom: "0px",
            fontWeight: "normal"
        };

        const opcoesTipo = [
            {
                valor: 'PRODUTO',
                label: 'Produto'
            },
            {
                valor: 'SERVICO',
                label: 'Serviço'
            }
        ];
        const opcoesClassificacao = [
            {
                valor: 'PESSOAL',
                label: 'Pessoal'
            },
            {
                valor: 'GERAL',
                label: 'Geral'
            }

        ];

        let title = <h2>Informações de Pagamento</h2>;

        return (

            <div>
                <NotificationSystem ref="notificationSystem" />
            <Grid >
                <Row style={{marginBottom: 15}}>
                    <Col>
                    {/*<Col xs={12} md={10} mdOffset={1}>*/}
                        <PageHeader><h3>Pagamentos</h3></PageHeader>
                        <Panel header={title}>
                            <Form horizontal>
                                <FormGroup>
                                    <Input propriedade="nomeProduto" label="Produto" valor={this.state.pagamento.nomeProduto} handleChange={this.handleChange}/>
                                    <Input propriedade="nomeLoja" label="Loja" valor={this.state.pagamento.nomeLoja} handleChange={this.handleChange}/>
                                    <Input propriedade="nomeFornecedor" label="Fornecedor" valor={this.state.pagamento.nomeFornecedor} handleChange={this.handleChange} />
                                    <Input propriedade="dataCompra" label="Data de Compra" valor={this.state.pagamento.dataCompra} handleChange={this.handleChange} />
                                    <Input propriedade="valor" label="Valor (R$)" valor={this.state.pagamento.valor} handleChange={this.handleChange} />
                                    <SelectBox propriedade="tipo" valor={this.state.pagamento.tipo} opcoes={opcoesTipo} label="Tipo" handleChange={this.handleChange}/>
                                    <SelectBox propriedade="classificacaoPagamento" valor={this.state.pagamento.classificacaoPagamento} opcoes={opcoesClassificacao} label="Classificação de Pagamento" handleChange={this.handleChange}/>
                                    <FormGroup>
                                        <Col sm={1}/>
                                        <Col>
                                            <Button bsStyle="success" onClick={this.open.bind(this)}>
                                                <Icon name="paperclip"/> Anexar
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                    <Modal show={this.state.showModalDocumento} onHide={this.close} dialogClassName="documento-inserir-modal">
                                        <Modal.Header closeButton>
                                            <Modal.Title componentClass="h3">
                                                <div style={{textAlign: 'center', marginBottom: 0, marginTop: 0}}>
                                                    Anexar Documento
                                                    {/*<a href={`https://www.udemy.com/${course.identifier}`} target="_blank" rel="noopener noreferrer">*/}
                                                        {/*{course.title}*/}
                                                    {/*</a>*/}
                                                </div>
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <DocumentoFormUpload handleDocumentoChange={this.handleDocumentoChange} onHide={this.close}/>
                                        </Modal.Body>
                                    </Modal>

                                    {/*<Panel>*/}
                                        {/*<SelectBox propriedade="tipoDocumento" valor={this.state.documentos.tipoDocumento} opcoes={opcoesTipoDocumento} label="Tipo Documento" handleChange={this.handleChange}/>*/}
                                        {/*<Dropzone ref={(node) => { dropzoneRef = node; }} onDrop={this.uploadFile.bind(this)} multiple={false} disablePreview={true}>*/}
                                            {/*<h3> Arquivo anexo: </h3>*/}

                                            {/*<ul>*/}
                                                {/*{ this.state.documentos.map(f => <li>{f.name} - {f.size} bytes</li>)}*/}
                                            {/*</ul>*/}
                                            {/*<div>Try dropping some files here, or click to select files to upload.</div>*/}
                                        {/*</Dropzone>*/}
                                    {/*</Panel>*/}
                                {/*<Panel>*/}
                                    {/*<h4 className="rs-title">Documentos</h4>*/}
                                    {/*<Tabs defaultActiveKey={1}>*/}
                                        {/*<Tab eventKey={1} title="Boleto">*/}
                                            {/*<Dropzone ref={(node) => { dropzoneRef = node; }} onDrop={this.onDrop.bind(this)} multiple={false}>*/}
                                                {/*<h3> Arquivo anexo: </h3>*/}

                                                {/*<ul>*/}
                                                    {/*{ this.state.pagamento.documentosPagamento.documento.map(f => <li>{f.name} - {f.size} bytes</li>)}*/}
                                                {/*</ul>*/}
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
                                            {/*</Dropzone>*/}
                                            {/*<br/>*/}
                                            {/*<RSInput propriedade="documentosPagamento" tipo="file" label="Arquivo" valor={this.state.documentosPagamento.documento.data}/>*/}
                                            {/*<Button bsStyle="success" onClick={this.handleModalChange.bind(this)}>*/}
                                            {/*<Button bsStyle="success" onClick={() => { dropzoneRef.open() }}>*/}
                                                {/*<Icon name="plus"/> Anexar*/}
                                            {/*</Button>*/}
                                            {/*<ModalDocumento titulo="Incluir Boleto"*/}
                                                              {/*propriedade="boleto"*/}
                                                              {/*exibeModal={this.state.exibeModal}*/}
                                                              {/*handleChange={this.handleChange}>*/}
                                                {/*fecha={!this.state.showModal}>*/}
                                            {/*</ModalDocumento>*/}
                                        {/*</Tab>*/}
                                        {/*<Tab eventKey={2} title="Comprovante de Pag.">Tab 2 content</Tab>*/}
                                        {/*<Tab eventKey={3} title="NF" >Tab 3 content</Tab>*/}
                                        {/*<Tab eventKey={4} title="DARF/Outros" >Tab 3 content</Tab>*/}
                                    {/*</Tabs>*/}
                                {/*</Panel>*/}
                                <p></p>
                                </FormGroup>
                            </Form>
                        </Panel>
                        <ButtonToolbar>
                            <LinkContainer to={'/compras'} exact>
                                <Button className="pull-left" bsStyle="default">
                                    <Icon name="close"/> Cancelar
                                </Button>
                            </LinkContainer>

                            <Button bsStyle="primary" onClick={this.salvarCompra.bind(this)}>
                                <Icon name="floppy-o"/> Salvar
                            </Button>


                        </ButtonToolbar>

                    </Col>
            </Row>
        </Grid>
            </div>
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