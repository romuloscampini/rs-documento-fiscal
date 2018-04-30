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

class ButtonWithTooltip extends React.Component {

    render(){
        let tooltip = <span></span>;

        if(this.props.tooltip) {
            tooltip = <Tooltip id="tooltip"><strong>{this.props.tooltip}</strong></Tooltip>;
        };

        return (
            <OverlayTrigger placement={this.props.placement != null ? this.props.placement : 'top'} overlay={tooltip}>
                <Button bsStyle={this.props.bsStyle != null ? this.props.bsStyle : 'default'}
                        disabled={this.props.disabled}
                        onClick={this.props.onClick}
                        bsSize={this.props.bsSize != null ? this.props.bsSize : null }
                >
                    <Icon name={this.props.icon}/>
                    {this.props.text}
                </Button>
            </OverlayTrigger>
        );
    }
}

export default ButtonWithTooltip;
