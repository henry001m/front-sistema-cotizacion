import { FileArrowUpFill, FileEarmarkArrowUpFill, PlusCircle } from 'bootstrap-icons-react'
import React, { useState } from  'react'
import './AgregarDetalleSolicitud.css'
import ModalAgregarAdquisicion from './ModalAgregarAdquisicion'

function AgregarDetalleSolictud(){

    const [ adquiscion, setAdquisicion] = useState({nombreUsuario:"", fecha:"", detalle:[], monto:null})

    const [ errorUser, setErroruser ] = useState({tamanio:"", caracter:""})


    const ValidarCaracteresAfabeticos = (e) => {
        if(e.target.value[0]!==" "){
            if(e.target.value.length !== 5){
                setErroruser({
                    ...errorUser,
                    tamanio:""
                })
                if(e.target.value.match("^[Ññíóáéú a-zA-Z ]*$")!=null){
                    setAdquisicion({
                        ...adquiscion,
                        nombreUsuario:e.target.value
                    })
                }else{
                    setErroruser({
                        ...errorUser,
                        caracter:"El campo solo permite caracteres alfabeticos"
                    })
                }
            }else{
                setErroruser({
                    ...errorUser,
                    tamanio:"el tamaño maximo es de 5"
                })
            }
        }else{
            setErroruser({
                ...errorUser,
                caracter:"Debe epezar con un caracter"
            })
        }
    }

    return(
        <>
            <div className="container" align="left">
                <br></br>
                <h1>Nueva Solicitud</h1>
                <br></br>
                <div className="col" id="registro">
                    <div className="form-register" id="formRegistro">
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombre del Solicitante:</label>
                                    <div className="form-row" id="inputs">
                                        <input type="text" className="form-control" onChange={ ValidarCaracteresAfabeticos }>
                                        </input>
                                        <div style={{color:"red"}}>
                                            {errorUser.tamanio}
                                            {errorUser.caracter}  
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Fecha de Solicitud:</label>
                                    <div className="form-row" id="inputs">
                                        <input type="text" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="form-group col-md-6" id="button">                                   
                                        <button type="button" className="btn btn-success"
                                        data-toggle="modal"
                                        data-target="#modalAgregarAdquisicion">
                                        <PlusCircle className="mb-1"/> Agregar
                                        </button>                                  
                                </div>
                            </div>
                            <div className="form-row" id="list">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                        <th className="col-1">#</th>
                                        <th className="col-2">Cantidad</th>
                                        <th className="col-4">Unidad</th>
                                        <th className="col-5">Descripcion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td className="col-1">1</td>
                                        <td className="col-2">Mark</td>
                                        <td className="col-4">Otto</td>
                                        <td className="col-5">@mdo</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">2</td>
                                        <td className="col-2">Jacob</td>
                                        <td className="col-4">Thornton</td>
                                        <td className="col-5">@fat</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">3</td>
                                        <td className="col-2">Larry</td>
                                        <td className="col-4">the Bird</td>
                                        <td className="col-5">@twitter</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">1</td>
                                        <td className="col-2">Mark</td>
                                        <td className="col-4">Otto</td>
                                        <td className="col-5">@mdo</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">2</td>
                                        <td className="col-2">Jacob</td>
                                        <td className="col-4">Thornton</td>
                                        <td className="col-5">@fat</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">3</td>
                                        <td className="col-2">Larry</td>
                                        <td className="col-4">the Bird</td>
                                        <td className="col-5">@twitter</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">1</td>
                                        <td className="col-2">Mark</td>
                                        <td className="col-4">Otto</td>
                                        <td className="col-5">@mdo</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">2</td>
                                        <td className="col-2">Jacob</td>
                                        <td className="col-4">Thornton</td>
                                        <td className="col-5">@fat</td>
                                        </tr>
                                        <tr>
                                        <td className="col-1">3</td>
                                        <td className="col-2">Larry</td>
                                        <td className="col-4">the Bird</td>
                                        <td className="col-5">@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Monto Estimado:</label>
                                    <div className="form-row" id="inputs">
                                        <input type="text" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="form-group col-md-6" id="button">
                                    
                                        <button type="button" className="btn btn-secondary my-2 my-sm-0"
                                        >< FileEarmarkArrowUpFill className="mb-1"/> Adjuntar Archivo </button>
                                   
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="form-group col" id="btnCE">
                                    <button type="button" className="btn btn-secondary my-2 my-sm-0"> Cancelar </button>
                                    <button type="button" className="btn btn-info my-2 my-sm-0"> Enviar </button>
                                </div>
                            </div>
                        </form>
                        <ModalAgregarAdquisicion/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AgregarDetalleSolictud;