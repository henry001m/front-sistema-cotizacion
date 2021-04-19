import { FileEarmarkArrowUpFill } from 'bootstrap-icons-react'
import React, { useState } from  'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import './AgregarDetalleSolicitud.css'
import ModalAgregarAdquisicion from './ModalAgregarAdquisicion'
import { createQuotitation } from '../../services/http/QuotitationService';
import axios from 'axios';

function AgregarDetalleSolictud(){

    const {register, formState: { errors }, handleSubmit, reset} = useForm();
    const [ adquisicion, setAdquisicion] = useState({nameUnidadGasto:"",aplicantName:"", requestDate:"", amount:null})
    const [ newDetails, setNewDetails] = useState([])

    const handleInputChange = (event) => {
        console.log("cambio",event.target.value[0])
        if(event.target.value[0]==" "){
            console.log("primer",event.target.value[0])
            setAdquisicion({
                ...adquisicion,
                [event.target.name] : event.target.value.substring(1)
            });
        }else{
            setAdquisicion({
                ...adquisicion,
                [event.target.name] : event.target.value
            });
        }
    };

    const handleInputAmount = (event) => {
        console.log("number",event.target.value)
        setAdquisicion({
            ...adquisicion,
            [event.target.name] : event.target.value
        });
    }

    const invalidateSpace = (e) => {
        if(e[0]==" "){
            return "Dato invalido";
        }
        return true;
    };

    const updateDetails = (data) => {
        setNewDetails([...newDetails,data])
    }

    const [fls, setFls] = useState(null);

    const fileSelectHandler =(e)=>{
        setFls(e.target.files);   
    }
    const onSubmit =async (id) =>{
        const formData = new FormData();
        for(var i=0 ; i<fls.length ; i++){
          let name = 'file'+i;
          formData.append(name,fls[i],fls[i].name);
        }
        const res = await axios.post('http://127.0.0.1:8000/api/upload/'+id,formData);
        console.log("respuesta ",res);
    }

    const sendData = async ( ) => {
        const obj = {nameUnidadGasto: adquisicion.nameUnidadGasto,aplicantName:adquisicion.aplicantName, requestDate:adquisicion.requestDate, details:newDetails ,amount:adquisicion.amount};
        const result = await createQuotitation(obj);
        await onSubmit(result.success);
        reset();
        closePage();
        
    };

    let history = useHistory();

    function closePage(){
        history.goBack();
    }

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
                    {detail.unitMeasure}         
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
                                    <label>Unidad de gasto:</label>
                                    <div className="form-row" id="inputs">
                                        <input 
                                            name ="nameUnidadGasto" 
                                            {...register("nameUnidadGasto",{
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
                                                },
                                                validate:{
                                                    value:(value)=>invalidateSpace(value)
                                                }
                                            })}
                                            value={adquisicion.nameUnidadGasto}
                                            type="text" 
                                            className="form-control" 
                                            onChange={ handleInputChange }
                                        ></input>
                                        {errors.nameUnidadGasto && <span className="text-danger text-small d-block mb-2">{errors.nameUnidadGasto.message}</span>}
                                    </div>
                                </div>
                            </div>
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
                                                },
                                                validate:{
                                                    value:(value)=>invalidateSpace(value)
                                                }
                                            })}
                                            value={adquisicion.aplicantName}
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
                                            required:"El campo es requerido",
                                            pattern:{
                                                value:/^\d{4}([-])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
                                                message:"dato invalido"
                                            }
                                        })}
                                        value={adquisicion.requestDate}
                                        type="text" 
                                        className="form-control"
                                        placeholder="ej: 2018-02-09"
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
                                            required:"El campo es requerido",
                                            min:{
                                                value:1,
                                                message:"Dato invalido"
                                            }
                                        })}
                                        value={adquisicion.amount}
                                        type="number" 
                                        className="form-control"
                                        onChange={ handleInputAmount }
                                        ></input>
                                        {errors.amount && <span className="text-danger text-small d-block mb-2">{errors.amount.message}</span>}
                                    </div>
                                </div>
                                <div className="form-group col-md-6" id="button" align="flex-end">
                                    <input 
                                    name="files"
                                    {...register("files",{
                                        required:"Se debe ajuntar un documento",
                                    })}
                                    type="file" 
                                    id="files" 
                                    multiple 
                                    onChange = {fileSelectHandler}
                                    ></input>
                                    <label for="files"><FileEarmarkArrowUpFill className="mb-1"/> Adjuntar archivo</label>
                                    {errors.files && <span className="text-danger text-small d-block mb-2">{errors.files.message}</span>}                                 
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="form-group col" id="toolbar">
                                    <button type="button" className="btn btn-secondary" id="btnV" onClick={closePage}> Cancelar </button>
                                    <button type="submit" className="btn btn-info" id="btnV" > Enviar </button>
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