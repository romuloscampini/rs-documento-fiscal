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
    FormControl,
    Col
} from 'react-bootstrap';
import request from 'superagent';
import { Icon } from 'react-fa';
import Dropzone from 'react-dropzone';
import Input from '../../components/Input';
import FormInputSelect from '../../components/FormInputSelect/FormInputSelect';
import Card from "../../components/Card/Card";

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
        // documento['file'] = acceptedFiles;
        acceptedFiles.forEach(file => {
            documento['file'] = file;
        });
        this.setState({[documento]: documento});
        this.props.handleDocumentoChange(this.state.documento);
        // console.log(`Estado após upload ${this.state}`);
    }

    componentWillReceiveProps(nextProps){
        // console.log(`Proxima propriedade: ${nextProps}`);
    }

    save(){
        console.log(this.state.documento.file);
        this.props.onHide();
    }

    render(){

        let dropzoneRef;

        let infoDoc = [];
        if (this.state.documento.file) {
            // let docs = this.state.documento.file;
            // docs.forEach((doc) => {
                infoDoc.push(
                    <li>{this.state.documento.file.name}</li>
                )
            // });
        }


        return(
            <div>
                <Grid >
                    <Row>
                        <Col md={6}>
                            <Card
                                title={''}
                                category={'Selecione o tipo de documento e o documento para anexar'}
                                content={
                                    <form>
                                        <FormInputSelect
                                            ncols={['col-md-12']}
                                            proprieties={[
                                                {
                                                    label: 'Tipo de Documento',
                                                    componentClass: 'select',
                                                    bsClass: 'form-control',
                                                    placeholder: 'Selecione...',
                                                    options: [
                                                        {
                                                            key: 'BOLETO',
                                                            value: 'BOLETO',
                                                            text: 'Boleto ou Documento para Pagamento'
                                                        },
                                                        {
                                                            key: 'COMPROVANTE_PAGAMENTO',
                                                            value: 'COMPROVANTE_PAGAMENTO',
                                                            text: 'Comprovante de Pagamento'
                                                        },
                                                        {
                                                            key: 'NOTA_FISCAL',
                                                            value: 'NOTA_FISCAL',
                                                            text: 'Nota Fiscal'
                                                        },
                                                        {
                                                            key: 'REGISTRO_FISCAL',
                                                            value: 'REGISTRO_FISCAL',
                                                            text: 'Registro Fiscal (DANFE)'
                                                        },
                                                        {
                                                            key: 'OUTROS',
                                                            value: 'OUTROS',
                                                            text: 'Outros'
                                                        }
                                                    ]
                                                }
                                            ]}/>
                                        <FormGroup>
                                            <ControlLabel>Anexo</ControlLabel>
                                            <div>
                                                <Dropzone ref={(node) => { dropzoneRef = node; }} onDrop={this.uploadFile.bind(this)} multiple={false} disablePreview={true}>
                                                    <h3> Clique aqui para anexar </h3>
                                                    <ul>
                                                        {infoDoc}
                                                    </ul>
                                                </Dropzone>
                                            </div>
                                        </FormGroup>
                                    </form>
                                }/>
                                    {/*<ButtonToolbar>*/}
                                        {/*<Button className="pull-left" bsStyle="default" onClick={this.close.bind(this)}>*/}
                                            {/*<Icon name="close"/> Cancelar*/}
                                        {/*</Button>*/}

                                        {/*<Button bsStyle="primary" onClick={this.save.bind(this)}>*/}
                                            {/*<Icon name="floppy-o"/> Incluir*/}
                                        {/*</Button>*/}
                                    {/*</ButtonToolbar>*/}
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}

export default DocumentoFormUpload;
