import React,{useState,useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { useForm } from "react-hook-form";
import { getAdmins } from '../../services/http/UserService';
import { updateBossUA } from '../../services/http/UniAdministrativaService';
function ModalEditarUA (props){
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
        props.updateAdministrativas()
        setIdAdmin("")
        updateAdmins()
        reset()
    }
    const updateAdmins = ()=>{
        setFlag(!flag);
    }
    const handleSelectChange = (event) => {
        setIdAdmin(event.target.value)
    };
    // window.onload = function() {
    //     var select = document.getElementById("admi");
    //     var conAdmin = document.getElementById("conAdmin");
    //     var sinAdmin = document.getElementById("sinAdmin");
    //     if(props.administrativeUnit.admin.id == ""){
    //         select.value = sinAdmin.innerHTML;
    //     }else{
    //         select.value = conAdmin.innerHTML;
    //     }
        
    // };
    const onSubmit = async (data) => {
        try{
            if(idAdmin != ""){  
                console.log("IdAdminNuevo:",data.admin_id,"IdUnidad:",props.administrativeUnit.id);
                const res = await updateBossUA(data.admin_id,props.administrativeUnit.id);
                alert("Se realizo el cambio exitosamente")
                closeModal()
            }else{
                alert("No selecciono un administrador diferente")
                console.log("es el mismo id:",idAdmin)
            }
        }catch(error){
            console.log( error )
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAdmins();
                setAdmins(response.users);
                console.log("ENTRA A EDITAR")
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
                    name="admin_id"
                    {...register("admin_id")}
                    className="form-control"
                    onClick={handleSelectChange}>
                        <option id="admi" value="">{props.administrativeUnit.admin[0].name} {props.administrativeUnit.admin[0].lastName}</option>
                        {
                            admins.map((administrador)=>{
                                return(
                                    <option value={administrador.id}>{administrador.name} {administrador.lastName}</option>   
                                )
                            })
                        }
                    </select>
                    {/* <option id="sinAdmin" style={{visibility:"hidden"}}>Seleccione Administrador</option>
                    <option id="conAdmin" style={{visibility:"hidden"}}>{props.administrativeUnit.admin.name} {props.administrativeUnit.admin.lastName}</option> */}
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