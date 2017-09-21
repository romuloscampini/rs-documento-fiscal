/**
 * Created by romuloscampini.
 */

import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    ControlLabel,
    Button,
    ButtonToolbar,
    Grid,
    Row,
    Col
} from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import request from 'superagent';
import { Icon } from 'react-fa';
import Dropzone from 'react-dropzone';
import Input from '../components/Input';
import SelectBox from '../components/SelectBox';

class DocumentoFormUpload extends Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            documento: {
                tipoDocumento: 'BOLETO'
            }
        };
    }

    handleChange(propriedade, novoValor) {
        console.log(`handleChange da propriedade ${propriedade} e valor ${novoValor}`);
        const documento = this.state.documento;
        documento[propriedade] = novoValor;
        // passando o nome da chave programaticamente usando []
        this.setState({documento: documento});
        console.log(`estado final do handleChange ${this.state}`);
    }

    uploadFile(acceptedFiles) {
        console.log(acceptedFiles);
        let documento = this.state.documento;
        documento['file'] = acceptedFiles;
        this.setState({[documento]: documento});
    }

    save(){
        console.log(this.state.documento.file);
        this.props.handleDocumentoChange(this.state.documento);
        this.props.onHide();
    }

    close(){
        this.props.onHide();
    }

    render(){

        let dropzoneRef;

        const opcoesTipoDocumento = [{
                valor: 'BOLETO',
                label: 'Boleto ou Documento para Pagamento' },
            {
                valor: 'COMPROVANTE_PAGAMENTO',
                label: 'Comprovante de Pagamento' },
            {
                valor: 'NOTA_FISCAL',
                label: 'Nota Fiscal' },
            {
                valor: 'REGISTRO_FISCAL',
                label: 'Registro Fiscal' },
            {
                valor: 'OUTROS',
                label: 'Outros' }
        ];

        const infoDoc = [];

        return(
            <div>
                <NotificationSystem ref="notificationSystem" />
                <Grid >
                    <Row style={{marginBottom: 15}}>
                        <Col>
                            <Form horizontal>
                                <FormGroup>
                                    <SelectBox propriedade="tipoDocumento" valor={this.state.documento.tipoDocumento} opcoes={opcoesTipoDocumento} size={3} label="Tipo de Documento" handleChange={this.handleChange}/>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} sm={2} className="rs-label">Anexo</Col>
                                        <Col sm={4}>
                                            <Dropzone ref={(node) => { dropzoneRef = node; }} onDrop={this.uploadFile.bind(this)} multiple={false} disablePreview={true}>
                                                <h3> Clique aqui para anexar </h3>
                                                <ul>
                                                    {infoDoc}
                                                </ul>
                                            </Dropzone>
                                        </Col>
                                    </FormGroup>

                                    <ButtonToolbar>
                                        <Button className="pull-left" bsStyle="default" onClick={this.close.bind(this)}>
                                            <Icon name="close"/> Cancelar
                                        </Button>

                                        <Button bsStyle="primary" onClick={this.save.bind(this)}>
                                            <Icon name="floppy-o"/> Salvar
                                        </Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}

export default DocumentoFormUpload;
