import { FileEarmarkArrowUpFill } from 'bootstrap-icons-react'
import React, { useState } from  'react'
import { useForm } from 'react-hook-form'
import './AgregarDetalleSolicitud.css'
import ModalAgregarAdquisicion from './ModalAgregarAdquisicion'
import { createQuotitation } from '../../services/Http/QuotitationService' 

function AgregarDetalleSolictud(){

    const {register, formState: { errors }, handleSubmit, reset} = useForm();

    const [ adquisicion, setAdquisicion] = useState({aplicantName:"", requestDate:"", amount:null})

    const [ newDetails, setNewDetails] = useState([])

    const handleInputChange = (event) => {
        setAdquisicion({
            ...adquisicion,
            [event.target.name] : event.target.value
        });
    };

    const updateDetails = (data) => {
        setNewDetails([...newDetails,data])
    }

    const sendData = ( data ) => {
        const obj = {aplicantName:adquisicion.aplicantName, requestDate:adquisicion.requestDate, details:newDetails ,amount:adquisicion.amount};
        console.log(obj);
        async function SendQuotittations(){
            console.log("envio",adquisicion.details);
            const result = await createQuotitation(adquisicion);
        };
        reset();
    };

    const Details = newDetails.map((detail,index)=>{
        return(
            <tr key={index}>
                <th scope="row">
                    {index}         
                </th>
                <td>
                    {detail.amount}         
                </td>
                <td>
                    {detail.unitMesure}         
                </td>
                <td >
                    {detail.description}         
                </td>
            </tr>
        );
    })

    return(
        <>
            <div className="container" align="left">
                <br></br>
                <h1>Nueva Solicitud</h1>
                <br></br>
                <div className="col" id="registro">
                    <div className="form-register" id="formRegistro">
                        <form onSubmit={handleSubmit(sendData)}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombre del Solicitante:</label>
                                    <div className="form-row" id="inputs">
                                        <input 
                                            name ="aplicantName" 
                                            {...register("aplicantName",{
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
                                        {errors.aplicantName && <span className="text-danger text-small d-block mb-2">{errors.aplicantName.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Fecha de Solicitud:</label>
                                    <div className="form-row" id="inputs">
                                        <input
                                        name="requestDate" 
                                        {...register("requestDate",{
                                            required:"El campo monto es requerido",
                                            pattern:{
                                                value:/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})+$/,
                                                message:"dato invalido"
                                            }
                                        })}
                                        type="text" 
                                        className="form-control"
                                        onChange={ handleInputChange }
                                        ></input>
                                        {errors.requestDate && <span className="text-danger text-small d-block mb-2">{errors.requestDate.message}</span>}
                                    </div>
                                </div>
                                <div className="form-group col-md-6" id="button">                                   
                                    <ModalAgregarAdquisicion
                                    updateDetails={updateDetails}/>                                 
                                </div>
                            </div>
                            <div className="form-row" id="list">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Unidad</th>
                                        <th scope="col">Descripcion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Details}
                                    </tbody>
                                </table>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Monto Estimado:</label>
                                    <div className="form-row" id="inputs">
                                        <input
                                        name="amount"
                                        {...register("amount",{
                                            required:"El campo monto es requerido",
                                            min:{
                                                value:1,
                                                message:"el monto debe ser mayor a 0"
                                            }
                                        })}
                                        type="number" 
                                        className="form-control"
                                        onChange={ handleInputChange }
                                        ></input>
                                        {errors.amount && <span className="text-danger text-small d-block mb-2">{errors.amount.message}</span>}
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