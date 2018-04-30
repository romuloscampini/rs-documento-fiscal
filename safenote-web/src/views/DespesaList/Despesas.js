/**
 * Created by romuloscampini.
 */
import React, {Component} from 'react';
import {
    Form,
    Grid,
    Row,
    Col,
    FormGroup,
    PageHeader,
    Button,
    ButtonGroup,
    ControlLabel,
    ButtonToolbar,
    Panel
} from 'react-bootstrap';
import Promise from 'es6-promise';
import {Icon} from 'react-fa';
import {LinkContainer} from 'react-router-bootstrap';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import API_URL from '../../config/apiRoutes';

import CompraTabela from "./CompraTabela";
import Input from '../../components/Input';
import Card from '../../components/Card/Card';
import FormInputSelect from "../../components/FormInputSelect/FormInputSelect";
import appRoutes from "../../routes/appRoutes";

const request = require('superagent-promise')(require('superagent'), Promise);

const getJson = (res) => {
    // console.log(res);
    return res.body;
};

const AppRouteWithProps = ({component: Component, ...route}) => (
    <Route
        exact
        {...route}
        // path={route.path}
        //render={route.component}
        render={props =>
            // route.location.pathname === route.path ? (
            // pass the sub-routes down to keep nesting
            <Component {...route} />
            // )
            // : (
            // <Component {...route.childrens} />
            // )
        }
    />
);

class PagamentoBusca extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSearching: false,
            nomeProduto: '',
            sexo: '',
            dataNascimento: '',
            protocolo: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(activeKey) {
        // console.log(activeKey);
        this.props.handleSelect({activeKey: activeKey});
    }

    handleChoose(opcao) {
        this.setState({sexo: opcao ? opcao.value : ''});
    }

    handleChange(propriedade, novoValor) {
        // console.log('novo valor:', propriedade, novoValor);
        this.setState({[propriedade]: novoValor});
    }

    render() {
        let isSearching = this.state.isSearching;

        return (
            <Form>
                <Row>
                    <Input
                        size={3}
                        tipo="input"
                        propriedade="nome"
                        valor={this.state.nomeProduto}
                        label="Nome do Produto"
                        handleChange={this.handleChange}/>
                </Row>

                <ButtonToolbar>
                    <Button
                        // onClick={!isSearching ? this.handleClick : null}>
                        type="submit"
                        bsStyle="primary"
                        disabled={isSearching}>
                        <Icon name="search"/>
                        {isSearching ? ' Procurando...' : ' Procurar'}
                    </Button>

                    <Button
                        // onClick={this.limpaCampos}>
                        type="submit"
                        bsStyle="default">
                        <Icon name="eraser"/>
                        {' Limpar campos'}
                    </Button>
                </ButtonToolbar>

            </Form>
        );
    }
}

class DespesasList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pagamentos: [],
            buscaEmProgresso: false
        };

        this.atualizaLista = this.atualizaLista.bind(this);
    }

    componentDidMount() {
        const emitter = this.props.emitter;
        // this.props.emitter.emit('mostraMensagem', 'success', 'Cadastro realizado com sucesso');
        emitter.addListener('atualizaLista', this.atualizaLista);
    }

    atualizaLista() {
        this.setState({buscaEmProgresso: true});
        request.get(API_URL.expenses)
            .accept('application/json')
            // fetch(apiRoutes.expenses)
            .then(getJson)
            .then(dados => {
                // console.log("Size de Dados: " + dados.length);
                // this.props.emitter.emit('mostraMensagem', 'success', 'Cadastro realizado com sucesso');
                this.setState({pagamentos: dados});
                this.setState({buscaEmProgresso: false});
                // console.log('tamanho array: ' + this.state.compras.length);
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillMount() {
        this.atualizaLista();
    }

    render() {

        let icone;
        if (this.state.buscaEmProgresso) {
            icone = <Icon spin name="spinner"/>;
        } else {
            icone = <span></span>;
        }

        return (
            <div className="content">
                <Grid fluid>
                    {/*<Card plain title="Sweet Alert">*/}
                    {/*/!*<Row>*!/*/}
                    {/*/!*</Row>*!/*/}
                    {/*</Card>*/}
                        {/*<Col md={12}>*/}
                            {/*<Card*/}
                                {/*category='Operações'*/}
                                {/*ctTableResponsive*/}
                                {/*content={this.toolbarOperations()}*/}
                            {/*/>*/}
                            <Card
                                // title='Lista de Despesas'
                                title={this.titleBar()}
                                // category={this.titleBar()}
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <CompraTabela {...this.props} pagamentos={this.state.pagamentos}/>
                                }
                            />
                        {/*</Col>*/}
                </Grid>
            </div>
        );
    }

    titleBar() {
        return (
            <div>
                <h4 style={{margin: '0px 0 15px'}} >Lista de Despesas</h4>
                <LinkContainer to={'/expenses/new'} exact>
                    <Button className='btn-fill pull-left' bsStyle='info'>
                        <Icon name='plus'/>Nova Despesa
                    </Button>
                </LinkContainer>
            </div>
        )
    }

    toolbarOperations() {
        return (
            <div>
                <ButtonToolbar>
                    <LinkContainer to={'/expenses/new'} exact>
                        <Button className='pull-left btn-fill btn-wd btn-round' bsStyle='success'>
                            <Icon name='plus'/> Nova Despesa
                        </Button>
                    </LinkContainer>
                    <LinkContainer to={'/expenses/new'} exact>
                        <Button className='pull-left btn-fill btn-wd btn-round' bsStyle='primary'>
                            <Icon name='search'/> Busca
                        </Button>
                    </LinkContainer>
                </ButtonToolbar>
            </div>
        )
    }
}

class Despesas extends Component {

    constructor(props) {
        super(props);
        console.log("maoe expenses");
    }

    render() {
        return (
            <div>
                <AppRouteWithProps path={this.props.path} component={DespesasList} {...this.props}/>;
                {/*}*/}
                {/*}*/}
            </div>
        )
    }
}

export default DespesasList;
