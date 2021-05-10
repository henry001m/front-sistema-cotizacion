import { FileEarmarkArrowUpFill } from 'bootstrap-icons-react'
import React, { useState } from  'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import './AgregarDetalleSolicitud.css'
import ModalAgregarAdquisicion from './ModalAgregarAdquisicion'
import { createQuotitation } from '../../services/http/QuotitationService';
import axios from 'axios';
import NavUnidadGasto from '../../components/navUnidadGasto/NavUnidadGasto'

function AgregarDetalleSolictud(){

    const {register, formState: { errors }, handleSubmit, reset} = useForm();
    const [ adquisicion, setAdquisicion] = useState({nameUnidadGasto:"",aplicantName:"", requestDate:"", amount:null})
    const [ newDetails, setNewDetails] = useState([])
    const [fecha , setFecha ] = useState(new Date())
    
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
        if(fls != null){
            for(var i=0 ; i<fls.length ; i++){
            let name = 'file'+i;
            formData.append(name,fls[i],fls[i].name);
            }
            const res = await axios.post('http://127.0.0.1:8000/api/upload/'+id,formData);
            console.log("respuesta ",res);
        }
    }

    const sendData = async ( ) => {
        if(newDetails.length>0){
            const auxFecha = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()
            const obj = {nameUnidadGasto: adquisicion.nameUnidadGasto,aplicantName:adquisicion.aplicantName, requestDate:auxFecha, details:newDetails ,amount:adquisicion.amount};
            const result = await createQuotitation(obj);
            await onSubmit(result.success);
            reset();
            closePage();
        }
    };

    let history = useHistory();

    function closePage(){
        history.replace("/SolicitudesDeAdquisicion");
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
                <h1>Nueva solicitud</h1>
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
                                                    value: /^[Ññíóáéú. a-zA-Z ]+$/,
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
                                    <label>Nombre del solicitante:</label>
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
                                                    value: /^[Ññíóáéú. a-zA-Z ]+$/,
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
                                    <label>Fecha de solicitud:</label>
                                    <div className="form-row" id="inputs">
                                        <label className="col-form-label">{fecha.getDate()+"-"+(fecha.getMonth()+1)+"-"+fecha.getFullYear()}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Detalle de solicitud</label>
                                </div>
                                <div className="form-group col" align="end">                                   
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
                                    <label>Monto estimado:</label>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
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
                                <div className="form-group col-md-6" align="end">
                                    <input 
                                    name="files"
                                    type="file" 
                                    id="files" 
                                    multiple 
                                    onChange = {fileSelectHandler}
                                    ></input>
                                    <label for="files"><FileEarmarkArrowUpFill className="mb-1"/> Adjuntar archivo</label>
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