/**
 * Created by romuloscampini.
 */
import React, {Component} from 'react';
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import {Icon} from 'react-fa';
import {LinkContainer} from 'react-router-bootstrap';

class DocumentoTabelaLinha extends Component {

    render(){
        const documento = this.props.documento;

        return (
          <tr>
              <td>{documento.id}</td>
              <td>{documento.nomeArquivo}</td>
              <td>{documento.tipoDocumento}</td>
              <td>{documento.tamanhoArquivo}</td>
          </tr>
        );
    }
}

export default DocumentoTabelaLinha;