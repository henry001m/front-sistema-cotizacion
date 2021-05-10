
import React,{useState,useEffect} from 'react';
import './RegistroUnidad.css';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {getFaculties} from '../../services/http/FacultyService';
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
        props.cerrarModal()
        setNameUnidadGasto("")
        reset()
    }

    const onSubmit = async (data) => {
        const res = await createUnidadGasto(data);
        console.log(res);
        setNameUnidadGasto("");
        props.updateGastos();
        props.cerrarModal();
        reset()
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
                const response = await getFaculties();
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
            Agregar Unidad de Gasto
            </ModalHeader>  
            <ModalBody>
            <div className="form-rom">
                <div className="form-group col-md-10">
                    <h5>Nombre de Unidad de Gasto:</h5>
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
                <div className="form-group col-md-10">
                    <h5>Facultad:</h5>
                <select 
                    name="faculties"
                    {...register("faculties",{
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
                    {errors.faculties && <span className="text-danger text-small d-block mb-2">{errors.faculties}</span>}
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