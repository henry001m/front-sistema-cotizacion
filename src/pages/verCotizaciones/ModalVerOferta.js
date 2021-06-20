import React,{useState} from 'react';
import { FileEarmarkArrowUpFill } from 'react-bootstrap-icons';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup} from 'reactstrap';
const ModalVerOferta = (props) => {
    const modalStyles={
        top:"10%",
        transfrom: 'translate(-50%, -50%)',
        width:'400px'
    }
    const [namefile, setNamefile] = useState([])
    const [fileValidate, setFileValidate] = useState(false);
    const [fl, setFl] = useState(null);
    const [oferta, setOferta ] = useState[{brand:"",industry:"",model:"",warrantyTime:""}];
    const [bandera, setBandera] = useState("");
    const closeModal = () => {
        setNamefile([])
        setFl(null)
        setFileValidate(false);
        props.cerrarOferta()
    }
    
    return (
        <Modal isOpen={props.abrirOferta} style={modalStyles}>
        <ModalHeader toggle={closeModal}>
            Agregar oferta
        </ModalHeader>
        <form > 
        <ModalBody>
            <FormGroup className="col-md-8">
            <label>Marca:</label>
                <input
                    name="nameRol"
                    className="form-control form-control-sm" 
                    type="text"
                    value={oferta.brand}
                    disabled
                ></input>
            <label>Modelo:</label>
                <input
                    name="nameRol"
                    className="form-control form-control-sm" 
                    type="text"
                    value={oferta.model}
                    disabled
                ></input>
            <label>Industria:</label>
                <input
                    name="nameRol"
                    className="form-control form-control-sm" 
                    type="text"
                    value={oferta.industry}
                    disabled
                ></input>
            <label>Tiempo de Garantia:</label>
                <input
                    name="nameRol"
                    className="form-control form-control-sm" 
                    type="text"
                    value={oferta.warrantyTime}
                    disabled
                ></input>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
                {/* {namefile.map((name,index)=>{
                    return(
                        <li key={index}>{name}</li>
                    )
                })} */}
            <div style={{width:'100%',height:'35px', display:'flex',justifyContent:'space-between'}}>
            <div className="">
                <input 
                    name="archivo"
                    type="file" 
                    id="files" 
                ></input>
                <label for="files"><FileEarmarkArrowUpFill className="mb-1"/>Ver archivo</label>
            </div>
            <Button type="button" onClick={closeModal} color="primary" size="sm">Cerrar</Button>
            </div>
        </ModalFooter>
        </form>
    </Modal> 
    )
}

export default ModalVerOferta
