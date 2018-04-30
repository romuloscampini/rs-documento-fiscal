import React, {Component} from 'react';
import { ControlLabel, FormControl, FormGroup, Row} from 'react-bootstrap';

function FieldGroup({ label, options, id, ...props }) {
    var inputOptions = [];
    for(var k=0; k < options.length; k++){
        inputOptions.push(<option key={options[k].key} value={options[k].value}>{options[k].text}</option>)
    }
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} >
                {inputOptions}
            </FormControl>
        </FormGroup>
    );
}

class FormInputSelect extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleChange(this.props.id, event.target.value);
    }

    render() {
        let row = [];
        for (let i = 0; i < this.props.ncols.length; i++) {
            let inputOptions = [];
            for(let k=0; k < this.props.proprieties[i].options.length; k++){
                let option = this.props.proprieties[i].options[k];
                inputOptions.push(<option key={option.key} value={option.value}>{option.text}</option>)
            }
            row.push(
                <div key={i} className={this.props.ncols[i]}>
                    <FormGroup controlId={this.props.proprieties[i].id}>
                        <ControlLabel>{this.props.proprieties[i].label}</ControlLabel>
                        <FormControl {...this.props.proprieties[i]} >
                            {inputOptions}
                        </FormControl>
                    </FormGroup>

                    {/*<FieldGroup {...this.props.proprieties[i]} />*/}
                </div>
            );
        }
        return <Row>{row}</Row>;
    }
}

export default FormInputSelect;
