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

            <div className="container-fluid" align="left">
                <div class="row">
                    <div class="col-md-6">
                      <img src="./logoumss.png"></img>
                    </div>
                    <div class="col-md-4">
                       <form >
                        <br></br>
                        <h2 align="center">Ingrese Código</h2>
                        <br></br>
                              <input type="text" className="form-control"></input>
                        <br></br>
                        <div className="form-group col" align="center">
                          <button type="submit" className="btn btn-success my-2 my-sm-0">Acceder a Cotizacion </button> 
                        </div>
                        </form>
                    </div>

                </div>
               
            </div>
            
        </>
    );
}

export default IngresoCodigo;