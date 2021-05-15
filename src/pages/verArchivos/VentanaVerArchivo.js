import React from 'react'
import FileViewer from 'react-file-viewer'
function VentanaVerArchivo(){

    const file = 'localhost:8000/api/showFile/1/055625-20201223_123846.pdf'
    const type = 'pdf'

    const onError = (e) => {
        console.log(e, 'error in file-viewer');
    }

    return(
        <div>
            <FileViewer
            fileType={type}
            filePath={file}
            onError={onError}/>
        </div>
    );
}

export default VentanaVerArchivo;
