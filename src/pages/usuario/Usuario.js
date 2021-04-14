import { PlusCircle } from 'bootstrap-icons-react';
import React from  'react'
import './Usuarios.css'

function Usuario(){
    return(
        <>
            <div className="container" align="left">
                    <br></br>
                    <h1>Usuarios</h1>
                    <br></br>
                <div className="row">
                    <div className="col-6">
                        <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        </form>
                    </div>
                    <div className="col-6" align="right">
                        <button type="button" className="btn btn-success my-2 my-sm-0"> 
                        <PlusCircle className="mb-1"/> Nuevo </button>
                    </div>
                </div>
                <br></br>
                <div className="form-register">             
                    <div className="form-row">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                <th className="col-1">#</th>
                                <th className="col-2">Nombre</th>
                                <th className="col-3">Carnet de Identidad</th>
                                <th className="col-2">Telefono</th>
                                <th className="col-2">Correo</th>
                                <th className="col-2">Tipo de Usuario</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td className="col-1">1</td>
                                <td className="col-2">Mark</td>
                                <td className="col-3">1234579</td>
                                <td className="col-2">7458931</td>
                                <td className="col-2">@mdo</td>
                                <td className="col-2">admin</td>
                                </tr>
                                <tr>
                                <td className="col-1">2</td>
                                <td className="col-2">Mark</td>
                                <td className="col-3">1234579</td>
                                <td className="col-2">7458931</td>
                                <td className="col-2">@mdo</td>
                                <td className="col-2">admin</td>
                                </tr>
                                <tr>
                                <td className="col-1">3</td>
                                <td className="col-2">Mark</td>
                                <td className="col-3">1234579</td>
                                <td className="col-2">7458931</td>
                                <td className="col-2">@mdo</td>
                                <td className="col-2">admin</td>
                                </tr>
                                <tr>
                                <td className="col-1">4</td>
                                <td className="col-2">Mark</td>
                                <td className="col-3">1234579</td>
                                <td className="col-2">7458931</td>
                                <td className="col-2">@mdo</td>
                                <td className="col-2">admin</td>
                                </tr>
                                <tr>
                                <td className="col-1">5</td>
                                <td className="col-2">Mark</td>
                                <td className="col-3">1234579</td>
                                <td className="col-2">7458931</td>
                                <td className="col-2">@mdo</td>
                                <td className="col-2">admin</td>
                                </tr>
                                <tr>
                                <td className="col-1">6</td>
                                <td className="col-2">Mark</td>
                                <td className="col-3">1234579</td>
                                <td className="col-2">7458931</td>
                                <td className="col-2">@mdo</td>
                                <td className="col-2">admin</td>
                                </tr>
                                <tr>
                                <td className="col-1">7</td>
                                <td className="col-2">Mark</td>
                                <td className="col-3">1234579</td>
                                <td className="col-2">7458931</td>
                                <td className="col-2">@mdo</td>
                                <td className="col-2">admin</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            
        </div>
        </>
    );
}

export default Usuario;