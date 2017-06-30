import React, {Component} from 'react';
import {Col, ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';

class SelectBox extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleChange(this.props.propriedade, event.target.value);
    }

    render() {
        let ajuda = <span></span>;
        if (this.props.ajuda) {
            ajuda = <HelpBlock>{this.props.ajuda}</HelpBlock>;
        }

        const inputsOpcoes = [];
        const opcoes = this.props.opcoes;
        opcoes.forEach((opcao) => {
            inputsOpcoes.push(
                <option key={opcao.valor} value={opcao.valor}>{opcao.label}</option>
            );

        });

        return (
            <FormGroup controlId={this.props.propriedade}>
                <Col componentClass={ControlLabel} sm={2} className="rs-label">{this.props.label}</Col>
                <Col sm={6}>
                    {/*{this.props.multiple ? 'multiple' : ''}*/}
                    <FormControl componentClass='select' value={this.props.valor || ''} onChange={this.handleChange} placeholder="Selecione...">
                        {inputsOpcoes}
                    </FormControl>
                    {ajuda}
                </Col>
            </FormGroup>
        );
    }
}

export default SelectBox;
