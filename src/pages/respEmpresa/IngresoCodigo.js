import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './IngresoCodigo.css'
import { useHistory } from 'react-router-dom'
import { PlusCircle} from 'bootstrap-icons-react'
import React, { useState } from  'react'
import { useForm } from 'react-hook-form'
import {searchCode} from '../../services/http/CodeService'

function IngresoCodigo() {
    let history = useHistory();
    const {register, formState: { errors }, handleSubmit, reset} = useForm();
    const [ newAccess, setNewAccess] = useState({
        code:""
    
    })
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
       //console.log("codigo",event.target.value)
       setNewAccess({
        ...newAccess,
        [event.target.name] : event.target.value
        });
    }
    
    const saveCode = async() => {
        //vent.preventDefault();
        history.push( {to: '/respuestaCotizacion'})
    }

    const enviarDatos = (event) => {
        event.preventDefault();
        console.log(newAccess.code)
    }

    const confirmCode = async () =>{
        const res = await searchCode({enviarDatos});
        
    }
    return(
        <>
            <nav className="navbar navbar-light justify-content-between" id="cabecera">
                <h1>
                    Sistema de Cotizaciones
                </h1>
            </nav>


            <div className="container-fluid" align="left">
                <div class="row">
                    <div class="col-md-6">
                      <img src="./logoumss.png"></img>
                    </div>
                    <div class="col-md-4">
                       <form onSubmit={enviarDatos} >
                        <br></br>
                        <h1>Ingrese Codigo</h1>
                        <br></br>
                        <input name="code" 
                        {...register("code",
                        {required:"El campo es requerido"})}
                        type="text" 
                        className="form-control" 
                        onChange={handleChange}
                        ></input>
                        <br></br>
                        <div className="form-group col" align="center">
                          <button type="submit" className="btn btn-success my-2 my-sm-0">Acceder a Cotizacion </button> 
                        </div>
                        </form>
                    </div>
                    <h3>{newAccess.code}</h3>

                </div>
               
            </div>
            
        </>
    );
}

export default IngresoCodigo;