import  Modal from './../../components/modal/Modal'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import './AgregarDetalleSolicitud.css'

function ModalAgregarAdquisicion(){

    const modalref = useRef();

    const openModal = () => {
        modalref.current.openModal()
    };

    const closeModal = () => {
        modalref.current.closeModal()
    }

    const {register, formState: { errors }, handleSubmit, reset} = useForm();
    const [ detalle, setDetalle] = useState({cantida:null, unidad:"", descripcion:""})

    const handleInputChange = (event) => {
        setDetalle({
            ...detalle,
            [event.target.name] : event.target.value
        });
    };

    const enviarDetalle = ( data ) => {
        console.log("enviar");
        reset();
    };

    return(
        <div>
            <button className="btn btn-success" onClick={ openModal }>Agregar</button>
            <Modal ref={modalref}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Agregar Compra/Alquiler</h5>
                            <button type="button" className="close" onClick={ closeModal}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(enviarDetalle)}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Cantidad:</label>
                                        <input
                                        name="cantidad"
                                        {...register("cantidad",{
                                            required:"El campo es requerido",
                                            min:{
                                                value:1,
                                                message:"Este debe tener valores numéricos entre 1 y 9999"
                                            },
                                            max:{
                                                value:9999,
                                                message:"Este debe tener valores numéricos entre 1 y 9999"
                                            }
                                        })}
                                        type="number" 
                                        className="form-control" 
                                        onChange={ handleInputChange }
                                        ></input>
                                        {errors.cantidad && <span className="text-danger text-small d-block mb-2">{errors.cantidad.message}</span>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Unidad:</label>
                                        <input 
                                        name="unidad"
                                        {...register("unidad",{
                                            required:"El campo es requerido",
                                            maxLength:{
                                                value:20,
                                                message:"Este campo debe tener como maximo 20 caracteres"
                                            },
                                            pattern:{
                                                value: /^[Ññíóáéú a-zA-Z ]+$/,
                                                message:"El campo solo permite caracteres alfabeticos"
                                            }
                                        })}
                                        type="integer" 
                                        className="form-control" 
                                        onChange={ handleInputChange }
                                        ></input>
                                        {errors.unidad && <span className="text-danger text-small d-block mb-2">{errors.unidad.message}</span>}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label>Descripcion:</label>
                                        <textarea 
                                        name="descripcion"
                                        {...register("descripcion",{
                                            required:"El campo es requerido",
                                            minLength:{
                                                value:20,
                                                message:"Este campo debe tener entre 20 y 120 caracteres"
                                            },
                                            maxLength:{
                                                value:120,
                                                message:"Este campo debe tener entre 20 y 120 caracteres"
                                            }
                                        })}
                                        className="form-control" 
                                        onChange={ handleInputChange }
                                        ></textarea>
                                        {errors.descripcion && <span className="text-danger text-small d-block mb-2">{errors.descripcion.message}</span>}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col" id="toolbar">
                                        <button type="button" className="btn btn-secondary" onClick={closeModal} id="btnV">Cancelar</button>
                                        <button type="submit" className="btn btn-primary" id="btnV">Guardar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
            </Modal>
        </div>

        
        // <div class="modal fade" id="modalAgregarAdquisicion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        //     <div class="modal-dialog">
        //         <div class="modal-content">
        //         <div class="modal-header">
        //             <h5 class="modal-title" id="exampleModalLabel">Agregar Compra/Alquiler</h5>
        //             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //             <span aria-hidden="true">&times;</span>
        //             </button>
        //         </div>
        //         <div class="modal-body">
        //             <form>
        //                 <div className="form-row">
        //                     <div className="form-group col-md-6">
        //                         <label>Cantidad:</label>
        //                         <input type="integer" className="form-control"></input>
        //                     </div>
        //                     <div className="form-group col-md-6">
        //                         <label>Cantidad:</label>
        //                         <input type="integer" className="form-control"></input>
        //                     </div>
        //                 </div>
        //                 <div className="form-row">
        //                     <div className="form-group col">
        //                         <label>Descripcion:</label>
        //                         <textarea className="form-control"></textarea>
        //                     </div>
        //                 </div>
        //             </form>
        //         </div>
        //         <div class="modal-footer">
        //             <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        //             <button type="button" class="btn btn-primary">Guardar</button>
        //         </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default ModalAgregarAdquisicion;