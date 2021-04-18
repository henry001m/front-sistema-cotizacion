import React,{useState} from "react"
import './EnviarCotizacion.css'
import { FileEarmarkArrowUpFill, PrinterFill } from 'bootstrap-icons-react';
import { useForm } from 'react-hook-form';
import {sendEmail} from '../../services/http/QuotitationService' ;

function EnviarCotizacion(){
    const [respuestaAPI, setRespuestaAPI] = useState({ respuesta: 'KO' });
    const {register, formState: { errors }, handleSubmit, reset} = useForm();
    const [emailMessage, setEmailMessage]  = useState({email:"", description:""});
    const handleInputChange = (event) => {
        setEmailMessage({
            ...emailMessage,
            [event.target.name] : event.target.value
        });
    };
    const saveEmail = async ( ) => {
        console.log(emailMessage);
        const result = await sendEmail(emailMessage);
        reset();
    };
    return(
        <>
       {/*  http://127.0.0.1:8000/api/sendEmail */}
        <div className="container" align="left">
            <div className="form-register">
                <form onSubmit={handleSubmit(saveEmail)}>
                    <div>
                        <br></br>
                        <h1 align="left">Envio por correo</h1>
                        <br></br>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Correo de la Empresa:</label>
                            <div className="form-row" id="inputsEC">
                                <input
                                    name="email" 
                                    {...register("email",{
                                        required:"Campo requerido",
                                        minLength:{
                                            value:11,
                                            message:"Este campo debe tener mínimo 11 caracteres"
                                        },
                                        pattern:{
                                            value:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                                            message:"Este campo solo acepta caracteres alfanuméricos y especiales como el @ (arroba) .(punto) - (guión) y _ (guión bajo)"
                                        }
                                    })}
                                    type="email" 
                                    className="form-control"
                                    onChange={ handleInputChange }
                                ></input>
                            {errors.email && <span className="text-danger text-small d-block mb-2">{errors.email.message}</span>}

                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Descripción:</label>
                            <div className="form-row" id="inputsEC">
                                <textarea 
                                    name="description"
                                    {...register("description",{
                                        required:"Campo requerido",
                                        minLength:{
                                            value:10,
                                            message:"Este campo debe tener entre 10 y 300 caracteres"
                                        },
                                        maxLength:{
                                            value:300,
                                            message:"Este campo debe tener entre 10 y 300 caracteres"
                                        },
                                        validate:{
                                            //validar que no se ingrese espacios al inicio
                                        }
                                    })}
                                    type="text" 
                                    className="form-control" 
                                    onChange={ handleInputChange }
                                ></textarea>
                                {errors.description && <span className="text-danger text-small d-block mb-2">{errors.description.message}</span>}

                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <div className="form-row">
                                <label>Formulario de Cotización:</label>
                            </div>
                            <div className="form-row" id="inputsEC">
                                <button type="button" className="btn btn-secondary my-2 my-sm-0"> 
                                <FileEarmarkArrowUpFill className="mb-1"/> Adjuntar Archivo </button>
                            </div>
                        </div>
                    </div>
                    <div className="form-row" align="right">
                        <div className="form-group col">
                            {/* <button type="button" className="btn btn-secondary my-2 my-sm-0">
                                <PrinterFill className="mb-1"/> Imprimir </button> */}
                            <button type="submit" className="btn btn-info my-2 my-sm-0" id="btnIE"> Enviar </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default EnviarCotizacion;