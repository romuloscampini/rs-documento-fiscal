/**
 * Created by romuloscampini.
 */
import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Icon} from 'react-fa';

import CompraTabelaLinha from './CompraTabelaLinha';

class CompraTabela extends Component{

    render(){

        const {pagamentos} = this.props;

        const pagamentoTabelaLinhas = [];
        pagamentos.forEach(pagamento => {
            pagamentoTabelaLinhas.push(<CompraTabelaLinha key={pagamento.id} pagamento={pagamento} />);
        });

            {/*<Table striped bordered hover responsive>*/}
        return (
            <Table striped hover responsive>
                <thead>
                    <tr>
                        {/*<th>ID</th>*/}
                        <th>Produto</th>
                        <th>Loja</th>
                        <th>Fornecedor</th>
                        <th>Data Compra</th>
                        {/*<th>Valor</th>*/}
                        <th><Icon name="paperclip" title="Possui Documentos ?"/></th>
                        <th>Pago</th>
                        <th>Operações</th>
                    </tr>
                </thead>
                <tbody>
                    {pagamentoTabelaLinhas}
                </tbody>
            </Table>
        );
    }
}

export default CompraTabela;