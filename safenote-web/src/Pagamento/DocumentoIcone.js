/**
 * Created by romuloscampini.
 */
import React, {Component} from 'react';
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import {Icon} from 'react-fa';
import {LinkContainer} from 'react-router-bootstrap';

class DocumentoIcone extends Component {

    render(){
        const documento = this.props.documento;

        return (
          <div>
              <ul>
                <li><Icon name="file"/>  {documento.file.name}</li>
              </ul>
          </div>
        );
    }
}

export default DocumentoIcone;