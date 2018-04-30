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

import apiRoutes from '../../config/apiRoutes';
import ButtonWithTooltip from '../../components/Buttons/ButtonWithTooltip';
import DocumentoFormUpload from '../Pagamento/DocumentoFormUpload';
import SModal from '../../components/SModal';
import ButtonIcon from "../../components/Buttons/ButtonIcon";

const request = require('superagent-promise')(require('superagent'), Promise);

const getJson = (res) => {
    console.log(res);
    return res.body;
};

class CompraTabelaLinha extends Component {

    constructor(props){
        super(props);
        this.handleDocumentoChange = this.handleDocumentoChange.bind(this);
        // this.confirmPayment = this.confirmPayment.bind(this);

        this.state = {
            showConfirmationRemove: false,
            showModalDocumento: false,
            pagamento: this.props.pagamento
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
        // console.log(`chamando metodo form com valor: ${documento}`);
        const documentos = this.state.documentos;
        documentos.push(documento);
    }

    handleDocumentoChange(documento) {

        const pagamento = this.props.pagamento;
        // const documentos = this.state.documentos;

        // console.log(id);
        // console.log(documentos);

        request.post(apiRoutes.expenses + '/upload')
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
        const url = `${apiRoutes.expenses}/${pagamento.id}`;
        console.log(url);
        request('DELETE', url)
            // .set('Accept', 'application/json')
            .end((err, res) => {
                console.log(`ERROR: ${err}`);
                console.log(`RESPONSE ${res}`)
                this.closeConfirmationRemove();
                this.props.emitter.emit('atualizaLista');
            });
    }

    confirmPayment = () => {
        const url = `${apiRoutes.expenses}/pay`;
        const payConfirm = this.state.pagamento;
        request.post(url)
            .field('id', payConfirm.id)
            .end((err, res) => {
                if(err){
                    return err;
                };
                this.props.emitter.emit('atualizaLista');
            });
    }


    render(){
        const pagamento = this.props.pagamento;

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
                    <td>{pagamento.status === "PAGO" ?
                        <Icon className={'text-success'} name={'check'}/> :
                        <Icon className={'text-danger'} name={'times'}/>}
                    </td>
                    <td>{pagamento.id.substr(pagamento.id.length - 5, 5)}</td>
                    <td>{pagamento.nomeProduto}</td>
                    <td>{pagamento.nomeLoja}</td>
                    <td>{pagamento.nomeFornecedor}</td>
                    <td>{dataVencimento}</td>
                    <td>{pagamento.classificacaoDespesa}</td>
                    <td>
                        {this.btnActions(pagamento)}
                        <SModal
                            showModal={this.state.showConfirmationRemove}
                            onHide={this.closeConfirmationRemove}
                            key="remove-confirmation"
                            title="Confirmação"
                            body={<p>Deseja remover o registro: {pagamento.nomeProduto} ?</p>}
                            firstBsStyle="default"
                            firstBtnClick={this.closeConfirmationRemove}
                            firstBtnText="Cancelar"
                            firstBtnClassName={'btn-simple btn-link'}
                            secondBsStyle="danger"
                            secondBtnClick={this.removePayment}
                            secondBtnText="Excluir"
                        />
                        <SModal
                            showModal={this.state.showModalDocumento}
                            onHide={this.closeModal}
                            key="upload-document"
                            title="Anexar Documento"
                            body={
                                <DocumentoFormUpload handleDocumentoChange={this.handleDocumentoChange}
                                                     onHide={this.closeModal}/>
                            }
                            firstBsStyle="info"
                            firstBtnClick={this.closeModal}
                            firstBtnText="Cancelar"
                            firstBtnClassName={'btn-simple btn-link'}
                            // firstBtnIcon="floppy-o"
                            secondBsStyle="info"
                            secondBtnClick={this.closeModal}
                            secondBtnText="Incluir"
                            // secondBtnIcon="close"
                        />
                    </td>
                </tr>


        );
    }

    btnActions(pagamento) {
        let btnDownloadDocument;
        if(pagamento.documentos) {
            btnDownloadDocument =
            <ButtonIcon href={`${apiRoutes.expenses}/download?id=${pagamento.id}`}
                        tooltip="Download de Documentos"
                        target='_blank'
                        bsClass={'btn btn-simple btn-info btn-xs'}
                        icon={'download'}
            />
        }else{
            btnDownloadDocument =
            <ButtonIcon tooltip="Download de Documentos"
                        bsClass={'btn btn-simple btn-default btn-xs'}
                        icon={'download'}
                        disabled
            />;
        }

        return <div>
            <ButtonIcon
                tooltip='Confirmar pagamento'
                bsClass={pagamento.status === "PAGO" ? 'btn btn-simple btn-default btn-xs' : 'btn btn-simple btn-success btn-xs'}
                icon={'usd'}
                disabled={pagamento.status === "PAGO"}
                onClick={this.confirmPayment.bind(this)}>
            </ButtonIcon>
            <ButtonIcon
                tooltip='Upload de documento'
                bsClass={'btn btn-simple btn-info btn-xs'}
                icon="cloud-upload"
                onClick={this.showModal}
            />
            <ButtonIcon
                tooltip="Editar"
                bsClass={'btn btn-simple btn-default btn-xs'}
                icon="edit"
                disabled
            />
            {btnDownloadDocument}
            <ButtonIcon
                tooltip="Excluir item"
                bsClass={'btn btn-simple btn-danger btn-xs'}
                icon="trash"
                onClick={this.showConfirmationRemove}
            />
        </div>;
    }

}

export default CompraTabelaLinha;
