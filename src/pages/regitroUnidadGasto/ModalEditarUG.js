import React,{useState,useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {createUnidadGasto} from '../../services/http/UniGastoService';
import { useForm } from "react-hook-form";

function ModalEditarUG (props){
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    //const [ admins, setAdmins] = useState([]);
    //const [ idAdmin, setIdAdmin ] = useState(props.gasto.admin[0].id)
    const [ admins, setAdmins] = useState([
        {id:1 , nameAdmin:"Rodrigo Cespedes"},
        {id:2 , nameAdmin:"Yurguen Pariente"},
        {id:3 , nameAdmin:"Ramiro Saavedra"},
    ]);
    const modalStyles={
        top:"10%",
        transfrom: 'translate(-50%, -50%)'
    }

    const closeModal = () => {
        props.cerrarEditor()
        reset()
    }

    const onSubmit = async () => {
        try{
            // const res = await updateAdmin(props.gasto.id,idAdmin);
            // alert(res.message);
            console.log("entro aca en editor");
            props.cerrarEditor();
            closeModal()
            props.updateGastos();
        }catch(error){
            console.log( error )
        }
    };

    return (
        <>
        <Modal isOpen={props.abrirEditor} style={modalStyles}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader toggle={closeModal}>
            Editar Unidad de Gasto
            </ModalHeader>  
            <ModalBody>
            <div className="form-rom">
                <div className="form-group col-md-10">
                    <h5>Nombre de Unidad de Gasto:</h5>
                        <input
                            name="nameUnidadGasto"
                            className="form-control"
                            type="text"
                            value={props.gasto.nameUnidadGasto}
                            disabled
                        ></input>
                </div>
                <div className="form-group col-md-10">
                    <h5>Facultad:</h5>
                <select 
                    name="faculties_id"
                    className="form-control"
                    disabled>
                        <option value="">{props.gasto.faculty.nameFacultad}</option>
                    </select>
                </div>
                <div className="form-group col-md-10">
                    <h5>Administrador de Unidad:</h5>
                    <select 
                    name="selectAdmin"
                    className="form-control">
                        <option value="">Seleccione Administrador</option>
                        {
                            admins.map((administrador)=>{
                                return(
                                    <option value={administrador.id}>{administrador.nameAdmin}</option>   
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            </ModalBody>
            <ModalFooter>
                <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal"
                    onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
            </ModalFooter>  
        </form>
        </Modal> 
        </>
    )
}

export default ModalEditarUG