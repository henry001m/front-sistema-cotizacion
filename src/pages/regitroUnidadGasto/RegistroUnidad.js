import React,{useState,useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { getFacultyInUse } from '../../services/http/FacultyService';
import { getAdminsUG } from '../../services/http/UserService';
import { createUnidadGasto} from '../../services/http/UniGastoService';
import { useForm } from "react-hook-form";
import './RegistroUnidad.css';

const RegistroUnidad = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [ faculties, setFaculties] = useState([]);
    const [ admins, setAdmins] = useState([]);
    const [ idAdmin, setIdAdmin ] = useState("");
    const [ flag, setFlag] = useState(false);
    // const [ admins, setAdmins] = useState([
    //     {id:1 , name:"Rodrigo Cespedes"},
    //     {id:2 , name:"Yurguen Pariente"},
    //     {id:3 , name:"Ramiro Saavedra"},
    // ]);
    const [ nameUnidadGasto, setNameUnidadGasto ] = useState("");
    const [ selectDefaul, setSelectDefault ]= useState({value:"", label:"Seleccione facultad"})
    const modalStyles={
        top:"10%",
        transfrom: 'translate(-50%, -50%)'
    }

    const closeModal = () => {
        props.cerrarModal()
        props.updateGastos();
        setNameUnidadGasto("")
        setIdAdmin("")
        updateAdmins()
        reset()
    }
    const updateAdmins = ()=>{
        setFlag(!flag);
    }
    const onSubmit = async (data) => {
        try{ 
            console.log("Unidad:",data.nameUnidadGasto,"Facultad:",data.faculties_id,"IdAdmin:",data.idUser);
            if(data.idUser == ""){
                const res = await createUnidadGasto(data);
                alert(res.message);
            }else{
                const res = await createUnidadGasto(data);
                alert(res.message);
            }
            closeModal();
        }catch(error){
            console.log( error )
        }
    };
    const handleInputChange = (event) => {
        if(event.target.value[0]==" "){
            setNameUnidadGasto(
                event.target.value.substring(1)
            );
        }else{
            setNameUnidadGasto(
                event.target.value
            );
        } 
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFacultyInUse();
                setFaculties(response.facultades);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
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
        <Modal isOpen={props.abierto} style={modalStyles}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader toggle={closeModal}>
            Agregar Unidad de Gasto
            </ModalHeader>  
            <div className="modal-body">
            <div className="form-rom">
                <div className="form-group col-md-12">
                    <h6>Nombre de Unidad de Gasto:</h6>
                        <input
                            name="nameUnidadGasto"
                            {...register("nameUnidadGasto",{
                                required:"Campo requerido",
                                minLength:{
                                    value:3,
                                    message:"Este campo debe tener entre 3 y 50 caracteres"
                                },
                                maxLength:{
                                    value:50,
                                    message:"Este campo debe tener entre 3 y 50 caracteres"
                                },
                                pattern:{
                                    value: /^[Ññíóáéú. a-zA-Z ]+$/,
                                    message:"El campo solo permite caracteres alfabeticos"
                                }
                            })}
                            className="form-control"
                            type="text"
                            value={nameUnidadGasto}
                            onChange={ handleInputChange }
                        ></input>
                        {errors.nameUnidadGasto && <span className="text-danger text-small d-block mb-2">{errors.nameUnidadGasto.message}</span>}
                </div>
                <div className="form-group col-md-12">
                    <h6>Facultad:</h6>
                <select 
                    name="faculties_id"
                    {...register("faculties_id",{
                        required:"Seleccione facultad"
                    })}
                    className="form-control">
                        <option value={selectDefaul.value}>{selectDefaul.label}</option>
                        {
                            faculties.map((faculty)=>{
                                return(
                                    <option value={faculty.id}>{faculty.nameFacultad}</option>   
                                )
                            })
                        }
                </select>
                    {errors.faculties_id && <span className="text-danger text-small d-block mb-2">{errors.faculties_id.message}</span>}
                </div>
                <div className="form-group col-md-12">
                    <h6>Administrador de Unidad:<label style={{color:'silver'}}>(opcional)</label></h6>
                    <select 
                    name="idUser"
                    {...register("idUser")}
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
            </div>
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

export default RegistroUnidad