import React,{useState,useEffect} from 'react';
import './RegistroUnidad.css';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {getFacultyInUse} from '../../services/http/FacultyService';
import {createUnidadGasto} from '../../services/http/UniGastoService';
import { useForm } from "react-hook-form";

const RegistroUnidad = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [ faculties, setFaculties] = useState([]);
    const [ nameUnidadGasto, setNameUnidadGasto ] = useState("");
    const [ selectDefaul, setSelectDefault ]= useState({value:"", label:"Seleccione facultad"})

    const modalStyles={
        top:"20%",
        transfrom: 'translate(-50%, -50%)'
    }

    const closeModal = () => {
        props.cerrarEditor()
        setNameUnidadGasto("")
        reset()
    }

    const onSubmit = async (data) => {
        const res = await createUnidadGasto(data);
        alert(res.message);
        setNameUnidadGasto("");
        props.updateGastos();
        props.cerrarModal();
        reset()
    };

    // const handleInputChange = (event) => {
    //     if(event.target.value[0]==" "){
    //         setNameUnidadGasto(
    //             event.target.value.substring(1)
    //         );
    //     }else{
    //         setNameUnidadGasto(
    //             event.target.value
    //         );
    //     } 
    // };
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
    return (
        <>
        <Modal isOpen={props.abierto} style={modalStyles}>
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
                            value={props.unidadGasto.name}
                        ></input>
                </div>
                <div className="form-group col-md-10">
                    <h5>Facultad:</h5>
                <select 
                    name="faculties_id"
                    className="form-control">
                        <option value={selectDefaul.value}>{selectDefaul.label}</option>
                    </select>
                </div>
                <div className="form-group col-md-10">
                    <h5>Administrador de Unidad:</h5>
                    <select 
                    name="selectAdmin"
                    className="form-control">
                        <option value="">Seleccione Administrador</option>
                        {
                            faculties.map((facultad)=>{
                                console.log(facultad)
                                return(
                                    <option value={facultad.id}>{facultad.nameFacultad}</option>   
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

export default RegistroUnidad