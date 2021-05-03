import React, { useState, useRef, useEffect }from 'react'
import { PlusCircle } from 'bootstrap-icons-react';
import  Modal from './../../components/modal/Modal';
import { useForm } from 'react-hook-form';
import { createUser } from '../../services/http/UserService' ;
import { getRols } from '../../services/http/RolService'

function ModalAgregarUsuario(props){

    const modalref = useRef();

    const {register, formState: { errors }, handleSubmit, reset} = useForm();
    const [message, setMessage] = useState("");
    const [user, setUser]  = useState({name:"", lastName:"", ci:"", phone:"", direction:"", email:"",userName:""});
    const [idRolUSer, setIdRolUSer ] = useState("")
    const [rols, setRols ] = useState([])

    const openModal = () => {
        setUser({name:"", lastName:"", ci:"", phone:"", direction:"", email:"",userName:""});
        modalref.current.openModal()
    };

    const closeModal = () => {
        reset()
        setMessage("");
        modalref.current.closeModal()
    };

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getRols();
            setRols(response.rols);
        } catch (error) {
            console.log(error);
        }
    };

    fetchData();
    }, []);
    
    const handleInputChange = (event) => {
        console.log("cambio",event.target.value[0])
        if(event.target.value[0]==" "){
            console.log("primer",event.target.value[0])
            setUser({
                ...user,
                [event.target.name] : event.target.value.substring(1)
            });
        }else{
            setUser({
                ...user,
                [event.target.name] : event.target.value
            });
        }
    };

    const handleSelectChange = (event) => {
        setIdRolUSer(event.target.value)
    }

    const validateEmail = (e) => {
        const reg = /^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        if(/@/.test(e)){
            if (reg.exec(e)!=null) {
                return true
            }else{
                return "Este campo solo acepta caracteres alfanuméricos y especiales como el @ (arroba) .(punto) - (guión) y _ (guión bajo)"
            }
        }else{
            return "Este campo debe tener el carácter @"
        }
    };

    const SaveData = async ( ) => {
        const result = await createUser(user);
        console.log(result)
        if(result.data){
            setMessage(result.data.message);
        }
        console.log(result);
        props.updateUsers();
        if(!result.data.message){
            setUser({name:"", lastName:"", ci:"", phone:"", direction:"", email:"",userName:""});
            setIdRolUSer("")
            closeModal();
        }
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
                                            value:3,
                                            message:"Este campo debe tener entre 3 y 30 caracteres"
                                        },
                                        maxLength:{
                                            value:30,
                                            message:"Este campo debe tener entre 3 y 30 caracteres"
                                        },
                                        pattern:{
                                            value: /^[Ññíóáéú a-zA-Z ]+$/,
                                            message:"Este campo solo acepta caracteres alfabéticos"
                                        },
                                    })}
                                    value={user.name}
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
                                            value:3,
                                            message:"Este campo debe tener entre 3 y 30 caracteres"
                                        },
                                        maxLength:{
                                            value:30,
                                            message:"Este campo debe tener entre 3 y 30 caracteres"
                                        },
                                        pattern:{
                                            value: /^[Ññíóáéú a-zA-Z ]+$/,
                                            message:"Este campo solo acepta caracteres alfabéticos"
                                        },
                                    })}
                                    value={user.lastName}
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
                                            message:"Este campo debe tener entre 6 y 10 valores numéricos"
                                        },
                                        maxLength:{
                                            value:10,
                                            message:"Este campo debe tener entre 6 y 10 valores numéricos"
                                        },
                                        pattern:{
                                            value:/^[0-9]+$/,
                                            message:"Este campo solo acepta valores numéricos"
                                        }
                                    })}
                                    value={user.ci}
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
                                            message:"Este campo debe tener entre 7 y 8 números"
                                        },
                                        maxLength:{
                                            value:8,
                                            message:"Este campo debe tener entre 7 y 8 números"
                                        },
                                        pattern:{
                                            value:/^[0-9]+$/,
                                            message:"Este campo solo acepta valores numéricos"
                                        },
                                    })}
                                    value={user.phone}
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
                                            message:"Este campo debe tener entre 10 y 30 caracteres"
                                        },
                                        maxLength:{
                                            value:30,
                                            message:"Este campo debe tener entre 10 y 30 caracteres"
                                        },
                                    })}
                                    value={user.direction}
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
                                        validate:{
                                            value:(value)=>validateEmail(value)
                                        },
                                        minLength:{
                                            value:11,
                                            message:"Este campo debe tener mínimo 11 caracteres"
                                        },
                                        // pattern:{
                                        //     value:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                                        //     message:"Dato invalido"
                                        // },
                                    })}
                                    value={user.email}
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
                                            value:5,
                                            message:"Este campo debe tener entre 5 y 15 caracteres"
                                        },
                                        maxLength:{
                                            value:15,
                                            message:"Este campo debe tener entre 5 y 15 caracteres"
                                        },
                                        pattern:{
                                            value:/^[\w._-]+$/,
                                            message:"Este campo solo acepta caracteres alfanuméricos y especiales como el .(punto) - (guión) y _ (guión bajo)"
                                        },
                                    })}
                                    value={user.userName}
                                    type="text" 
                                    className="form-control"
                                    onChange={ handleInputChange }
                                    ></input>
                                    {errors.userName && <span className="text-danger text-small d-block mb-2">{errors.userName.message}</span>}
                                </div>
                                <div className="form-group col-md-6">
                                        <label for="selectRol">Rol de Usuario:</label>
                                        <select 
                                        name="selectRol"
                                        {...register("selectRol",{
                                            required:"Seleccione su rol"
                                        })}
                                        className="form-control"
                                        onChange={ handleSelectChange }>
                                            <option value="">Seleccione su Rol...</option>
                                            {
                                                rols.map((rol, index)=>{
                                                    return(
                                                        <option value={rol.id} key={index}>{rol.nameRol}</option>   
                                                    )
                                                })
                                            }
                                        </select>
                                        {errors.selectRol && <span className="text-danger text-small d-block mb-2">{errors.selectRol.message}</span>}
                                    </div>
                            </div>
                            <div className="form-row">
                                <span style={{color:"red"}}>
                                {message}
                                </span>
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