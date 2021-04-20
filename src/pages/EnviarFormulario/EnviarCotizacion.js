import React,{useState} from "react"
import './EnviarCotizacion.css'
import { useForm } from 'react-hook-form';
import {sendEmail} from '../../services/http/QuotitationService' ;

function EnviarCotizacion(){
    const {register, formState: { errors }, handleSubmit, reset} = useForm();
    const [emailMessage, setEmailMessage]  = useState({email:"", description:""});
    const [espera, setEspera] = useState("")

    const handleInputChange = (event) => {
        console.log("cambio",event.target.value[0])
        if(event.target.value[0]==" "){
            console.log("primer",event.target.value[0])
            setEmailMessage({
                ...emailMessage,
                [event.target.name] : event.target.value.substring(1)
            });
        }else{
            setEmailMessage({
                ...emailMessage,
                [event.target.name] : event.target.value
            });
        }
    };
    const saveEmail = async ( ) => {
        setEspera("Enviando....");
        document.getElementById('btnIE').disabled=true;
        const result = await sendEmail(emailMessage);
        alert(result.data.result);
        setEmailMessage({email:"",description:""});
        setEspera("");
        document.getElementById('btnIE').disabled=false;
        reset();
    };

    const validateAroba = (e) => {
        const reg = /^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        if(/@/.test(e)){
            if (reg.exec(e)!=null) {
                return true
            }else{
                return "Este campo solo acepta caracteres alfanuméricos y especiales como el @ (arroba) .(punto) - (guión) y _ (guión bajo)"
            }
        }else{
            return "Este campo debe tener el carácter @"
        }
    };
    return(
        <>
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
                                        validate:{
                                            value:(value)=>validateAroba(value)
                                        },
                                        minLength:{
                                            value:11,
                                            message:"Este campo debe tener mínimo 11 caracteres"
                                        }
                                    })}
                                    value={emailMessage.email}
                                    type="text" 
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
                                    rows="7" 
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
                                    })}
                                    value={emailMessage.description}
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
                                <label style={{color:"#28a745"}}>Se adjunto el formulario de cotizacion</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-row  justify-content-end" align="right">
                            <div style={{color:"red"}}>
                                {espera}
                            </div>
                            <button type="submit" className="btn btn-info my-2 my-sm-0" id="btnIE"> Enviar </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default EnviarCotizacion;