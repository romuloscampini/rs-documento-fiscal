import React, {Component} from 'react';
import {Col, ControlLabel, Tooltip, FormGroup, HelpBlock, OverlayTrigger, FormControl, Row } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';


function FieldGroup({ label, ...datePickerProperties }) {
    return (
        <FormGroup>
            <ControlLabel>{label}</ControlLabel>
            <DatePicker {...datePickerProperties} />
        </FormGroup>
    );
}

export default class FormInputDate extends Component {

    render() {
        var row = [];
        for (var i = 0; i < this.props.ncols.length; i++) {
            row.push(
                <div key={i} className={this.props.ncols[i]}>
                    <FieldGroup {...this.props.datePickerProperties[i]} />
                </div>
            );
        }
        return <Row>{row}</Row>;

        // const tooltip = <Tooltip id="tooltip">{this.props.tooltip}</Tooltip>;
        // const datePicker =
        //     <DatePicker
        //         dateFormat={this.props.dateFormat != null ? this.props.dateFormat : 'DD/MM/YYYY'}
        //         value={this.props.valor || ''}
        //         calendarPlacement={this.props.calendarPlacement || 'bottom'}
        //         showTodayButton={true}
        //         onChange={this.handleChange}
        //     />
        // ;

        // let datePickerRender = "";

        // if(this.props.tooltip){
        //     datePickerRender =
        //         <OverlayTrigger placement={this.props.tooltipPlacement != null ? this.props.tooltipPlacement : 'top'} overlay={tooltip}>
        //             {datePicker}
        //         </OverlayTrigger>;
        // } else {
        //     datePickerRender = datePicker;
        // }

        // let addon = null;
        // if (this.props.addon) {
        //     addon = <InputGroup.Addon>{this.props.addon}</InputGroup.Addon>;
        // }

        // return (
        //     <FormGroup controlId={this.props.propriedade}>
        //         {label}
        //         <Col sm={this.props.colSize != null ? this.props.colSize : 6}>
        //             {datePickerRender}
        //             {ajuda}
        //         </Col>
        //     </FormGroup>
        // );
    }
}

