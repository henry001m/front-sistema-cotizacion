import React, { useState, useRef, useEffect }from 'react'
import { PlusCircle } from 'react-bootstrap-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { createUser } from '../../services/http/UserService' ;
import { getRols } from '../../services/http/RolService';

function ModalAgregarUsuario(props){

    // const modalref = useRef();
    const {register, formState: { errors }, handleSubmit, reset} = useForm();
    const [message, setMessage] = useState("");
    const [user, setUser]  = useState({name:"", lastName:"", ci:"", phone:"", direction:"", email:"",userName:""});
    const [idRolUSer, setIdRolUSer ] = useState("")
    const [rols, setRols ] = useState([])

    const closeModal = () => {
        reset()
        setMessage("");
        setUser({name:"", lastName:"", ci:"", phone:"", direction:"", email:"",userName:""})
        setIdRolUSer("")
        props.CloseModalAgregarU()
    };

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getRols();
            setRols(response.roles);
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
        const result = await createUser(user,idRolUSer);
        console.log(result)
        if(result.data){
            setMessage(result.data.message);
        }
        console.log(result);
        props.updateUsers();
        if(!result.data.message){
            closeModal();
        }
    };

    return(
        <>
            <Modal isOpen={props.isShowModalAgregarU}>
            <form onSubmit={handleSubmit(SaveData)}> 
                <ModalHeader toggle={closeModal}>
                    <h4>Agregar Usuario</h4>
                </ModalHeader>
                <ModalBody>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <h6>Nombres:</h6>
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
                        <h6>Apellidos:</h6>
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
                        <h6>Carnet de Identidad:</h6>
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
                        <h6>Telefono:</h6>
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
                        <h6>Direccion:</h6>
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
                        <h6>Correo Electronico:</h6>
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
                    <h6>Nombre de usuario:</h6>
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
                        <h6>Rol de Usuario:</h6>
                        <select 
                        name="selectRol"
                        {...register("selectRol",{
                            required:"Seleccione su rol"
                        })}
                        className="form-control"
                        onChange={ handleSelectChange }>
                            <option value="">Seleccione su Rol...</option>
                            {
                                rols.map((role, index)=>{
                                    return(
                                        <option value={role.id} key={index}>{role.nameRol}</option>   
                                    )
                                })
                            }
                        </select>
                            {errors.selectRol && <span className="text-danger text-small d-block mb-2">{errors.selectRol.message}</span>}
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button type="button" className="btn btn-secondary" onClick={closeModal} id="btnV">Cancelar</button>
                <button type="submit" className="btn btn-primary" id="btnV">Guardar</button>
            </ModalFooter>          
            </form>
            </Modal>
        </>
    );
}

export default ModalAgregarUsuario;