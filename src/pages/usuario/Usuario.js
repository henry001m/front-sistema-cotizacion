import React from  'react'
import './Usuarios.css'

function Usuario(){
    return(
        <>
            <div>
                <h1 align = "center">Usuarios</h1>
                <br></br>
            </div>
            <div className="form-register">
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        </div>
                        <div className="form-group col-md-3">
                                <button className="btn btn-outline-success my-2 my-sm-0">Search</button>
                        </div>
                        <div className="form-group col-md-6" id="button">
                            <button type="button" className="btn btn-success">Nuevo
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
                </form>
            </div>
        </>
    );
}

export default Usuario;