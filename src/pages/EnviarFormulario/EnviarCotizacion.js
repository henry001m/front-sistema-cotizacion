import React,{useState, useRef } from "react"
import  Modal from '../../components/modal/Modal'
import './EnviarCotizacion.css'
import { useForm } from 'react-hook-form'
import {sendEmail} from '../../services/http/QuotitationService' 
import { Envelope, PlusCircle} from 'bootstrap-icons-react'


const Input = ({name,tabIndex,value,onChange}) => {
    const {register, formState: { errors }, handleSubmit, reset} = useForm();

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
        <form>
            <div className="form-row">
                <input
                    name={name} 
                    {...register(name,{
                        required:"Campo requerido",
                        minLength:{
                            value:11,
                            message:"Este campo debe tener mínimo 11 caracteres"
                        }
                    })}
                    tabIndex={tabIndex}
                    value={value}
                    type="text" 
                    className="form-control"
                    onChange={(event)=>onChange(event)}
                ></input>
                {errors.name && <span className="text-danger text-small d-block mb-2">{errors.name.message}</span>}
            </div>
        </form>
    );
};

function EnviarCotizacion( props ){

    const {register, formState: { errors }, handleSubmit, reset} = useForm();
    const [emailMessage, setEmailMessage]  = useState({email:"", description:""});
    const [espera, setEspera] = useState("")
    const [emails, setEmails] = useState([{name:"email1", correo:""}])

    const modalref = useRef();

    const openModal = () => {
        modalref.current.openModal()
    };

    const closeModal = () => {
        reset();
        modalref.current.closeModal()
    };

    const addEmail = () => {
        setEmails([...emails,{name:"email"+(emails.length+1),correo:""}])
    };

    const onChangeEmail = (event) => {
        console.log(event.target.tabIndex)
        const newData = emails.map((d, index) => {
            if (index === event.target.tabIndex) {
              d[event.target.name] = event.target.value;
            }
            return d;
          });
          setEmails([...newData])
        console.log(newData)
    };

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
        closeModal();
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

    const EnableSendMailButton = () =>{
        if(props.status=="aceptado"){
            return(
                <button className="dropdown-item" onClick={ openModal }>
                    <Envelope/> Enviar correo
                </button>                                    
            );
        }else{
            return(
                <button className="dropdown-item" disabled>
                    <Envelope/> Enviar correo
                </button>
            );
        }
    }

    return(
        <>
        {
            EnableSendMailButton()
        }
            <Modal ref={ modalref }>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Envio por correo</h5>
                            <button type="button" className="close" onClick={ closeModal}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container" align="left">
                                <div className="form-register">
                                    <form onSubmit={handleSubmit(saveEmail)}>
                                        <div className="form-row">
                                            <div className="col-md-10">
                                                <label>Correo de la Empresa:</label>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-10">
                                                {emails.map((email,index) => {
                                                    return(
                                                        <Input
                                                            name="correo"
                                                            tabIndex={index}
                                                            value={email.correo}
                                                            onChange={onChangeEmail}
                                                        />
                                                    )
                                                })}
                                                {/* <div className="form-row">
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
                                                </div> */}
                                            </div>
                                            <div className="form-group col-md-2">
                                                <button type="button" className="btn btn-success" onClick={ addEmail }>
                                                    <PlusCircle className="mb-1"/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-10">
                                                <label>Descripción:</label>
                                                <div className="form-row">
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
                                            <div className="form-group col-md-10">
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
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default EnviarCotizacion;