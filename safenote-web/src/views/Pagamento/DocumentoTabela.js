/**
 * Created by romuloscampini.
 */

import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Icon} from 'react-fa';

import DocumentoTabelaLinha from './DocumentoTabelaLinha';

class DocumentoTabela extends Component{

    render(){

        const {documentos} = this.props;

        const documentosTabelaLinhas = [];
        documentos.forEach(documento => {
            documentosTabelaLinhas.push(<DocumentoTabelaLinha key={documento.id} documento={documento} />);
        });

        {/*<Table striped bordered hover responsive>*/}
        return (
            <Table striped hover responsive>
                <thead>
                <tr>
                    {/*<th>ID</th>*/}
                    <th>ID</th>
                    <th>Nome do arquivo</th>
                    <th>Tipo de Documento</th>
                    <th>Tamanho do arquivo</th>
                </tr>
                </thead>
                <tbody>
                {documentosTabelaLinhas}
                </tbody>
            </Table>
        );
    }
}

export default DocumentoTabela;
