/**
 * Created by romuloscampini.
 */
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Icon} from 'react-fa';
import {LinkContainer} from 'react-router-bootstrap';

class CompraTabelaLinha extends Component {

    render(){
        const compra = this.props.compra;

        return (
          <tr>
              {/*<td><small>{compra._id}</small></td>*/}
              <td>{compra.nomeProduto}</td>
              <td>{compra.nomeLoja}</td>
              <td>{compra.nomeFornecedor}</td>
              <td>{compra.dataCompra}</td>
              <td>{'R$ ' + compra.valor}</td>
              <td>{compra.tipo}</td>
              {/*<td>{compra.documentos.length > 0 ? 'Sim' : 'Nao'}</td>*/}
              <td>{compra.documentosPagamento.length > 0 ? 'Sim' : 'Nao'}</td>
          </tr>
        );
    }
}

export default CompraTabelaLinha;