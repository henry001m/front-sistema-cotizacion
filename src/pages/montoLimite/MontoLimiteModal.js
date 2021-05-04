import React,{useState} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import { useForm } from "react-hook-form";
import {createMontoLimite} from '../../services/http/MontoLimiteService';

const MontoLimiteModal = (props) => {
    const [monto, setMonto] = useState(0);
    const modalStyles={
        top:"20%",
        transfrom: 'translate(-50%, -50%)',
        width:'400px'
    }
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onSubmit = (data) => {
        setMonto(data.monto)
        console.log(data.monto)
    }
    return (
    <Modal isOpen={props.abierto} style={modalStyles}>
        <ModalHeader>
            Actualizar Monto Limite
            <i class="bi bi-x"></i>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}> 
        <ModalBody>
            <FormGroup className="col-md-8">
               <Label for="unidadGasto">
                    Monto Limite:
               </Label>
                <input name="monto" 
                {...register("monto", 
                { required: true,
                
                })} 
                className="form-control"
                type="number"
                />
                <br/>
                {errors.monto && <span className="text-danger text-small d-block mb-2">Este campo es requerido</span>}
            </FormGroup>
        </ModalBody>  
        <ModalFooter>
            <Button  onClick={props.cerrarModal} >Cancelar</Button>
            <Button type="submit" color="primary">Guardar</Button>
        </ModalFooter>
        </form>
    </Modal> 
    )
}

export default MontoLimiteModal
