import React,{useState}from 'react'
import { useForm } from "react-hook-form";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import {login,detailsUser} from '../../services/http/authService';
const IniciarSesion = (props) => {
    const { register, handleSubmit, formState: { errors }, reset} = useForm();
    const [ userName, setUserName ] = useState("");
    const [ passwd, setPassword ] = useState("");

    const closeModal = () => {
        props.cerrarModal()
        setUserName("")
        setPassword(" ")
        reset()
    }

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
                    <input 
                        name="userName" 
                        {...register("userName",
                         { 
                             required:{
                                 value: true,
                                 message: 'Campo requerido'
                             },
                             maxLength:{
                                value:15,
                                message:'Este campo debe tener máximo 15 caracteres'
                            }

                             })}
                             className="form-control" 
                            ></input>

                            { errors.userName &&
                            <span className="text-danger text-small d-block mb-2">
                                {errors.userName.message}
                            </span>}
                    <Label for="password">
                        Contaseña
                    </Label>
                    <input 
                        name="password"
                        type="password" 
                        {...register("password", 
                        { required: {
                            value:true,
                            message: "Campo requerido"
                        },
                        maxLength:{
                            value:20,
                            message:'Este campo debe tener máximo 20 caracteres'    
                        }}
                        )}
                        className="form-control" 
                        id="password" 
                        
                     ></input>
                            { errors.password &&
                            <span className="text-danger text-small d-block mb-2">
                                {errors.password.message}
                            </span>}
                </ModalBody>
                <ModalFooter>
                    <Button  onClick={closeModal} >Cancelar</Button>
                    <Button type="submit" color="primary">Guardar</Button>
                </ModalFooter>
                </form>
            </Modal>
            
        </div>
    )
}

export default IniciarSesion
