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
                        <label>Nombres:</label>
                        <label class="col-form-label"> {props.user.name}</label>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Apellidos:</label>
                        <label class="col-form-label"> {props.user.lastName}</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Carnet de Identidad:</label>
                        <label class="col-form-label"> {props.user.ci}</label>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Telefono:</label>
                        <label class="col-form-label"> {props.user.phone}</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Direccion:</label>
                        <label class="col-form-label"> {props.user.direction}</label>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Correo Electronico:</label>
                        <label class="col-form-label"> {props.user.email}</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Nombre de usuario:</label>
                        <label class="col-form-label"> {props.user.userName}</label>
                    </div>
                    <div className="form-group col-md-6">
                            <label>Rol de Usuario:</label>
                            <select 
                            name="selectFacultad"
                            {...register("selectFacultad",{
                                required:"Seleccione facultad"
                            })}
                            defaultValue={{value:props.user.userRol[0].id, label:props.user.userRol[0].nameRol}}
                            className="form-control"
                            onClick={handleSelectChange}>
                                <option value={props.user.userRol[0].id}>{props.user.userRol[0].nameRol}</option>
                                {
                                    rols.map((rol, index)=>{
                                        if(props.user.userRol[0].id != rol.id){
                                            return(
                                                <option value={rol.id} key={index}>{rol.nameRol}</option>   
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