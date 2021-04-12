import React from 'react'
import './SolicitudesVista.css'

function SolicitudesVista(){
    return(
        <>
            <div>
                <h1 align = "center">Solicitudes</h1>
                <br></br>
            </div>
            <form className="form-inline">
                <div className="col-sm-6">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0">Search</button>
                </div>
            </form>
            <br></br>
            <div className="form-register">             
                <div className="form-row" id="list">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th className="col-1">#</th>
                            <th className="col-2">Unidad de Gasto</th>
                            <th className="col-2">Fecha</th>
                            <th className="col-2">Solicitud</th>
                            <th className="col-3">Estado</th>
                            <th className="col-2">Informe</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="col-1">1</td>
                                <td className="col-2">limpieza</td>
                                <td className="col-2">02/02/21</td>
                                <td className="col-sm-2" align="char">
                                    <a className="link">ver</a>
                                </td>
                                <td className="col-3">pendiente</td>
                                <td className="col-2">----</td>
                            </tr>
                            <tr>
                                <td className="col-1">2</td>
                                <td className="col-2">maquinaria</td>
                                <td className="col-2">02/02/21</td>
                                <td className="col-2">
                                    <a className="link">ver</a>
                                </td>
                                <td className="col-3">pendiente</td>
                                <td className="col-2">----</td>
                            </tr>
                            <tr>
                                <td className="col-1">3</td>
                                <td className="col-2">laboratorios</td>
                                <td className="col-2">02/02/21</td>
                                <td className="col-2">
                                    <a className="link">ver</a>
                                </td>
                                <td className="col-3">pendiente</td>
                                <td className="col-2">----</td>
                            </tr>
                            <tr>
                                <td className="col-1">1</td>
                                <td className="col-2">limpieza</td>
                                <td className="col-2">02/02/21</td>
                                <td className="col-sm-2" align="char">
                                    <a className="link">ver</a>
                                </td>
                                <td className="col-3">pendiente</td>
                                <td className="col-2">----</td>
                            </tr>
                            <tr>
                                <td className="col-1">2</td>
                                <td className="col-2">maquinaria</td>
                                <td className="col-2">02/02/21</td>
                                <td className="col-2">
                                    <a className="link">ver</a>
                                </td>
                                <td className="col-3">pendiente</td>
                                <td className="col-2">----</td>
                            </tr>
                            <tr>
                                <td className="col-1">3</td>
                                <td className="col-2">laboratorios</td>
                                <td className="col-2">02/02/21</td>
                                <td className="col-2">
                                    <a className="link">ver</a>
                                </td>
                                <td className="col-3">pendiente</td>
                                <td className="col-2">----</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default SolicitudesVista;