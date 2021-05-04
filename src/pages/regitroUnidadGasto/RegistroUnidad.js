
import React,{useState,useEffect} from 'react';
import './RegistroUnidad.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import {getUnidadesAdministrativas} from '../../services/http/UniAdministrativaService';
import {createUnidadGasto} from '../../services/http/UniGastoService';
import { useForm } from "react-hook-form";

const RegistroUnidad = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [unidadesAdministrativas, setUnidadesAdministrativas] = useState([]);
    const [ nameUnidadGasto, setNameUnidadGasto ] = useState("");
    const modalStyles={
        top:"20%",
        transfrom: 'translate(-50%, -50%)'
    }
    const onSubmit = async (data) => {
        const res = await createUnidadGasto(data);
        console.log(res);
        props.updateGastos();
        props.cerrarModal();

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
            const response = await getUnidadesAdministrativas();
            console.log(response.Administrative_unit)
            setUnidadesAdministrativas(response.Administrative_unit);
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
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Agregar Unidad de Gasto</h5>
                                <button type="button" className="close" onClick={() => {props.cerrarModal()}}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-rom">
                                    <div className="form-group col-md-10">
                                        <label>Nombre de Unidad Gasto:</label>
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
                                        <label>Unidad Administrativa Correspondiente:</label>
                                    <select 
                                        name="administrative_units_id"
                                        {...register("administrative_units_id",{
                                            required:"Seleccione la unidad administrativa"
                                        })}
                                        className="form-control">
                                            <option value="">Seleccione la Unidad Administrativa</option>
                                            {
                                                unidadesAdministrativas.map((administrativa)=>{
                                                    return(
                                                        <option value={administrativa.id}>{administrativa.name}</option>   
                                                    )
                                                })
                                            }
                                        </select>
                                        {errors.administrative_units_id && <span className="text-danger text-small d-block mb-2">{errors.administrative_units_id.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal"
                                    onClick={() => {props.cerrarModal();}}>Cancelar</button>
                                <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                            </div>
                            </div>
                        </div>
                </form>
        </Modal> 
        </>
    )
}

export default RegistroUnidad
