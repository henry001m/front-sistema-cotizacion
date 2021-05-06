import React, {useState} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, InputGroupText} from 'reactstrap';
import './RolDeUser.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { useForm } from "react-hook-form";
import { createRol } from '../../services/http/RolService'


function RolDeUser(){
    const [abierto, setAbierto] = useState()

    const [newRol, setNewRol ] = useState({nameRol:"",description:""})
    
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    
    const modalStyles={
        top:"20%",
        transfrom: 'translate(-50%, -50%)'
    }

    const abrirModal = () =>{
        if(abierto){
            setNewRol({nameRol:"",description:""});
            setAbierto(false)
        }else{
            setNewRol({nameRol:"",description:""});
            setAbierto(true)
        }
        reset();
    }

    const handleInputChange = (event) => {
        if(event.target.value[0]==" "){
            setNewRol({
                ...newRol,
                [event.target.name] : event.target.value.substring(1)
            });
        }else{
            setNewRol({
                ...newRol,
                [event.target.name] : event.target.value
            });
        }
    };
    
    const onSubmit = async ( )  => {
        const result = await createRol(newRol);
        setNewRol({nameRol:"",description:""});
        reset()

    }
        return(
            <>
            <button className="btn btn-sm" onClick={abrirModal}>
                Rol de Usuarios
            </button>
            <div>
            <Modal isOpen={abierto} style={modalStyles}>
            <ModalHeader>
                Agregar Nuevo Rol
                <a className="btnx" type="button" onClick={abrirModal}><i className="bi bi-x" ></i></a>
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody className="modalBody">
                    <FormGroup>
                        <div className="form-group mt-2">
                            <h6>Nombre de Rol de Usuario:</h6>
                            <input
                            type="text"
                            name="nameRol"
                            {...register("nameRol",{
                                required:"Campo requerido",
                                minLength:{
                                    value:3,
                                    message:"Este campo debe tener entre 3 y 50 caracteres"
                                },
                                maxLength:{
                                    value:50,
                                    message:"Este campo debe tener entre 3 y 50 caracteres"
                                },
                                pattern:{
                                    value: /^[Ññíóáéú. a-zA-Z ]+$/,
                                    message:"El campo solo permite caracteres alfabeticos"
                                }
                            })}
                            value={newRol.nameRol}
                            onChange={ handleInputChange }
                            className ="form-control"
                            />
                            {errors.nameRol && <span className="text-danger text-small d-block mb-2">{errors.nameRol.message}</span>}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="form-group mt-2">
                            <h6>Descripción de Rol:</h6>
                            <textarea
                            type="text"
                            name="description"
                            {...register("description",{
                                required:"Campo requerido",
                                minLength:{
                                    value:15,
                                    message:"Este campo debe tener entre 15 y 200 caracteres"
                                },
                                maxLength:{
                                    value:200,
                                    message:"Este campo debe tener entre 15 y 200caracteres"
                                }
                            })}
                            value={newRol.description}
                            onChange={ handleInputChange }
                            className ="form-control"
                            />
                            {errors.description && <span className="text-danger text-small d-block mb-2">{errors.description.message}</span>}
                        </div>
                    </FormGroup>
                        <div className=" btnCancel mt-5">
                            <div className="cancel"><Button  onClick={abrirModal}>Cancelar</Button></div>
                            <div className="guardar"><Button type="submit" color="primary">Guardar</Button></div>
                        </div>
                    
                    </ModalBody>
                    </form>
            </Modal>
            </div>
            </>
            )
}

export default RolDeUser