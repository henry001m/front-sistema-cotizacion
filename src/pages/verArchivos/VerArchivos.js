
import React, {useEffect, useState} from "react"
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { useForm } from "react-hook-form";
import {getFiles} from '../../services/http/QuotitationService';
import './VerArchivos.css'

function ModalArchivos  (props){  

    const [archivos, setArchivos] = useState([]);

    useEffect(() => {
        async function getArchivo() {
        const result = await getFiles(1);
        setArchivos(result);
        }
        getArchivo();
    }, []); 

    const verArchivos = archivos.map((archivos,index)=>{
        return(
            <tr key={index}>
                <th scope="row">
                    {index+1}         
                </th>
                <td >
                    <a href="#">
                    {archivos}  
                    </a>       
                </td>
               
            </tr>
        );
    });
 


    const modalStyles={
        top:"10%",
        transfrom: 'translate(-50%, -50%)',         
    }



   
    return(    
            <Modal isOpen={props.abierto} className="modal-body" style={modalStyles}>
                <ModalHeader>
                    <div className="title">
                        <h1>Archivos</h1>
                    </div>
                    <a className="btnx" type="button" onClick={()=>props.cerrarModal()}>
                        <i className="bi bi-x" ></i>
                    </a>
                </ModalHeader>
                <div className="fileDocs">
                <ModalBody className="modal-body">
                 
                        <table className="table table-files">
                            <thead>
                               
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Documento</th>
                                </tr>
                                <tr >
                                    
                                    {verArchivos}
                
                                </tr> 
                                
                            </thead>
                        </table>
                 
                </ModalBody>
                </div>
            </Modal>
    );
}

export default ModalArchivos



