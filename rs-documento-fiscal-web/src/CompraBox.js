/**
 * Created by romuloscampini.
 */
import React, { Component } from 'react';
import {
    Form,
    Grid,
    Row,
    Col,
    FormGroup,
    PageHeader,
    Button
} from 'react-bootstrap';
import { Icon } from 'react-fa';
import { Link } from 'react-router';
import RSInput from './components/RSInput';

class CompraBox extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Grid bsClass="container-fluid">
                <Row style={{marginBottom: 15}}>
                    <Col lg={9} lgOffset={3}>
                        <Form horizontal>
                            <FormGroup>
                                <PageHeader>Compra</PageHeader>
                                <PageHeader><small><h4 className="rs-title">Informações de compra</h4></small></PageHeader>
                                <Button
                                    bsStyle="success">
                                    <Icon name="plus"/>
                                    <Link style={{color: 'white'}} to="/compras/form">
                                        {' Novo'}
                                    </Link>
                                </Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Grid>

        );
    }
}

export default CompraBox;