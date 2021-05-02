import React, { useRef, useState, useEffect } from 'react'
import Modal from '../../components/modal/Modal'
import { useForm } from 'react-hook-form';
import { getRols } from '../../services/http/RolService'


function ModalEditarUsuario( props ){
    const modalref = useRef();

    const {register, formState: { errors }, handleSubmit, reset } = useForm();

    const [rols, setRols ] = useState([])

    const openModal = () => {
        modalref.current.openModal()
    };

    const closeModal = () => {
        modalref.current.closeModal()
    };

    const OpenCloseModal = () => {
        if(props.isShowModalEditarU==true){
            openModal();
            console.log(props.user.lastName)
        }
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

    /*const handleInputChange = (event) => {
        if(event.target.value[0]==" "){
            
        }else{
            
        } 
    };*/

    const saveData = () => {

    }

    return(
        <>
            {
                OpenCloseModal()
            }
            <Modal ref={ modalref }>
                <form onSubmit={handleSubmit(saveData)}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Editar Usuario</h5>
                                <button type="button" className="close" 
                                onClick={() => {props.CloseModalEditarU(); closeModal()}}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombres:</label>
                                    <input
                                    name="name" 
                                    value={props.user.name}
                                    type="text" 
                                    className="form-control"
                                    ></input>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Apellidos:</label>
                                    <input 
                                    name="lastName"
                                    value={props.user.lastName}
                                    type="text" 
                                    className="form-control"
                                    ></input>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Carnet de Identidad:</label>
                                    <input 
                                    name="ci"
                                    value={props.user.ci}
                                    type="text" 
                                    className="form-control"
                                    ></input>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Telefono:</label>
                                    <input 
                                    name="phone"
                                    value={props.user.phone}
                                    type="text" 
                                    className="form-control"
                                    ></input>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Direccion:</label>
                                    <input
                                    name="direction" 
                                    value={props.user.direction}
                                    type="text" 
                                    className="form-control"
                                    ></input>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Correo Electronico:</label>
                                    <input 
                                    name="email"
                                    value={props.user.email}
                                    type="text" 
                                    className="form-control" 
                                    ></input>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombre de usuario:</label>
                                    <input
                                    name="userName"
                                    value={props.user.userName}
                                    type="text" 
                                    className="form-control"
                                    ></input>
                                </div>
                                <div className="form-group col-md-6">
                                        <label>Rol de Usuario:</label>
                                        <select 
                                        name="selectFacultad"
                                        {...register("selectFacultad",{
                                            required:"Seleccione facultad"
                                        })}
                                        className="form-control">
                                            <option value={props.user.userRol[0].nameRol}>{props.user.userRol[0].nameRol}</option>
                                            {
                                                rols.map((rol, index)=>{
                                                    if(rol.nameRol!=props.user.userRol[0].nameRol){
                                                        return(
                                                            <option value={rol.nameRol} key={index}>{rol.nameRol}</option>   
                                                        )
                                                    }
                                                })
                                            }
                                        </select>
                                        {errors.selectFacultad && <span className="text-danger text-small d-block mb-2">{errors.selectFacultad.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-sm"
                                onClick={() => {props.CloseModalEditarU(); closeModal()}}
                                >Cancelar</button>
                                <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                            </div>
                            </div>
                        </div>
                </form>
            </Modal>
        </>
    );
}

export default ModalEditarUsuario;