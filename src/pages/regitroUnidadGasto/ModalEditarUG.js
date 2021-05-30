import React,{useState,useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { updateBossUG } from '../../services/http/UniGastoService';
import { useForm } from "react-hook-form";
import { getAdminsUG } from '../../services/http/UserService';

function ModalEditarUG (props){
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [ admins, setAdmins] = useState([]);
    const [ flag, setFlag] = useState(false);
    const [ idAdmin, setIdAdmin ] = useState("");
    // const [ admins, setAdmins] = useState([
    //     {id:1 , name:"Rodrigo Cespedes"},
    //     {id:2 , name:"Yurguen Pariente"},
    //     {id:3 , name:"Ramiro Saavedra"},
    // ]);
    const modalStyles={
        top:"10%",
        transfrom: 'translate(-50%, -50%)'
    }

    const closeModal = () => {
        props.cerrarEditor()
        updateAdmins()
        reset()
    }
    const updateAdmins = ()=>{
        setFlag(!flag);
    }
    
    const onSubmit = async (data) => {
        try{
            console.log("IdAdminNuevo:",data.admin_id,"IdUnidad:",props.gasto.id);
            const res = await updateBossUG(data.admin_id,props.gasto.id);
            alert(res.message);
            props.updateGastos();
            props.cerrarEditor();
            closeModal()
        }catch(error){
            console.log( error )
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAdminsUG();
                setAdmins(response.users);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [setAdmins,flag]);
    
    return (
        <>
        <Modal isOpen={props.abrirEditor} style={modalStyles}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader toggle={closeModal}>
            Editar Unidad de Gasto
            </ModalHeader>  
            <ModalBody>
            <div className="form-rom">
                <div className="form-group col-md-12">
                    <h6>Nombre de Unidad de Gasto:</h6>
                        <input
                            name="nameUnidadGasto"
                            className="form-control"
                            type="text"
                            value={props.gasto.nameUnidadGasto}
                            disabled
                        ></input>
                </div>
                <div className="form-group col-md-12">
                    <h6>Facultad:</h6>
                <select 
                    name="faculties_id"
                    className="form-control"
                    disabled>
                        <option value="">{props.gasto.faculty.nameFacultad}</option>
                    </select>
                </div>
                <div className="form-group col-md-12">
                    <h6>Administrador de Unidad:</h6>
                    <select 
                    name="admin_id"
                    {...register("admin_id")}
                    className="form-control">
                        <option value="">Seleccione Administrador</option>
                        {
                            admins.map((administrador)=>{
                                return(
                                    <option value={administrador.id}>{administrador.name} {administrador.lastName}</option>   
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