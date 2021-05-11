import React from 'react'
import { useForm } from "react-hook-form";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import {login,detailsUser} from '../../services/http/authService';
const IniciarSesion = (props) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        const res = await login(data);
        window.localStorage.setItem("tokenContizacion",res.data.success.token);
        userDetails();
    };
    const userDetails =async()=>{
        const res = await detailsUser();
        console.log(res);
        try {
            window.localStorage.setItem("userDetails",JSON.stringify(res.data));
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    
    const modalStyles={
        top:"20%",
        transfrom: 'translate(-50%, -50%)',
        width:'400px'
    }
    return (
        <div>
            <Modal isOpen={props.abierto} style={modalStyles}>
                <ModalHeader>
                   INICIAR SESIÓN
                </ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                    <Label for="username">
                        Usuario
                    </Label>
                    <input className="form-control" id="username" {...register("userName", { required: true, maxLength: 20 })} />
                    <Label for="password">
                        Contaseña
                    </Label>
                    <input type="password" className="form-control" id="password" {...register("password", { required: true, maxLength: 20 })} />
                </ModalBody>
                <ModalFooter>
                    <Button  onClick={props.cerrarModal} >Cancelar</Button>
                    <Button type="submit" color="primary">Guardar</Button>
                </ModalFooter>
                </form>
            </Modal>
            
        </div>
    )
}

export default IniciarSesion
