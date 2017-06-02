/**
 * Created by romuloscampini.
 */
import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Icon} from 'react-fa';

import CompraTabelaLinha from './CompraTabelaLinha';

class CompraTabela extends Component{

    render(){

        const {compras} = this.props;

        const compraTabelaLinhas = [];
        compras.forEach(compra => {
            compraTabelaLinhas.push(<CompraTabelaLinha key={compra._id} compra={compra} />);
        });

        console.log(compraTabelaLinhas.length);

        return (
            <Table hover responsive>
                <thead>
                    <tr>
                        {/*<th>ID</th>*/}
                        <th>Produto</th>
                        <th>Loja</th>
                        <th>Fornecedor</th>
                        <th>Data Compra</th>
                        <th>Valor</th>
                        <th title="Produto ou Serviço">Tipo de Compra</th>
                        <th><Icon name="file-o" title="Possui Documentos ?"/></th>
                    </tr>
                </thead>
                <tbody>
                    {compraTabelaLinhas}
                </tbody>
            </Table>
        );
    }
}

export default CompraTabela;