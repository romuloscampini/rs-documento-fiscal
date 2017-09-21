/**
 * Created by romuloscampini.
 */
import React, {Component} from 'react';
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import {Icon} from 'react-fa';
import {LinkContainer} from 'react-router-bootstrap';

class CompraTabelaLinha extends Component {

    render(){
        const pagamento = this.props.pagamento;

        return (
          <tr>
              <td>{pagamento.nomeProduto}</td>
              <td>{pagamento.nomeLoja}</td>
              <td>{pagamento.nomeFornecedor}</td>
              <td>{pagamento.dataCompra}</td>
              {/*<td>{'R$ ' + pagamento.valor}</td>*/}
              <td>{pagamento.documentos ? 'Sim' : 'Não'}</td>
              <td>{pagamento.statusPagamento ? 'Sim' : 'Não'}</td>
              <td>
                  <ButtonGroup>
                      <LinkContainer to={`/pagamentos/form/${pagamento.identifier}`} exact>
                          <Button bsStyle="link" disabled>
                              <Icon name="pencil"/>
                          </Button>
                      </LinkContainer>
                      <Button bsStyle="link" disabled>
                          <Icon name="times"/>
                      </Button>
                  </ButtonGroup>
              </td>
              {/*<td>{pagamento.documentosPagamento ? 'Sim' : 'Nao'}</td>*/}
          </tr>
        );
    }
}

export default CompraTabelaLinha;