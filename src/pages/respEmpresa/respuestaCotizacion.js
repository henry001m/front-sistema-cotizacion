import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../Home'
import './RespuestaCotizacion.css'
import { useHistory, useParams } from 'react-router-dom'

function RespuestaCotizacion() {

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
                    {/* <div className="col-md-6" align="end">
                        <button type="button" className="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> */}
                </div>
                
                <div className="col" id="registro">
                    <div className="form-register" id="formRegistro">
                        <form>
                            <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label>Empresa:</label>
                                        <input type="text" className="form-control"></input>
                                    </div>
                                    <div className="form-group col-md-4">
                                            <label>Validez de la oferta:</label>
                                            <input type="text" className="form-control"></input>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Fecha de Solicitud:</label>
                                        <input type="text" className="form-control"></input>
                                    </div>      
                            </div>     
                            <div className="form-row">
                                {/* <div className="form-group col-md-4">
                                    <label>Formas de Pago:</label>
                                    <input type="text" className="form-control"></input>
                                </div>
                                 */}
                                <div className="form-group col-md-4">
                                    <label>Formas de Pago:</label>
                                    <select className="form-control" class="form-select" aria-label="Default select example">
                                        {/* <option selected>Efectivo</option> */}
                                        <option value="1">Efectivo</option>
                                        <option value="2">Credito</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Tiempo de Garantia:</label>
                                    <input type="text" className="form-control"></input>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Tiempo de Entrega:</label>
                                    <input type="text" className="form-control"></input>
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
                                    <textarea type="text" className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="form-group col" id="toolbar">
                                <button type="button" className="btn btn-secondary"  id="btnCerrar">Cancelar</button>
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

export default RespuestaCotizacion;