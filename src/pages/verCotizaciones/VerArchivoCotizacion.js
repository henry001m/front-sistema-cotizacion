import React, { useEffect, useState } from 'react'
import FileViewer from 'react-file-viewer'
import { useParams } from 'react-router-dom'
import {URL_API} from '../../services/const';

function VerArchivoCotizacion(){
    
    const {aux} = useParams();
    const {fl} = useParams();

    const file = URL_API+'/quotation/showFiles/detail/'+fl;
    const [type, setType] = useState("")

    useEffect(() => {
        const ext = getFileExtension(fl)
        setType(ext)
    }, []);

    const getFileExtension = (filename) => {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }
    
    const onError = (e) => {
        console.log(e, 'error in file-viewer');
    }

    const getRuta = () => {
        console.log(aux)
        if(aux==1){
            return(URL_API+'/quotation/showFiles/detail/'+fl)
        }else{
            return(URL_API+'/ua/quotation/showFiles/detail/'+fl)
        }
    }

    return(
        <div style={{width:"100%", height:"500px", textAlign:"center", backgroundColor:"grey"}}>
            <div style={{width:"100%", height:"100%"}}>
                <FileViewer
                fileType={type}
                filePath={getRuta()}
                onError={onError}
                style={{margin:"10px"}}/>
            </div>
        </div>
    );
}

export default VerArchivoCotizacion;