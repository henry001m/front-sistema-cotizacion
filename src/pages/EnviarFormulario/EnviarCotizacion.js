import React,{useState} from "react" 
import './EnviarCotizacion.css'
import { useForm } from 'react-hook-form'
import {sendEmail} from '../../services/http/QuotitationService' 
import { PlusCircle} from 'bootstrap-icons-react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function EnviarCotizacion( props ){

    const {register, formState: { errors }, handleSubmit, reset} = useForm();
    const [emailMessage, setEmailMessage]  = useState({emails:"", description:""});
    const [espera, setEspera] = useState("")
    /**esta es la lista de los emails */
    const [correos, setCorreos ] = useState([""])

    const addEmail = () => {
        if(correos.length<5){
            setCorreos([...correos,""])
            setEmailMessage({...emailMessage,emails:correos});
        }
    };

    const onChangeEmail = (event) => {
        const newData = correos.map((d, index) => {
            if (index === event.target.tabIndex) {
                if(event.target.value[0]==" "){
                    d = event.target.value.substring(1)
                }else{
                    d = event.target.value;
                }
            }
            return d;
          });
          setCorreos([...newData])
    };

    const handleInputChange = (event) => {
        //console.log("cambio",event.target.value[0])
        if(event.target.value[0]==" "){
            //console.log("primer",event.target.value[0])
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

    const closeModal=()=>{
        props.cerrarModal()
        setEmailMessage({emails:"", description:""})
        setCorreos([""])
        reset()
    }

    const saveEmail = async ( ) => {
        try {
            const aux = {emails:correos, description:emailMessage.description}
            setEspera("Enviando....");
            console.log(aux,props.id);
            document.getElementById('btnIE').disabled=true;
            const result = await sendEmail(aux,props.id);
            console.log("este es el resultado ",result);
            alert(result.data.result);
            setEmailMessage({email:"",description:""});
            setEspera("");
            document.getElementById('btnIE').disabled=false;
            reset();
            closeModal();
        } catch (error) {
            console.log(error)
        }
    };

    const validateEmail = (e) => {
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
            <Modal isOpen={props.abiertoEmail}>
            <form onSubmit={handleSubmit(saveEmail)}>
                <ModalHeader toggle={closeModal}>
                    Envio por correo
                </ModalHeader>
                <ModalBody>
                <div className="container" align="left">
                                <div className="form-register">
                                        <div className="form-row">
                                            <div className="col-md-10">
                                                <label>Correo de la Empresa:</label>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-10">
                                                {correos.map((correo,index) => {
                                                    return(
                                                        <>
                                                            <input
                                                                name={`correo[${index}]`}
                                                                {...register(`correo[${index}]`,{
                                                                    required:"Campo requerido",
                                                                    validate:{
                                                                        value:(value)=>validateEmail(value)
                                                                    },
                                                                    minLength:{
                                                                        value:11,
                                                                        message:"Este campo debe tener mínimo 11 caracteres"
                                                                    }
                                                                })}
                                                                value={correo}
                                                                id={index}
                                                                tabIndex={index}
                                                                type="text" 
                                                                className="form-control"
                                                                onChange={ onChangeEmail }
                                                            ></input>
                                                            {errors.email && <span className="text-danger text-small d-block mb-2">{errors.email.message}</span>}
                                                        </>
                                                    )
                                                })}
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
                                                        rows="6" 
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
                                        <div className="form-row  justify-content-end" align="right">
                                                <div style={{color:"red"}}>
                                                    {espera}
                                                </div>
                                                <button type="submit" className="btn btn-info my-2 my-sm-0" id="btnIE"> Enviar </button>
                                        </div>
                                </div>
                            </div>
                </ModalBody>
                </form>
            </Modal>
        </>
    );
}

export default EnviarCotizacion;