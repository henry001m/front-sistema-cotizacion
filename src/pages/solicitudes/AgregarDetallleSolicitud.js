import React from  'react'
import './AgregarDetalleSolicitud.css'
import ModalAgregarAdquisicion from './ModalAgregarAdquisicion'

function AgregarDetalleSolictud(){
    return(
        <>
            <div>
                <h1 align = "center">Nueva Solicitud</h1>
                <br></br>
            </div>
            <div className="form-register">
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Nombre del Solicitante:</label>
                            <input type="text" className="form-control"></input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Fecha de Solicitud:</label>
                            <input type="text" className="form-control"></input>
                        </div>
                        <div className="form-group col-md-6" id="button">
                            <button type="button" className="btn btn-success"
                            data-toggle="modal"
                            data-target="#modalAgregarAdquisicion">Agregar
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
                            <input type="text" className="form-control"></input>
                        </div>
                        <div className="form-group col-md-6" id="button">
                            <button type="button" className="btn btn-secondary my-2 my-sm-0"> Adjuntar Archivo </button>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col" id="btnCE">
                            <button type="button" className="btn btn-secondary my-2 my-sm-0"> Cancelar </button>
                            <button type="button" className="btn btn-info my-2 my-sm-0"> Enviar </button>
                        </div>
                    </div>
                </form>
                <ModalAgregarAdquisicion/>
            </div>
        </>
    );
}

export default AgregarDetalleSolictud;