import React from  'react'
import { useForm } from 'react-hook-form'
import './AgregarDetalleSolicitud.css'
import ModalAgregarAdquisicion from './ModalAgregarAdquisicion'

function AgregarDetalleSolictud(){

    const { register, handleSubmit, formState:{ errors } } = useForm();

    const validarCampos = (data, e) => {
        console.log(data);
    }

    return(
        <>
            <div className="container" align="left">
                <br></br>
                <h1>Nueva Solicitud</h1>
                <br></br>
                <div className="col" id="registro">
                    <div className="form-register" id="formRegistro">
                        <form onSubmit={handleSubmit(validarCampos)}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombre del Solicitante:</label>
                                    <div className="form-row" id="inputs">
                                        <input type="text"
                                        {
                                            ...register('nombre',{ required:true, minLength: 3, maxLength:50})
                                        }
                                        className="form-control"></input>
                                        {errors.nombre && errors.nombre.type === "required" && 
                                            <span className="text-danger text-small d-block mb-2">Ingrese un nombre</span>
                                        }
                                        {errors.nombre && errors.nombre.type === "minLength" && (
                                            <span className="text-danger text-small d-block mb-2">El minimo de caracteres es 3</span>
                                        )}
                                        {errors.nombre && errors.nombre.type === "maxLength" && (
                                            <span className="text-danger text-small d-block mb-2">El maximo de caracteres es 50</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Fecha de Solicitud:</label>
                                    <div className="form-row" id="inputs">
                                        <input type="text" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="form-group col-md-6" id="button">
                                    
                                        <button type="button" className="btn btn-success"
                                        data-toggle="modal"
                                        data-target="#modalAgregarAdquisicion">Agregar
                                        </button>
                                    
                                </div>
                            </div>
                            <div className="form-row" id="list">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                        <th className="col-1">#</th>
                                        <th className="col-2">Cantidad</th>
                                        <th className="col-4">Unidad</th>
                                        <th className="col-5">Descripcion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td className="col-1">1</td>
                                        <td className="col-2">Mark</td>
                                        <td className="col-4">Otto</td>
                                        <td className="col-5">@mdo</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">2</td>
                                        <td className="col-2">Jacob</td>
                                        <td className="col-4">Thornton</td>
                                        <td className="col-5">@fat</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">3</td>
                                        <td className="col-2">Larry</td>
                                        <td className="col-4">the Bird</td>
                                        <td className="col-5">@twitter</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">1</td>
                                        <td className="col-2">Mark</td>
                                        <td className="col-4">Otto</td>
                                        <td className="col-5">@mdo</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">2</td>
                                        <td className="col-2">Jacob</td>
                                        <td className="col-4">Thornton</td>
                                        <td className="col-5">@fat</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">3</td>
                                        <td className="col-2">Larry</td>
                                        <td className="col-4">the Bird</td>
                                        <td className="col-5">@twitter</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">1</td>
                                        <td className="col-2">Mark</td>
                                        <td className="col-4">Otto</td>
                                        <td className="col-5">@mdo</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">2</td>
                                        <td className="col-2">Jacob</td>
                                        <td className="col-4">Thornton</td>
                                        <td className="col-5">@fat</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">3</td>
                                        <td className="col-2">Larry</td>
                                        <td className="col-4">the Bird</td>
                                        <td className="col-5">@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Monto Estimado:</label>
                                    <div className="form-row" id="inputs">
                                        <input type="text" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="form-group col-md-6" id="button">
                                    
                                        <button type="button" className="btn btn-secondary my-2 my-sm-0"> Adjuntar Archivo </button>
                                   
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="form-group col" id="btnCE">
                                    <button type="button" className="btn btn-secondary my-2 my-sm-0"> Cancelar </button>
                                    <button type="submit" className="btn btn-info my-2 my-sm-0"> Enviar </button>
                                </div>
                            </div>
                        </form>
                        <ModalAgregarAdquisicion/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AgregarDetalleSolictud;