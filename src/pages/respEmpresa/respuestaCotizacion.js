import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../Home'
import './RespuestaCotizacion.css'

function respuestaCotizacion() {

    const closePage = ( ) => {
       // history.replace("/IngresoCodigo")
    };

    return(
        <>
            <nav className="navbar navbar-light justify-content-between" id="cabecera">
                <h1>
                    Sistema de Cotizaciones
                </h1>
            </nav>
            <div className="container" align="left">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Responder Cotizacion</h1>   
                    </div>
                    <div className="col-md-6" align="end">
                        <button type="button" className="close" onClick={ closePage }>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                
                <div className="col" id="registro">
                    <div className="form-register" id="formRegistro">
                        <form>
                        <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Empresa:</label>
                                    <div className="form-row" id="inputs">
                                        <label class="col-form-label">empresa x</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Validez de la oferta:</label>
                                    <div className="form-row" id="inputs">
                                        <label class="col-form-label">Validez</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Fecha de Solicitud:</label>
                                    <div className="form-row" id="inputs">
                                        <label class="col-form-label">dd/mm/aaaa</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row" id="list">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Unidad</th>
                                        <th scope="col">Destalle</th>
                                        <th scope="col">Precio Unit.</th>
                                        <th scope="col">Precio total</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Observaciones:</label>
                                    <div className="form-row" id="inputs">
                                        <label class="col-form-label">extra</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="form-group col" id="toolbar">
                                    <button type="button" className="btn btn-success" id="enviarCot"> Enviar </button>
                                </div>
                            </div>
                        </form>
                                
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default respuestaCotizacion;