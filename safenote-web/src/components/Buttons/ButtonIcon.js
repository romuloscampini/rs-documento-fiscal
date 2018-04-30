/**
 * Created by romuloscampini.
 */

import React from 'react';
import {
    Button,
    OverlayTrigger ,
    Tooltip
} from 'react-bootstrap';
import Icon from 'react-fa';

class ButtonIcon extends React.Component {

    render(){
        let tooltip = <span></span>;

        if(this.props.tooltip) {
            tooltip = <Tooltip id="tooltip"><strong>{this.props.tooltip}</strong></Tooltip>;
        };

        return (
            <OverlayTrigger placement={this.props.placement != null ? this.props.placement : 'top'} overlay={tooltip}>
                <Button bsClass={this.props.bsClass}
                        disabled={this.props.disabled}
                        onClick={this.props.onClick}
                        {...this.props}>
                    <Icon name={this.props.icon}/>
                </Button>
            </OverlayTrigger>
        );
    }
}

export default ButtonIcon;
