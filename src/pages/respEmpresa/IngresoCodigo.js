import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './IngresoCodigo.css'
import { useHistory } from 'react-router-dom'
import { PlusCircle} from 'bootstrap-icons-react'
import React, { useState } from  'react'
import { useForm } from 'react-hook-form'

function IngresoCodigo() {
    let history = useHistory();
    const {register, formState: { errors }, handleSubmit, reset} = useForm();
    const [ newAccess, setNewAccess] = useState({code:""})
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
       console.log("codigo",event.target.value[0])
       setNewAccess({
        ...newAccess,
        [event.target.name] : event.target.value.substring(1)
        });
    }
    
    const saveCode = async() => {
        //vent.preventDefault();
        history.push( {to: '/respuestaCotizacion'})
    }

    return(
        <>
            <nav className="navbar navbar-light justify-content-between" id="cabecera">
                <h1>
                    Sistema de Cotizaciones
                </h1>
            </nav>
            <div className="container" align="left">
               <img src="./logoumss.png"></img>
            </div>
            <form >
                <div className="container" align="right">
                        <br></br>
                        <h1>Ingrese Codigo</h1>
                        <br></br>
                    <input name="code" 
                    {...register("code",
                    {required:"El campo es requerido"})}
                    value={newAccess.code} 
                    type="text" 
                    className="form-control" 
                    onChange={handleChange}></input>
                    <button type="submit" className="btn btn-success my-2 my-sm-0">Acceder a Cotizacion </button>
                </div>
            </form>
        </>
    );
}

export default IngresoCodigo;