import React,{useState,useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { useForm } from "react-hook-form";

function ModalEditarUA (props){
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
            props.updateAdministrativas();
        }catch(error){
            console.log( error )
        }
    };

    return (
        <>
        <Modal isOpen={props.abrirEditor} style={modalStyles}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader toggle={closeModal}>
            Editar Unidad Administrativa
            </ModalHeader>  
            <ModalBody>
            <div className="form-rom">
                <div className="form-group col-md-12">
                    <h6>Nombre de Unidad Administrativa:</h6>
                        <input
                            name="nameUnidadGasto"
                            className="form-control"
                            type="text"
                            value={props.administrativeUnit.name}
                            disabled
                        ></input>
                </div>
                <div className="form-group col-md-12">
                    <h6>Facultad:</h6>
                <select 
                    name="faculties_id"
                    className="form-control"
                    disabled>
                        <option value="">{props.administrativeUnit.faculty}</option>
                    </select>
                </div>
                <div className="form-group col-md-12">
                    <h6>Administrador de Unidad:</h6>
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

export default ModalEditarUA