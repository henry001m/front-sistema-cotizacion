import React, { useState, useRef }from 'react'
import { PlusCircle } from 'bootstrap-icons-react';
import  Modal from './../../components/modal/Modal';
import { useForm } from 'react-hook-form';
import { createUser } from '../../services/Http/UserService' ;
function ModalAgregarUsuario(props){

    const modalref = useRef();

    const openModal = () => {
        modalref.current.openModal()
    };

    const closeModal = () => {
        modalref.current.closeModal()
    };

    const {register, formState: { errors }, handleSubmit, reset} = useForm();

    const [user, setUser]  = useState({name:"", lastName:"", ci:null, phone:null, direction:"", email:"",userName:""});
    
    const handleInputChange = (event) => {
        setUser({
            ...user,
            [event.target.name] : event.target.value
        });
    };

    const SaveData = async ( ) => {
        console.log("enviar",user);
        const result = await createUser(user);
        props.updateUsers();
        console.log("resultado",result);
        reset();
        closeModal();
    };

    return(
        <>
            <button type="button" className="btn btn-success" onClick={ openModal }> 
                <PlusCircle className="mb-1"/> Nuevo 
            </button>
            <Modal ref={modalref}>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Agregar Usuario</h5>
                        <button type="button" className="close" onClick={ closeModal }>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(SaveData)}> 
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombres:</label>
                                    <input
                                    name="name" 
                                    {...register("name",{
                                        required:"Campo requerido",
                                        minLength:{
                                            value:10,
                                            message:"Dato invalido"
                                        },
                                        maxLength:{
                                            value:30,
                                            message:"Dato invalido"
                                        },
                                        pattern:{
                                            value: /^[Ññíóáéú a-zA-Z ]+$/,
                                            message:"Dato invalido"
                                        }
                                    })}
                                    type="text" 
                                    className="form-control"
                                    onChange={ handleInputChange }
                                    ></input>
                                    {errors.name && <span className="text-danger text-small d-block mb-2">{errors.name.message}</span>}
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Apellidos:</label>
                                    <input 
                                    name="lastName"
                                    {...register("lastName",{
                                        required:"Campo requerido",
                                        minLength:{
                                            value:10,
                                            message:"Dato invalido"
                                        },
                                        maxLength:{
                                            value:30,
                                            message:"Dato invalido"
                                        },
                                        pattern:{
                                            value: /^[Ññíóáéú a-zA-Z ]+$/,
                                            message:"Dato invalido"
                                        }
                                    })}
                                    type="text" 
                                    className="form-control" 
                                    onChange={ handleInputChange }
                                    ></input>
                                    {errors.lastName && <span className="text-danger text-small d-block mb-2">{errors.lastName.message}</span>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Carnet de Identidad:</label>
                                    <input 
                                    name="ci"
                                    {...register("ci",{
                                        required:"Campo requerido",
                                        minLength:{
                                            value:6,
                                            message:"Dato invalido"
                                        },
                                        maxLength:{
                                            value:10,
                                            message:"Dato invalido"
                                        },
                                        pattern:{
                                            value:/^[0-9]+$/,
                                            message:"dato invalido"
                                        }
                                    })}
                                    type="text" 
                                    className="form-control" 
                                    onChange={ handleInputChange }
                                    ></input>
                                    {errors.ci && <span className="text-danger text-small d-block mb-2">{errors.ci.message}</span>}
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Telefono:</label>
                                    <input 
                                    name="phone"
                                    {...register("phone",{
                                        required:"Campo requerido",
                                        minLength:{
                                            value:7,
                                            message:"Dato invalido"
                                        },
                                        pattern:{
                                            value:/^[0-9]+$/,
                                            message:"dato invalido"
                                        }
                                    })}
                                    type="text" 
                                    className="form-control" 
                                    onChange={ handleInputChange }
                                    ></input>
                                    {errors.phone && <span className="text-danger text-small d-block mb-2">{errors.phone.message}</span>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Direccion:</label>
                                    <input
                                    name="direction" 
                                    {...register("direction",{
                                        required:"Campo requerido",
                                        minLength:{
                                            value:10,
                                            message:"Dato invalido"
                                        },
                                        maxLength:{
                                            value:30,
                                            message:"Dato invalido"
                                        },
                                        pattern:{
                                            value: /^[Ññíóáéú a-zA-Z ]+$/,
                                            message:"Dato invalido"
                                        }
                                    })}
                                    type="text" 
                                    className="form-control" 
                                    onChange={ handleInputChange }
                                    ></input>
                                    {errors.direction && <span className="text-danger text-small d-block mb-2">{errors.direction.message}</span>}
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Correo Electronico:</label>
                                    <input 
                                    name="email"
                                    {...register("email",{
                                        required:"Campo requerido",
                                        minLength:{
                                            value:10,
                                            message:"Dato invalido"
                                        },
                                        pattern:{
                                            value:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                                            message:"Dato invalido"
                                        }
                                    })}
                                    type="text" 
                                    className="form-control" 
                                    onChange={ handleInputChange }
                                    ></input>
                                    {errors.email && <span className="text-danger text-small d-block mb-2">{errors.email.message}</span>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombre de usuario:</label>
                                    <input
                                    name="userName" 
                                    {...register("userName",{
                                        required:"Campo requerido",
                                        minLength:{
                                            value:3,
                                            message:"Dato invalido"
                                        },
                                        maxLength:{
                                            value:30,
                                            message:"Dato invalido"
                                        }
                                    })}
                                    type="text" 
                                    className="form-control"
                                    onChange={ handleInputChange }
                                    ></input>
                                    {errors.userName && <span className="text-danger text-small d-block mb-2">{errors.userName.message}</span>}
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Rol de Usuario:</label>
                                    <select id="inputState" className="form-control">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col" id="toolbar">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal} id="btnV">Cancelar</button>
                                    <button type="submit" className="btn btn-primary" id="btnV">Guardar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ModalAgregarUsuario;