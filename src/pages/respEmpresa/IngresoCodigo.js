import './IngresoCodigo.css'
import { useHistory } from 'react-router-dom'
import React, { useState } from  'react'
import { useForm } from 'react-hook-form'
import {searchCode} from '../../services/http/CompanyCodeService'
import swal from 'sweetalert';
function IngresoCodigo() {
    let history = useHistory();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async(data) => {
        const res = await searchCode({code:data.code});
        console.log(res)
        if(res.status){
            history.push({
                pathname:"/respuestaCotizacion",
                data:res
            })
        }else{
            swal({
                title: "Código invalido",
                icon: "warning",
                button: "Ok",
              });
        }
    };

    return(
        <>
           <div id="cont-portada">
                <img class="color-overlay" src="./fondoumss.png"></img>
                <div class="card">
                    <article class="card-body">
                    <h4 class="card-title text-center mb-4 mt-1" id="title-login">Ingrese codigo</h4>
                    <hr></hr>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-key"></i> </span>
                                </div>
                                <input className="form-control" name="code" {...register("code", { required: "Campo requerido" })} />    
                            </div>
                            { errors.code && <span className="text-danger text-small d-block mb-2"> {errors.code.message} </span>}
                        </div>
                        
                        <div class="form-group">
                        <button type="submit" class="btn btn-success btn-block"> Ingresar </button>
                        </div>
                    </form> 
                    </article>
                </div>
            </div>
        </>
    );
}

export default IngresoCodigo;