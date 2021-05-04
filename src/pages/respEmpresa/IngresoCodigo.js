import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import './IngresoCodigo.css'
import { useHistory } from 'react-router-dom'
import { PlusCircle} from 'bootstrap-icons-react'
import React, { useState } from  'react'
import { useForm } from 'react-hook-form'
import {searchCode} from '../../services/http/CompanyCodeService'
import RespCotizacion from './RespCotizacion'
function IngresoCodigo() {
    let history = useHistory();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [message, setMessage] = useState("")
    const onSubmit = async(data) => {
        const res = await searchCode({code:data.code});
        console.log(res);
        if(res.status){
            history.push("/respuestaCotizacion")
        }else{
            setMessage("código invalido");
        }
    };

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
                       <form onSubmit={handleSubmit(onSubmit)}>
                        <br></br>
                        <h2 align="center">Ingrese Código</h2>
                        <br></br>

                        <input className="form-control" name="code" {...register("code", { required: true })} />
                            <span style={{color:"red"}}>{message}</span>
                        <br></br>
                        <br></br>
                        <div className="form-group col" align="center">
                          <button type="submit" className="btn btn-success my-2 my-sm-0">Acceder a Cotizacion </button> 
                        </div>
                        </form>
                    </div>

                </div>
               
            </div>
        <Router>
            <Switch>
                <Route exact path = "/respuestaCotizacion" component ={RespCotizacion}/>
            </Switch>
        </Router>
            
        </>
    );
}

export default IngresoCodigo;