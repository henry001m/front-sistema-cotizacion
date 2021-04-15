import { PlusCircle } from 'bootstrap-icons-react';
import React from  'react'
import ModalAgregarUsuario from './ModalAgregarUsuario'

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
                        <ModalAgregarUsuario/>
                    </div>
                </div>
                <br></br>
                <div className="form-register">             
                    <div className="form-row">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Carnet de Identidad</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Rol de Usuario</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>1234579</td>
                                <td>7458931</td>
                                <td>@mdo</td>
                                <td>admin</td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Mark</td>
                                <td>1234579</td>
                                <td>7458931</td>
                                <td>@mdo</td>
                                <td>admin</td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td>Mark</td>
                                <td>1234579</td>
                                <td>7458931</td>
                                <td>@mdo</td>
                                <td>admin</td>
                                </tr>
                                <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>1234579</td>
                                <td>7458931</td>
                                <td>@mdo</td>
                                <td>admin</td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Mark</td>
                                <td>1234579</td>
                                <td>7458931</td>
                                <td>@mdo</td>
                                <td>admin</td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td>Mark</td>
                                <td>1234579</td>
                                <td>7458931</td>
                                <td>@mdo</td>
                                <td>admin</td>
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