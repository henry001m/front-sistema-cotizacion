import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import { useForm } from "react-hook-form";

const OfertaModal = (props) => {
    const modalStyles={
        top:"20%",
        transfrom: 'translate(-50%, -50%)',
        width:'400px'
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const closeModal = () => {
        reset()
        props.cerrarModal()
    }
    const onSubmit=()=>{

    }
    return (
        <Modal isOpen={props.abierto} style={modalStyles}>
        <ModalHeader toggle={closeModal}>
            Agregar oferta
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}> 
        <ModalBody>
            <FormGroup className="col-md-8">
               <Label for="prueba">
                    prueba:
               </Label>
                
            </FormGroup>
        </ModalBody>  
        <ModalFooter>
            <Button  onClick={closeModal} >Cancelar</Button>
            <Button type="submit" color="primary">Guardar</Button>
        </ModalFooter>
        </form>
    </Modal> 
    )
}

export default OfertaModal
