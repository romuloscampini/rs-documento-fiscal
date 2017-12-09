/**
 * Created by romuloscampini.
 */

import React, {Component} from 'react';
import Dropzone from 'react-dropzone';


class UploadBox extends Component {

    constructor(props){
        super(props)
    }

    uploadFile(acceptedFiles, rejectedFiles) {
        console.log('Accepted files: ', acceptedFiles);
        console.log('Rejected files: ', rejectedFiles);

        this.props.uploadFile(this.props.propriedade, acceptedFiles);
        // var req = request.post(API_URL.pagamento + '/upload');
        // acceptedFiles.forEach((file)=> {
        //     req.attach(file.name, file);
        // });
        // req.end(function(err, res){
        //     console.log(res);
        // });
    }

    render(){
        let dropzoneRef;

        return (

            <div>
                <Dropzone ref={(node) => { dropzoneRef = node; }} onDrop={this.uploadFile.bind(this)} multiple={false}>
                    <h3> Arquivo anexo: </h3>

                    <ul>
                        { this.props.documentos.map(f => <li>{f.name} - {f.size} bytes</li>)}
                    </ul>
                        {({ isDragActive, isDragReject }) => {
                        if (isDragActive) {
                            return "This file is authorized";
                        }
                        if (isDragReject) {
                            return "This file is not authorized";
                        }
                        return "Try dropping some files";
                    }}
                    <div>Try dropping some files here, or click to select files to upload.</div>
                    <p>Documentos adicionados: 0</p>
                </Dropzone>
            </div>
        );
    }
}

export default UploadBox;