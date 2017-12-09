/**
 * Created by romuloscampini.
 */
import React, { Component } from 'react';
import {
    Panel,
    Form,
    FormGroup,
    FormControl,
    Grid,
    Row,
    Col,
    PageHeader,
    Modal,
    Button
} from 'react-bootstrap';
import { Icon } from 'react-fa';
import Input from './Input';
import PubSub from 'pubsub-js';

class SModal extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleModalChange = this.handleModalChange.bind(this);
    }

    handleChange(event) {
        console.log('Handle change: ' + this.props.propriedade + ' && Valor: ' + event.target.value);
        this.props.handleChange(this.props.propriedade, event.target.value);
    }


    handleModalChange(event) {
        this.props.handleChange('exibeModal', event.target.value);
    }

    closeModal = () => {
        this.props.onHide;
    }

    /**
     * Custom Options
     *
     * Mandatory:   showModal
     * Mandatory:   onHide
     * Mandatory:   key
     * Mandatory:   title
     * Mandatory:   body
     * Optional:    firstBsStyle    - Style for fisrt button on Modal.Footer   | Default value: default
     * Mandatory:   firstBtnClick   -
     * Optional:    firstBtnIcon    - Icon for First Button.
     * Mandatory:   firstBtnText    - Text for Button
     * Optional:    secondBsStyle   - Style for fisrt button on Modal.Footer   | Default value: primary
     * Mandatory:   secondBtnClick  -
     * Optional:    secondBtnIcon   - Icon for Second Button.
     * Mandatory:   secondBtnText   - Text for Button
     *
     */

    render() {
        const firstBtnIcon = this.props.firstBtnIcon ? <Icon name={this.props.firstBtnIcon}/> : '';
        const secondBtnIcon = this.props.secondBtnIcon ? <Icon name={this.props.secondBtnIcon}/> : '';

        return (
            <Modal show={this.props.showModal} onHide={this.closeModal} dialogClassName={this.props.key}>
                <Modal.Header closeButton>
                    <Modal.Title componentClass="h4">
                        <div style={{textAlign: 'center', marginBottom: 0, marginTop: 0}}>
                            {this.props.title}
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.body}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle={this.props.firstBsStyle ? this.props.firstBsStyle : "default" } onClick={this.props.firstBtnClick}>{firstBtnIcon} {this.props.firstBtnText}</Button>
                    <Button bsStyle={this.props.secondBsStyle ? this.props.secondBsStyle : "primary" } onClick={this.props.secondBtnClick}>{secondBtnIcon} {this.props.secondBtnText}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default SModal;