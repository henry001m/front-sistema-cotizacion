import React, { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { getRols } from '../../services/http/RolService'
import { updateRolUser } from '../../services/http/RolService'
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import './RolDeUser.css';
import './Usuario.css'

function ModalEditarUsuario( props ){

    const {register, formState: { errors }, handleSubmit, reset } = useForm();

    const [rols, setRols ] = useState([])
    const [ idRol, setIdRol ] = useState(props.user.userRol[0].id)
    const [ rolUser, setRolUser ] = useState({value:props.user.userRol[0].id, nameRol:props.user.userRol[0].nameRol})

    const closeModal = () => {
        reset()
        props.CloseModalEditarU()
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

    const handleSelectChange = (event) => {
        setIdRol(event.target.value)
    };

    const saveData = async () => {
        try{
            const result = await updateRolUser(props.user.id,idRol);
            props.CloseModalEditarU()
            closeModal()
            props.updateUsers()
        }catch(error){
            console.log( error )
        }
    };

    return(
        <>
            <Modal isOpen={props.isShowModalEditarU}>
            <form onSubmit={handleSubmit(saveData)}>
                <ModalHeader toggle={closeModal}>
                    <h4>Editar Usuario</h4>
                </ModalHeader>
                <ModalBody>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <h6>Nombres:</h6>
                        <input
                            name="nameUnidadGasto"
                            className="form-control"
                            type="text"
                            value={props.user.name}
                            disabled
                        ></input>   
                    </div>
                    <div className="form-group col-md-6">
                        <h6>Apellidos:</h6>
                        <input
                            name="nameUnidadGasto"
                            className="form-control"
                            type="text"
                            value={props.user.lastName}
                            disabled
                        ></input>   
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <h6>Carnet de Identidad:</h6>
                        <input
                            name="nameUnidadGasto"
                            className="form-control"
                            type="text"
                            value={props.user.ci}
                            disabled
                        ></input>
                    </div>
                    <div className="form-group col-md-6">
                        <h6>Telefono:</h6>
                        <input
                            name="nameUnidadGasto"
                            className="form-control"
                            type="text"
                            value={props.user.phone}
                            disabled
                        ></input> 
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <h6>Direccion:</h6>
                        <input
                            name="nameUnidadGasto"
                            className="form-control"
                            type="text"
                            value={props.user.direction}
                            disabled
                        ></input> 
                    </div>
                    <div className="form-group col-md-6">
                        <h6>Correo Electronico:</h6>
                        <input
                            name="nameUnidadGasto"
                            className="form-control"
                            type="text"
                            value={props.user.email}
                            disabled
                        ></input> 
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <h6>Nombre de usuario:</h6>
                        <input
                            name="nameUnidadGasto"
                            className="form-control"
                            type="text"
                            value={props.user.userName}
                            disabled
                        ></input> 
                    </div>
                    <div className="form-group col-md-6">
                            <label>Rol de Usuario:</label>
                            <select 
                            name="selectFacultad"
                            {...register("selectFacultad",{
                                required:"Seleccione un rol"
                            })}
                            // defaultValue={{value:props.user.userRol[0].id, label:props.user.userRol[0].nameRol}}
                            className="form-control"
                            onClick={handleSelectChange}>
                                <option value="">{props.user.userRol}</option>
                                {
                                    rols.map((role, index)=>{
                                         if(role.nameRol != props.user.userRol){
                                            return(
                                                <option value={role.id} key={index}>{role.nameRol}</option>   
                                            )
                                        }
                                    })
                                }
                            </select>
                            {errors.selectFacultad && <span className="text-danger text-small d-block mb-2">{errors.selectFacultad.message}</span>}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-secondary btn-sm"
                        onClick={closeModal}
                    >Cancelar</button>
                    <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                </ModalFooter>
                </form>
            </Modal>
        </>
    );
}

export default ModalEditarUsuario;