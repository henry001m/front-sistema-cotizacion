import React, { useRef, useState} from 'react'
import Modal from '../../components/modal/Modal'
import { useForm } from 'react-hook-form';


function ModalEditarUsuario( props ){
    const modalref = useRef();

    const {register, formState: { errors }, handleSubmit, reset } = useForm();

    const [ nameUnidadAdministrativa, setNameUnidadAdministrativa ] = useState("");

    const [ facultades, setFacultades ] = useState(["derecho","economia","tecnologia","arquitectura"]);

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
        }else{
            closeModal();
        }
    };

    const handleInputChange = (event) => {
        if(event.target.value[0]==" "){
            setNameUnidadAdministrativa(
                event.target.value.substring(1)
            );
        }else{
            setNameUnidadAdministrativa(
                event.target.value
            );
        } 
    };

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
                                <h5 className="modal-title" id="exampleModalLongTitle">Agregar Unidad Administrativa</h5>
                                <button type="button" className="close" onClick={() => props.CloseModalEditarU()}>
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
                                            <option value="">Seleccione su Rol...</option>
                                            {
                                                /*facultades.map((facultad, index)=>{
                                                    return(
                                                        <option value={facultad}>{facultad}</option>   
                                                    )
                                                })*/
                                            }
                                            <option value="Administrador">Administrador</option>
                                            <option value="Jefe Administrativo">Jefe Administrativo</option>
                                        </select>
                                        {errors.selectFacultad && <span className="text-danger text-small d-block mb-2">{errors.selectFacultad.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">Cancelar</button>
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