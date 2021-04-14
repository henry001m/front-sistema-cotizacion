import { FileEarmarkArrowUpFill, PlusCircle } from 'bootstrap-icons-react'
import React, { useState } from  'react'
import { useForm } from 'react-hook-form'
import './AgregarDetalleSolicitud.css'
import ModalAgregarAdquisicion from './ModalAgregarAdquisicion'

function AgregarDetalleSolictud(){

    const {register, formState: { errors }, handleSubmit, reset} = useForm();

    const [ adquiscion, setAdquisicion] = useState({nombreUsuario:"", fecha:"", detalle:[], monto:null})

    const handleInputChange = (event) => {
        setAdquisicion({
            ...adquiscion,
            [event.target.name] : event.target.value
        });
        console.log(event.target.name);
        console.log(event.target.value);
        console.log(errors)
    };

    const enviarDatos = ( data ) => {
        console.log("enviar")
        console.log(errors)
        reset();
    };

    return(
        <>
            <div className="container" align="left">
                <br></br>
                <h1>Nueva Solicitud</h1>
                <br></br>
                <div className="col" id="registro">
                    <div className="form-register" id="formRegistro">
                        <form onSubmit={handleSubmit(enviarDatos)}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombre del Solicitante:</label>
                                    <div className="form-row" id="inputs">
                                        <input 
                                            name ="nombreUsuario" 
                                            {...register("nombreUsuario",{
                                                required:"El campo es requerido",
                                                minLength:{
                                                    value:3,
                                                    message:"Este campo debe tener entre 3 y 50 caracteres"
                                                },
                                                maxLength:{
                                                    value:50,
                                                    message:"Este campo debe tener entre 3 y 50 caracteres"
                                                },
                                                pattern:{
                                                    value: /^[Ññíóáéú a-zA-Z ]+$/,
                                                    message:"El campo solo permite caracteres alfabeticos"
                                                }
                                            })}
                                            type="text" 
                                            className="form-control" 
                                            onChange={ handleInputChange }
                                        ></input>
                                        {errors.nombreUsuario && <span className="text-danger text-small d-block mb-2">{errors.nombreUsuario.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Fecha de Solicitud:</label>
                                    <div className="form-row" id="inputs">
                                        <input
                                        name="fecha" 
                                        {...register("fecha",{
                                            required:"El campo monto es requerido",
                                            pattern:{
                                                value:/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})+$/,
                                                message:"dato invalido"
                                            }
                                        })}
                                        type="text" 
                                        className="form-control"
                                        ></input>
                                        {errors.fecha && <span className="text-danger text-small d-block mb-2">{errors.fecha.message}</span>}
                                    </div>
                                </div>
                                <div className="form-group col-md-6" id="button">                                   
                                    <ModalAgregarAdquisicion/>                                 
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
                                        <input
                                        name="monto"
                                        {...register("monto",{
                                            required:"El campo monto es requerido",
                                            min:{
                                                value:1,
                                                message:"el monto debe ser mayor a 0"
                                            }
                                        })}
                                        type="number" 
                                        className="form-control"
                                        ></input>
                                        {errors.monto && <span className="text-danger text-small d-block mb-2">{errors.monto.message}</span>}
                                    </div>
                                </div>
                                <div className="form-group col-md-6" id="button">
                                    
                                        <button type="button" className="btn btn-secondary my-2 my-sm-0"
                                        >< FileEarmarkArrowUpFill className="mb-1"/> Adjuntar Archivo </button>
                                   
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="form-group col" id="toolbar">
                                    <button type="button" className="btn btn-secondary" id="btnV"> Cancelar </button>
                                    <button type="submit" className="btn btn-info" id="btnV"> Enviar </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AgregarDetalleSolictud;