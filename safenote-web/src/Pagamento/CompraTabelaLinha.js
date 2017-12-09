/**
 * Created by romuloscampini.
 */
import React, {Component} from 'react';
import Promise from 'es6-promise';
import {
    Button,
    ButtonToolbar,
    ButtonGroup,
    Modal,
    Label,
    MenuItem,
    DropdownButton,
    Tooltip,
    OverlayTrigger
} from 'react-bootstrap';
import { Icon } from 'react-fa';
import { LinkContainer } from 'react-router-bootstrap';

import API_URL from '../config/Routes';
import ButtonWithTooltip from '../components/ButtonWithTooltip';
import DocumentoFormUpload from './DocumentoFormUpload';
import SModal from '../components/SModal';

const request = require('superagent-promise')(require('superagent'), Promise);

const getJson = (res) => {
    console.log(res);
    return res.body;
};

class CompraTabelaLinha extends Component {

    constructor(props){
        super(props);
        this.handleDocumentoChange = this.handleDocumentoChange.bind(this);
        this.confirmPayment = this.confirmPayment.bind(this);

        this.state = {
            showConfirmationRemove: false,
            showModalDocumento: false
        };
    }

    showConfirmationRemove = () => {
        this.setState({showConfirmationRemove: true});
    }

    closeConfirmationRemove = () => {
        this.setState({showConfirmationRemove: false});
    }

    showModal = () => {
        this.setState({showModalDocumento: true});
    }

    closeModal = () => {
        this.setState({showModalDocumento: false});
    }

    handleDocumentoChangeOld(documento) {
        console.log(`chamando metodo form com valor: ${documento}`);
        const documentos = this.state.documentos;
        documentos.push(documento);
    }

    handleDocumentoChange(documento) {

        const pagamento = this.props.pagamento;
        // const documentos = this.state.documentos;

        // console.log(id);
        // console.log(documentos);

        request.post(API_URL.pagamento + '/upload')
            .field('id', pagamento.id)
            .attach('documento', documento.file)
            .field('tipoDocumento', documento.tipoDocumento)
            .end(function(err, res){
                if(err){
                    return err;
                };
            });
    }


    removePayment = () => {
        const pagamento = this.props.pagamento;
        const url = `${API_URL.pagamento}/${pagamento.id}`;
        console.log(url);
        request.del(url)
            .set('Accept', 'application/json')
            .end((err, res) => {
                console.log(`ERROR: ${err}`);
                console.log(`RESPONSE ${res}`)
                this.closeConfirmationRemove();
                this.props.emitter.emit('atualizaLista');
            });
    }

    confirmPayment = () => {
        const pagamento = this.props.pagamento;
        const url = `${API_URL.pagamento}/pay`;
        request.post(url)
            .field('id', pagamento.id)
            .end((err, res) => {
                if(err){
                    return err;
                };
                this.props.emitter.emit('atualizaLista');
            });
    }


    render(){
        const pagamento = this.props.pagamento;
        let statusDownloadButton;
        let urlDownloadDocument = "";
        if(pagamento.documentos) {
            urlDownloadDocument = <MenuItem href={`${API_URL.pagamento}/download?id=${pagamento.id}`} target='_blank'><Icon name="download"/> Download</MenuItem>;
        }else{
            urlDownloadDocument = <MenuItem disabled><Icon name="download"/> Download</MenuItem>;
            statusDownloadButton = "disabled";
        }

        let buttonPaymentConfirm = <span></span>;
        // if(pagamento.statusPagamento === "PAGO"){
        //     buttonPaymentConfirm =
        //         <ButtonWithTooltip
        //             tooltip="Confirmar pagamento"
        //             placement="top"
        //             icon="check"
        //             disabled={true}
        //         />
        // }else{
        //     <ButtonWithTooltip
        //         tooltip="Confirmar pagamento"
        //         placement="top"
        //         icon="check"
        //         disabled={true}
        //     />
        // }

        let dataVencimento = "";
        const options = {
            year: "numeric", month: "short",
            day: "numeric"
        };
        if(pagamento.dataVencimento){
            dataVencimento = new Date(pagamento.dataVencimento); //.toLocaleDateString("en-GB", options);
            dataVencimento = `${dataVencimento.getDate()}/${dataVencimento.getMonth()+1}/${dataVencimento.getFullYear()}`
        }

        return (
                <tr>
                  <td>{pagamento.nomeProduto}</td>
                  <td>{pagamento.nomeLoja}</td>
                  <td>{pagamento.nomeFornecedor}</td>
                  <td>{dataVencimento}</td>
                  {/*<td>{'R$ ' + pagamento.valor}</td>*/}
                  <td>{pagamento.documentos ? 'Sim' : 'Não'}</td>
                  <td>{pagamento.statusPagamento === "PAGO" ? <Label bsStyle="success">Pago</Label> : <Label bsStyle="danger">Pendente</Label> }</td>
                  <td>
                      <ButtonToolbar>
                          <ButtonGroup>
                              <ButtonWithTooltip
                                  tooltip="Confirmar pagamento"
                                  placement="top"
                                  icon="check"
                                  disabled={pagamento.statusPagamento === "PAGO"}
                                  onClick={this.confirmPayment}
                              />
                              <ButtonWithTooltip
                                  tooltip="Upload de documento"
                                  placement="top"
                                  icon="upload"
                                  onClick={this.showModal}
                              />
                              <DropdownButton pullRight title="" id="opcoes-tabela-linha-pagamento">
                                  <MenuItem eventKey="1" disabled={true}><Icon name="pencil"/> Editar</MenuItem>
                                  {urlDownloadDocument}
                                  <MenuItem eventKey="3" onClick={this.showConfirmationRemove}><Icon name="times"/> Excluir</MenuItem>
                              </DropdownButton>
                          </ButtonGroup>
                      </ButtonToolbar>
                      <SModal
                          showModal={this.state.showConfirmationRemove}
                          onHide={this.closeConfirmationRemove}
                          key="remove-confirmation"
                          title="Confirmação"
                          body={<p>Deseja remover o registro: {pagamento.nomeProduto} ?</p>}
                          firstBsStyle="danger"
                          firstBtnClick={this.removePayment}
                          firstBtnText="Confirmar exclusão"
                          secondBsStyle="default"
                          secondBtnClick={this.closeConfirmationRemove}
                          secondBtnText="Cancelar"
                      />
                      <SModal
                          showModal={this.state.showModalDocumento}
                          onHide={this.closeModal}
                          key="upload-document"
                          title="Anexar Documento"
                          body={<DocumentoFormUpload handleDocumentoChange={this.handleDocumentoChange} onHide={this.closeModal}/>}
                          firstBsStyle="default"
                          firstBtnClick={this.closeModal}
                          firstBtnText="Cancelar"
                          firstBtnIcon="close"
                          secondBsStyle="primary"
                          secondBtnClick={this.closeModal}
                          secondBtnText="Incluir"
                          secondBtnIcon="floppy-o"
                      />
                  </td>
                </tr>


        );
    }
}

export default CompraTabelaLinha;