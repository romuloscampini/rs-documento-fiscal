/**
 * Created by romuloscampini.
 */
import React, {Component} from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    Grid,
    Row,
    Col,
    PageHeader,
    Button,
    ButtonGroup,
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
import {LinkContainer} from 'react-router-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import $ from 'jquery';
import request from 'superagent';
import {Icon} from 'react-fa';
import Dropzone from 'react-dropzone';
import Input from '../../components/Input';
import FormInputDate from '../../components/FormInputDate/FormInputDate';
import DocumentoFormUpload from './DocumentoFormUpload';
import FormInputSelect from '../../components/FormInputSelect/FormInputSelect';
import UploadBox from '../../components/UploadBox';
import API_URL from '../../config/apiRoutes';
import DocumentoIcone from './DocumentoIcone';
import Card from '../../components/Card/Card';
import FormInputs from '../../components/FormInputs/FormInputs';

class CompraForm extends Component {

    constructor(props) {
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
                nomeProduto: '',
                nomeLoja: '',
                nomeFornecedor: '',
                dataOcorrenciaDespesa: new Date().toISOString(),
                dataVencimento: new Date().toISOString(),
                dataPagamento: new Date().toISOString(),
                valor: '',
                origemDespesa: 'COMPRA',
                tipoDespesa: 'PRODUTO',
                classificacaoDespesa: 'PESSOAL',
                status: 'PENDENTE'
            },
            documentos: []
        };
    }

    // onChangePaymentStatus = (value) => {
    //     this.setState({ expenses['statusPagamento']: value });
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
            request.post(API_URL.expenses + '/upload')
                .field('id', id)
                .attach('documento', doc.file)
                .field('tipoDocumento', doc.tipoDocumento)
                .end(function (err, res) {
                    if (err) {
                    }
                });

        });
    }

    closeModal = () => {
        this.setState({showModalDocumento: false});
    }

    openModal = () => {
        this.setState({showModalDocumento: true});
    }

    closeForm = () => {
        this.props.history.replace('/expenses/list');
    }

    onChangePaymentStatus = () => {
        const pagamento = this.state.pagamento;
        let value = '';
        if (pagamento.status == 'PENDENTE') {
            value = 'PAGO';
        } else {
            value = 'PENDENTE';
            pagamento.dataPagamento = null;
        }
        pagamento.status = value;
        this.setState({[pagamento]: pagamento});
    }

    handleChangePaymentDate(novoValor) {
        const pagamento = this.state.pagamento;
        pagamento['dataPagamento'] = novoValor;

        // passando o nome da chave programaticamente usando []
        this.setState({[pagamento]: pagamento});
    }

    handleChange(event) {
        const name = event.target.id;
        const value = event.target.value;

        const pagamento = this.state.pagamento;
        pagamento[name] = value;

        // passando o nome da chave programaticamente usando []
        this.setState({[pagamento]: pagamento});
    }

    handleDocumentoChange(documento) {
        const documentos = this.state.documentos;
        documentos.push(documento);
        // passando o nome da chave programaticamente usando []
        // this.setState({[documentos]: documentos});
        // documentos.forEach(documento => {
        //     console.log(documento.tipoDocumento);
        // });
    }

    componentWillUpdate() {

    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }

    salvarCompra() {
        console.log('Salvar model');

        const {edicao, pagamento} = this.state;
        const _id = this.props.expenses ? this.props.expenses._id : null;
        // const nomeProduto = this.ref.nomeProduto;

        // console.log('Sera que imprime nome ? '+ nomeProduto);

        // const compra = { nomeProduto, nomeLoja, nomeFornecedor, dataCompra, valor, tipo, categoria };

        let metodo = null;
        let url = API_URL.expenses;

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
                this.estadoInicial();
                //Retirar comentario
                this.props.emitter.emit('mostraMensagem', 'success', 'Cadastro realizado com sucesso');
                this.closeForm();
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
                console.log(`props no error do ajax => ${this.props}`);
                this.props.emitter.emit('mostraMensagem', 'error', 'Não foi possível salvar');
            },
            complete: (xhr, status) => {
                // this.setState({salvamentoEmProgresso: false});
            }
        });
    }

    render() {
        var style = {
            textAlign: 'center',
            borderBottom: '0px',
            fontWeight: 'normal'
        };

        let title = 'Informações de Pagamento';

        const tooltip = <Tooltip id='tooltip-dataPagamento'>Informe a data de pagamento</Tooltip>;

        let inputDataPagamento = '';
        if (this.state.pagamento.status == 'PAGO') {
            inputDataPagamento =
                <FormInputDate
                    propriedade='dataPagamento'
                    valor={this.state.pagamento.dataPagamento}
                    colSize={4}
                    calendarPlacement='top'
                    tooltip='Informe a data de pagamento'
                    tooltipPlacement='bottom'
                    handleChange={this.handleChange}
                />
        } else {
            inputDataPagamento = <span></span>;
        }

        const documentos = this.state.documentos;
        const documentosIcones = [];
        documentos.forEach(documento => {
            documentosIcones.push(<DocumentoIcone documento={documento}/>);
        });

        return (
            <div className='content'>
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title='Nova Despesa'
                                content={
                                    <form>
                                        <FormInputs
                                            ncols={['col-md-4', 'col-md-4', 'col-md-4']}
                                            proprieties={[
                                                {
                                                    id: 'nomeProduto',
                                                    label: 'Despesa',
                                                    type: 'text',
                                                    bsClass: 'form-control',
                                                    placeholder: 'Despesa',
                                                    value: `${this.state.pagamento.nomeProduto}`,
                                                    onChange: this.handleChange
                                                },
                                                {
                                                    id: 'nomeFornecedor',
                                                    label: 'Fornecedor',
                                                    type: 'text',
                                                    bsClass: 'form-control',
                                                    placeholder: 'Fornecedor',
                                                    value: `${this.state.pagamento.nomeFornecedor}`,
                                                    onChange: this.handleChange
                                                },
                                                {
                                                    id: 'nomeLoja',
                                                    label: 'Local',
                                                    type: 'text',
                                                    bsClass: 'form-control',
                                                    placeholder: 'Nome da Loja/Local onde ocorreu a despesa',
                                                    value: `${this.state.pagamento.nomeLoja}`,
                                                    onChange: this.handleChange
                                                }
                                            ]}
                                        />
                                        <FormInputSelect
                                            ncols={['col-md-5', 'col-md-3', 'col-md-4']}
                                            proprieties={[
                                                {
                                                    id: 'origemDespesa',
                                                    label: 'Tipo de Despesa',
                                                    componentClass: 'select',
                                                    bsClass: 'form-control',
                                                    placeholder: 'Selecione...',
                                                    value: `${this.state.pagamento.origemDespesa}`,
                                                    onChange: this.handleChange,
                                                    options: [
                                                        {
                                                            key: 'COMPRA',
                                                            value: 'COMPRA',
                                                            text: 'Compra'
                                                        },
                                                        {
                                                            key: 'CONTA',
                                                            value: 'CONTA',
                                                            text: 'Pagamento de Conta'
                                                        },
                                                        {
                                                            key: 'REEMBOLSO',
                                                            value: 'REEMBOLSO',
                                                            text: 'Outros (Com Reembolso)'
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 'tipoDespesa',
                                                    label: 'Tipo de NF',
                                                    componentClass: 'select',
                                                    bsClass: 'form-control',
                                                    placeholder: 'Selecione...',
                                                    value: `${this.state.pagamento.tipoDespesa}`,
                                                    onChange: this.handleChange,
                                                    options: [
                                                        {
                                                            key: 'PRODUTO',
                                                            value: 'PRODUTO',
                                                            text: 'Produto'
                                                        },
                                                        {
                                                            key: 'SERVICO',
                                                            value: 'SERVICO',
                                                            text: 'Servico'
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 'classificacaoDespesa',
                                                    label: 'Classificacao',
                                                    componentClass: 'select',
                                                    bsClass: 'form-control',
                                                    placeholder: 'Selecione...',
                                                    value: `${this.state.pagamento.classificacaoDespesa}`,
                                                    onChange: this.handleChange,
                                                    options: [
                                                        {
                                                            key: 'PESSOAL',
                                                            value: 'PESSOAL',
                                                            text: 'Pessoal'
                                                        },
                                                        {
                                                            key: 'CORPORATIVO',
                                                            value: 'CORPORATIVO',
                                                            text: 'Corporativo'
                                                        },
                                                        {
                                                            key: 'GERAL',
                                                            value: 'GERAL',
                                                            text: 'Outros'
                                                        }
                                                    ]
                                                }]
                                            }
                                        />
                                        <FormInputDate
                                            ncols={['col-md-4', 'col-md-4', 'col-md-4']}
                                            datePickerProperties={[
                                                {
                                                    label: 'Data do Documento',
                                                    value: `${this.state.pagamento.dataOcorrenciaDespesa ? this.state.pagamento.dataOcorrenciaDespesa : new Date().toISOString()}`,
                                                    calendarPlacement: 'bottom',
                                                    showTodayButton: true,
                                                    dateFormat: 'DD/MM/YYYY'
                                                },
                                                {
                                                    label: 'Data de Vencimento',
                                                    value: `${this.state.pagamento.dataVencimento ? this.state.pagamento.dataVencimento : new Date().toISOString()}`,
                                                    calendarPlacement: 'bottom',
                                                    showTodayButton: true,
                                                    dateFormat: 'DD/MM/YYYY'
                                                },
                                                {
                                                    label: 'Data do Pagamento',
                                                    value: `${this.state.pagamento.dataPagamento ? this.state.pagamento.dataPagamento : new Date().toISOString()}`,
                                                    calendarPlacement: 'bottom',
                                                    showTodayButton: true,
                                                    dateFormat: 'DD/MM/YYYY'
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={['col-md-4']}
                                            proprieties={[
                                                {
                                                    label: 'Valor (R$)',
                                                    type: 'text',
                                                    bsClass: 'form-control',
                                                    placeholder: '0,00',
                                                }
                                            ]}
                                        />

                                        {/*<Input propriedade='valor' label='Valor (R$)' valor={this.state.expenses.valor}*/}
                                        {/*handleChange={this.handleChange}/>*/}
                                        {/*<FormGroup controlId={'status'}>*/}
                                        {/*<Col componentClass={ControlLabel} sm={4} className='rs-label'>Status do*/}
                                        {/*Pagamento</Col>*/}
                                        {/*/!*<Col sm={2}/>*!/*/}
                                        {/*<Col sm={6}>*/}
                                        {/*<ButtonToolbar>*/}
                                        {/*<ToggleButtonGroup*/}
                                        {/*type='radio'*/}
                                        {/*name='status'*/}
                                        {/*value={this.state.expenses.status}*/}
                                        {/*onChange={this.onChangePaymentStatus}*/}
                                        {/*>*/}
                                        {/*<ToggleButton value='PENDENTE'>Pendente</ToggleButton>*/}
                                        {/*<ToggleButton value='PAGO'>Pago</ToggleButton>*/}
                                        {/*</ToggleButtonGroup>*/}
                                        {/*</ButtonToolbar>*/}
                                        {/*</Col>*/}
                                        {/*{inputDataPagamento}*/}
                                        {/*</FormGroup>*/}
                                        <FormGroup>
                                            {/*<Col sm={2}/>*/}
                                            <Col>
                                                <ButtonToolbar>
                                                    <Button className='btn-fill' bsStyle='default' bsSize='small'
                                                            onClick={this.openModal.bind(this)}>
                                                        <Icon name='paperclip'/> Anexar Documento
                                                    </Button>
                                                </ButtonToolbar>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col>
                                                <ButtonToolbar>
                                                    <Button className='pull-left btn-fill' bsStyle='info'
                                                            onClick={this.salvarCompra.bind(this)}>
                                                        {/*<Icon name='floppy-o'/> */}
                                                        Salvar
                                                    </Button>
                                                    <LinkContainer to={'/expenses/list'} exact>
                                                        <Button className='pull-left btn-simple btn-link' bsStyle={'info'}>
                                                            Cancelar
                                                        </Button>
                                                    </LinkContainer>
                                                </ButtonToolbar>
                                            </Col>
                                        </FormGroup>
                                        {documentosIcones}
                                        <Modal show={this.state.showModalDocumento} onHide={this.closeModal}
                                               dialogClassName='documento-inserir-modal'>
                                            <Modal.Header closeButton>
                                                <Modal.Title componentClass='h3'>
                                                    <div style={{textAlign: 'center', marginBottom: 0, marginTop: 0}}>
                                                        Anexar Documento
                                                    </div>
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <DocumentoFormUpload handleDocumentoChange={this.handleDocumentoChange}
                                                                     onHide={this.closeModal}/>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <div>
                                                    <ButtonToolbar>

                                                        <Button className='pull-right btn-fill' bsStyle='info'
                                                                onClick={this.closeModal}>
                                                            {/*<Icon name='floppy-o'/> */}
                                                            Incluir
                                                        </Button>
                                                        <Button className='pull-right btn-simple' bsStyle='info'
                                                                onClick={this.closeModal}>
                                                            Cancelar
                                                        </Button>
                                                    </ButtonToolbar>
                                                </div>
                                            </Modal.Footer>
                                        </Modal>
                                    </form>
                                }/>
                            {/*<Card*/}
                                {/*// category='Operações'*/}
                                {/*ctTableResponsive*/}
                                {/*content={this.tollbarOperations()}*/}
                            {/*/>*/}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    tollbarOperations() {
        return (
            <div>
                <ButtonToolbar>
                    <LinkContainer to={'/expenses/list'} exact>
                        <Button className='pull-left btn-simple btn-wd'>
                            <Icon name='close'/> Cancelar
                        </Button>
                    </LinkContainer>
                    <Button className='pull-left btn-fill btn-wd' bsStyle='primary'
                            onClick={this.salvarCompra.bind(this)}>
                        <Icon name='floppy-o'/> Salvar
                    </Button>
                </ButtonToolbar>
            </div>
        )

    }
}


// class Despesas extends Component {
//     render(){
//         return (
//           <div>
//               <FormularioCompra/>
//           </div>
//         );
//     }
// }

export default CompraForm;
