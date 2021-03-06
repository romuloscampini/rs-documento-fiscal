import React, {Component} from 'react';
import {Col, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

class Input extends Component {

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

        // let addon = null;
        // if (this.props.addon) {
        //     addon = <InputGroup.Addon>{this.props.addon}</InputGroup.Addon>;
        // }

        return (
            <FormGroup controlId={this.props.propriedade}>
                <Col componentClass={ControlLabel} sm={2} className="rs-label">{this.props.label}</Col>
                <Col sm={6}>
                    <FormControl type={this.props.tipo != null ? this.props.tipo : 'input'} componentClass={this.props.textarea ? 'textarea' : 'input'} value={this.props.valor || ''} onChange={this.handleChange}/>
                    {ajuda}
                </Col>
            </FormGroup>
        );
    }
}

export default Input;
