import React, { useState } from 'react';
import { PersonCircle } from 'bootstrap-icons-react';

function MenuNavegacion() {
    const [permisos, setPermisos] = useState(["adminitrarUsuario","administrarRoles","administarUnidadesDeGasto"])
    const [home, setHome] = useState(false)
    const [solicitudes, setSolicitudes] = useState(true)
    const [enviarCotizacion, setEnviarCotizacion] = useState(false)
    const [realizarCotizacion, setRealizarCotizacion] = useState(false)
    const [adminitrarUsuario, setAdministarUsuario] = useState(true)
    const [administrarRoles , setAdimnistrarRoles] = useState(true)
    const [administrarUnidadesdeGasto, setUnit] = useState(true)
    const [UnidadesAdministrativas, setUnidadesAdministrativas] = useState(true)
    const [Empresa, setEmpresa] = useState(false)
    const [decargaFormulario, setDescargaEmpresa] = useState(false)

    return(
        <>
            <nav className="navbar navbar-light justify-content-between" id="cabecera">
                <h1>
                    Sistema de Cotizaciones
                </h1>
                <button type="button" className="btn btn-default" id="userImg">
                    <PersonCircle height={45} width={45}/>   Superusuario
                </button>
            </nav>
                <ul className="nav nav-pills justify-content-center" id="navmenu">
                    {home &&
                        <li className="nav-container--item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                    }
                    {solicitudes &&
                        <li className="nav-container--item">
                            <a className="nav-link" href="">Solicitudes De Adquisicion</a>
                        </li>
                    }
                    {(realizarCotizacion||enviarCotizacion) &&
                        <li className="nav-container--item dropdown">
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="" aria-haspopup="true" aria-expanded="true">Cotización</a>
                            <div className="dropdown-content">
                                {realizarCotizacion &&
                                    <a className="dropdown-item" >Realizar Cotización</a>
                                }
                                {enviarCotizacion &&
                                    <a className="dropdown-item" href="">Enviar Cotizacion</a>
                                }
                            </div>
                        </li>
                    }
                    {(adminitrarUsuario || administrarRoles) &&
                        <li className="nav-container--item dropdown">
                            <div className="dropdown">
                                <button className="dropbtn nav-link dropdown-toggle">Administrar accesos</button>
                                    <div className="dropdown-content">
                                        {adminitrarUsuario &&
                                        <a className="dropdown-item" href="/NavSuperusuario/usuarios">Usuarios</a>
                                        }
                                        {administrarRoles &&
                                        <a className="dropdown-item" href="/NavSuperusuario/roles">Rol de Usuarios</a>
                                        }
                                    </div>
                            </div>
                        </li>
                    }
                    { UnidadesAdministrativas &&
                        <li className="nav-container--item">
                            <a className="nav-link" href="/UnidadesAdministrativas">Unidades Administrativas</a>
                        </li>
                    }
                    { administrarUnidadesdeGasto ? (
                        <li className="nav-container--item">
                            <a className="nav-link" href="/unidadDeGasto">Unidad de Gasto</a>
                        </li>):(<div/>)
                    }
                    { Empresa &&
                        <li className="nav-container--item">
                            <a className="nav-link" href="">Empresas</a>
                        </li>
                    }
                    { decargaFormulario &&
                        <li className="nav-container--item">
                            <a className="nav-link" href="">Descargar Formulario</a>
                        </li>
                    }
                </ul>
        </>
    );
}

export default MenuNavegacion;