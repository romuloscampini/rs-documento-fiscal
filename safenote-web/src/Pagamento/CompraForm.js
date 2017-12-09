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
    ToggleButton,
    ToggleButtonGroup,
    Panel,
    ControlLabel,
    ButtonToolbar,
    Tooltip,
    OverlayTrigger,
    Modal
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import $ from 'jquery';
import request from 'superagent';
import { Icon } from 'react-fa';
import Dropzone from 'react-dropzone';
import Input from '../components/Input';
import InputDatePicker from '../components/InputDatePicker';
import DocumentoFormUpload from './DocumentoFormUpload';
import SelectBox from '../components/SelectBox';
import UploadBox from '../components/UploadBox';
import API_URL from '../config/Routes';
import DocumentoIcone from "./DocumentoIcone";

class CompraForm extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDocumentoChange = this.handleDocumentoChange.bind(this);
        this.handleChangePaymentDate = this.handleChangePaymentDate.bind(this);
        this.estadoInicial();
    }

    estadoInicial() {
        this.state = {
            showModalDocumento: false,
            edicao: false,
            pagamento: {
                tipo: "PRODUTO",
                classificacaoPagamento: "PESSOAL",
                statusPagamento: "PENDENTE"
            },
            documentos: []
        };
    }

    // onChangePaymentStatus = (value) => {
    //     this.setState({ pagamento['statusPagamento']: value });
    // };

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
            request.post(API_URL.pagamento + '/upload')
                .field('id', id)
                .attach('documento', doc.file)
                .field('tipoDocumento', doc.tipoDocumento)
                .end(function(err, res){
                    if(err){
                    }
                });

        });
    }

    closeModal = () => {
        this.setState({ showModalDocumento: false });
    }

    openModal = () => {
        this.setState({ showModalDocumento: true });
    }

    closeForm= () => {
        this.props.history.replace('/payment');
    }

    onChangePaymentStatus = () => {
        const pagamento = this.state.pagamento;
        let value = "";
        if(pagamento.statusPagamento == "PENDENTE"){
            value = "PAGO";
        } else {
            value = "PENDENTE";
            pagamento.dataPagamento = null;
        }
        pagamento.statusPagamento = value;
        this.setState({[pagamento]: pagamento});
    }

    handleChangePaymentDate(novoValor){
        const pagamento = this.state.pagamento;
        pagamento['dataPagamento'] = novoValor;

        // passando o nome da chave programaticamente usando []
        this.setState({[pagamento]: pagamento});
    }

    handleChange(propriedade, novoValor) {
        console.log('novo valor:', propriedade, novoValor);

        const pagamento = this.state.pagamento;
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
        // documentos.forEach(documento => {
        //     console.log(documento.tipoDocumento);
        // });
    }

    componentWillUpdate(){

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
        let url = API_URL.pagamento;

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
                this.uploadFile(response.id)
                // PubSub.publish('salvouCompra', response.mensagem);
                // PubSub.publish('mostraMensagemSucesso', 'Cadastro salvo com sucesso!');
                this.estadoInicial();
                //Retirar comentario
                // this.props.emitter.emit('mostraMensagem', 'success', 'Cadastro realizado com sucesso');
                this.closeForm();
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
                console.log(`props no error do ajax => ${this.props}`);
                this.props.emitter.emit('mostraMensagem', 'error', 'Não foi possível salvar');
                // this._notificationSystem.addNotification({
                //     title: 'Mensagem',
                //     message: 'Não foi possível salvar',
                //     level: 'warning',
                //     autoDismiss: 3
                // });
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

        let title = 'Informações de Pagamento';

        const tooltip = <Tooltip id="tooltip-dataPagamento">Informe a data de pagamento</Tooltip>;

        let inputDataPagamento = "";
        if(this.state.pagamento.statusPagamento == "PAGO"){
            inputDataPagamento =
                <InputDatePicker
                    propriedade="dataPagamento"
                    valor={this.state.pagamento.dataPagamento}
                    colSize={4}
                    calendarPlacement="top"
                    tooltip="Informe a data de pagamento"
                    tooltipPlacement="bottom"
                    handleChange={this.handleChange}
                />
        }else{
            inputDataPagamento = <span></span>;
        }

        const documentos = this.state.documentos;
        const documentosIcones = [];
        documentos.forEach(documento => {
            documentosIcones.push(<DocumentoIcone documento={documento}/>);
        });

        return (
            <div>
                <Grid >
                    <Row style={{marginBottom: 15}}>
                        <Col>
                            <PageHeader><h3>Pagamentos</h3></PageHeader>
                            {/*<Panel header={title}>*/}
                                <Form horizontal>
                                    <FormGroup>
                                        <Input propriedade="nomeProduto" label="Produto" valor={this.state.pagamento.nomeProduto} handleChange={this.handleChange}/>
                                        <Input propriedade="nomeLoja" label="Loja" valor={this.state.pagamento.nomeLoja} handleChange={this.handleChange}/>
                                        <Input propriedade="nomeFornecedor" label="Fornecedor" valor={this.state.pagamento.nomeFornecedor} handleChange={this.handleChange} />
                                        <InputDatePicker
                                            propriedade="dataCompra"
                                            label="Data de Compra"
                                            valor={this.state.pagamento.dataCompra}
                                            tooltip="Informe a data de compra ou cadastro"
                                            tooltipPlacement="top"
                                            handleChange={this.handleChange}
                                        />
                                        <InputDatePicker
                                            propriedade="dataVencimento"
                                            label="Data de Vencimento"
                                            valor={this.state.pagamento.dataVencimento}
                                            tooltip="Informe a data de vencimento"
                                            tooltipPlacement="top"
                                            handleChange={this.handleChange}
                                        />
                                        <Input propriedade="valor" label="Valor (R$)" valor={this.state.pagamento.valor} handleChange={this.handleChange} />
                                        <SelectBox propriedade="tipo" valor={this.state.pagamento.tipo} opcoes={opcoesTipo} label="Tipo" handleChange={this.handleChange}/>
                                        <SelectBox propriedade="classificacaoPagamento" valor={this.state.pagamento.classificacaoPagamento} opcoes={opcoesClassificacao} label="Classificação de Pagamento" handleChange={this.handleChange}/>
                                        <FormGroup controlId={'statusPagamento'}>
                                            <Col componentClass={ControlLabel} sm={2} className="rs-label">Status do Pagamento</Col>
                                            {/*<Col sm={2}/>*/}
                                            <Col sm={2}>
                                                <ButtonToolbar>
                                                    <ToggleButtonGroup
                                                        type="radio"
                                                        name="statusPagamento"
                                                        value={this.state.pagamento.statusPagamento}
                                                        onChange={this.onChangePaymentStatus}
                                                        >
                                                        <ToggleButton value="PENDENTE">Pendente</ToggleButton>
                                                        <ToggleButton value="PAGO">Pago</ToggleButton>
                                                    </ToggleButtonGroup>
                                                </ButtonToolbar>
                                            </Col>
                                            {inputDataPagamento}
                                        </FormGroup>
                                        <FormGroup>
                                            <Col sm={2}/>
                                            <Col>
                                                <ButtonToolbar>
                                                    <Button bsStyle="success" onClick={this.openModal.bind(this)}>
                                                        <Icon name="plus"/> Incluir Anexo
                                                    </Button>
                                                </ButtonToolbar>
                                            </Col>
                                        </FormGroup>
                                        {documentosIcones}
                                        <Modal show={this.state.showModalDocumento} onHide={this.closeModal} dialogClassName="documento-inserir-modal">
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
                                                <DocumentoFormUpload handleDocumentoChange={this.handleDocumentoChange} onHide={this.closeModal}/>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <div>
                                                    <ButtonToolbar>
                                                        <Button className="pull-left" bsStyle="default" onClick={this.closeModal}>
                                                            <Icon name="close"/> Cancelar
                                                        </Button>

                                                        <Button bsStyle="primary" onClick={this.closeModal}>
                                                            <Icon name="floppy-o"/> Incluir
                                                        </Button>
                                                    </ButtonToolbar>

                                                </div>
                                            </Modal.Footer>
                                        </Modal>
                                    <p></p>
                                    </FormGroup>
                                </Form>
                            {/*</Panel>*/}
                            <ButtonToolbar>
                                <LinkContainer to={'/payment'} exact>
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