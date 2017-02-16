import React, {Component} from 'react';
import {Col, ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';

class FormCompraInput extends Component {

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

        return (
            <FormGroup controlId={this.props.propriedade}>
                <Col componentClass={ControlLabel} sm={3}>{this.props.label}</Col>
                <Col sm={8}>
                    <FormControl type={this.props.tipo != null ? this.props.tipo : 'input'} componentClass={this.props.textarea ? 'textarea' : 'input'} value={this.props.valor || ''} onChange={this.handleChange} />
                    {ajuda}
                </Col>
            </FormGroup>
        );
    }
}

export default FormCompraInput;
