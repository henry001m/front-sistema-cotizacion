import React from 'react'
import './SolicitudesDeAdquisicion.css'
import { useHistory } from 'react-router-dom'

function SolicitudesDeAdquisicion(){

    let history = useHistory();
    function ButtonAgregar(){
        history.push("/AgregarDetalleSolictud")
    }

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
                <div className="col-sm-6">
                    <button type="button" className="btn btn-success my-2 my-sm-0"
                    onClick={ ButtonAgregar }> Nueva Solicitud </button>
                </div>
            </form>
            <br></br>
            <div className="form-register">             
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
            </div>
        </>
    );
}

export default SolicitudesDeAdquisicion;