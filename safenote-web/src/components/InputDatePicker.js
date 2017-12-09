import React, {Component} from 'react';
import {Col, ControlLabel, Tooltip, FormGroup, HelpBlock, OverlayTrigger } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

export default class InputDatePicker extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.props.handleChange(this.props.propriedade, value);
    }

    render() {
        let ajuda = <span></span>;
        if (this.props.ajuda) {
            ajuda = <HelpBlock>{this.props.ajuda}</HelpBlock>;
        }
        let label = <span></span>;

        if (this.props.label) {
            label = <Col componentClass={ControlLabel} sm={2} className="rs-label">{this.props.label}</Col>
        }

        const tooltip = <Tooltip id="tooltip">{this.props.tooltip}</Tooltip>;
        const datePicker =
            <DatePicker
                dateFormat={this.props.dateFormat != null ? this.props.dateFormat : 'DD/MM/YYYY'}
                value={this.props.valor || ''}
                calendarPlacement={this.props.calendarPlacement || 'bottom'}
                showTodayButton={true}
                onChange={this.handleChange}
            />
        ;

        let datePickerRender = "";

        if(this.props.tooltip){
            datePickerRender =
                <OverlayTrigger placement={this.props.tooltipPlacement != null ? this.props.tooltipPlacement : 'top'} overlay={tooltip}>
                    {datePicker}
                </OverlayTrigger>;
        } else {
            datePickerRender = datePicker;
        }

        // let addon = null;
        // if (this.props.addon) {
        //     addon = <InputGroup.Addon>{this.props.addon}</InputGroup.Addon>;
        // }

        return (
            <FormGroup controlId={this.props.propriedade}>
                {label}
                <Col sm={this.props.colSize != null ? this.props.colSize : 6}>
                    {datePickerRender}
                    {ajuda}
                </Col>
            </FormGroup>
        );
    }
}

