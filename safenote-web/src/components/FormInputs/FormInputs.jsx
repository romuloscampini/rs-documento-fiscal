import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Row } from "react-bootstrap";

export class FormInputs extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleChange(this.props.id, event.target.value);
    }

    render() {
        var row = [];
        for (var i = 0; i < this.props.ncols.length; i++) {
            row.push(
                <div key={i} className={this.props.ncols[i]}>
                    <FormGroup controlId={this.props.proprieties[i].id}>
                        <ControlLabel>{this.props.proprieties[i].label}</ControlLabel>
                        <FormControl {...this.props.proprieties[i]} />
                    </FormGroup>
                </div>
            );
        }
        return <Row>{row}</Row>;
    }
}

export default FormInputs;
