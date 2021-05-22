import React, { useState, useEffect } from 'react';
import { PersonCircle,BoxArrowRight } from 'bootstrap-icons-react';
import './MenuNavegacion.css';
import {NavLink} from 'react-router-dom'

function MenuNavegacion() {

    const [userName, setUserName] = useState("")

    const [home, setHome] = useState(true)
    const [realizarSolicitudesAdqui, setRealizarSolicitudesAdqui] = useState(false)
    const [verSolicitudesAdqui, setVerSolicitudesAdqui] = useState(false)
    const [enviarCotizacion, setEnviarCotizacion] = useState(false)
    const [realizarCotizacion, setRealizarCotizacion] = useState(false)
    const [realizarComparacion,setRealizarComparacion] = useState(false)
    const [adminitrarUsuario, setAdministarUsuario] = useState(false)
    const [administrarRoles , setAdimnistrarRoles] = useState(false)
    const [administrarUnidadesdeGasto, setUnidadesGasto] = useState(false)
    const [UnidadesAdministrativas, setUnidadesAdministrativas] = useState(false)
    const [Empresa, setEmpresa] = useState(false)
    const [decargaFormularioCoti, setDecargaFormularioCoti] = useState(false)
    const [decargaFormularioAdqui, setDecargaFormularioAdqui] = useState(false)
    const [admiMontoLimite, setAdmiMontoLimite] = useState(false)
    const [login, setLogin] = useState(false)

    const cerrarSesion = () =>{
        window.localStorage.removeItem("tokenContizacion");
        window.localStorage.removeItem("userDetails");
        window.location = '/';
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(window.localStorage.getItem("userDetails"));
                setUserName(user.user.name);
                setLogin(true);
                user.user.permissions.forEach(permission=>{
                    if(permission=="Ver las solicitudes de adquisición"){
                        setVerSolicitudesAdqui(true)
                    }
                    if(permission=="Solicitu de aquicición"){
                        setRealizarSolicitudesAdqui(true)
                    }
                    if(permission=="Enviar el correo de contización"){
                        setEnviarCotizacion(true)
                    }
                    if(permission=="Todo sobre monte límite"){
                        setAdmiMontoLimite(true)
                    }
                    if(permission=="Registrar unidades administrativas"){
                        setUnidadesAdministrativas(true)
                    }
                    if(permission=="Registrar unidades de gasto"){
                        setUnidadesGasto(true)
                    }
                    if(permission=="Registrar usuarios"){
                        setAdministarUsuario(true)
                    }
                    if(permission=="Registro de empresas"){
                        setEmpresa(true)
                    }
                    if(permission=="Administar roles"){
                        setAdimnistrarRoles(true)
                    }
                })
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    },[])
    return(
        <>
            <nav className="navbar navbar-light justify-content-between" id="cabecera">
                <h1>
                    Sistema de Cotizaciones
                </h1>
                <div>
                <button type="button" className="btn btn-default" id="userImg">
                    <PersonCircle height={45} width={45}/>   {userName}
                </button>
                {login && 
                    <span className="d-inline-block" tabindex="0" data-toggle="tooltip" title="Salir del Sistema">
                        <button onClick={cerrarSesion} type="button" className="btn btn-default" id="userImg">
                            <BoxArrowRight height={30} width={30}/>
                        </button>
                    </span>
                }
                </div>
            </nav>
                <ul className="nav nav-pills justify-content-center" id="navmenu">
                    {home &&
                        <li className="nav-container--item">
                            <NavLink className="nav-link" to="/home">Home</NavLink>
                        </li>
                    }
                    {realizarSolicitudesAdqui &&
                        <li className="nav-container--item">
                            <NavLink className="nav-link" type="button" to="/SolicitudesDeAdquisicion">Solicitudes De Adquisicion</NavLink>
                        </li>
                    }
                    {verSolicitudesAdqui &&
                        <li className="nav-container--item">
                            <NavLink className="nav-link" to="/SolicitudesDeAdquisicionAdmin">Solicitudes De Adquisicion</NavLink>
                        </li>
                    }
                    {/* {(realizarCotizacion||enviarCotizacion) &&
                        <li className="nav-container--item dropdown">
                            <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="" aria-haspopup="true" aria-expanded="true">Cotización</Link>
                            <div className="dropdown-content">
                                {realizarCotizacion &&
                                    <NavLink className="dropdown-item" >Realizar Cotización</NavLink>
                                }
                                {enviarCotizacion &&
                                    <NavLink className="dropdown-item" to="">Enviar Cotizacion</NavLink>
                                }
                                {realizarComparacion &&
                                    <NavLink className="dropdown-item" to="">Realizar Comparacion</NavLink>
                                }
                            </div>
                        </li>
                    } */}
                    {(adminitrarUsuario || administrarRoles) &&
                        <li className="nav-container--item dropdown">
                            <div className="dropdown">
                                <button className="dropbtn nav-link dropdown-toggle">Administrar accesos</button>
                                    <div className="dropdown-content">
                                        {adminitrarUsuario &&
                                        <NavLink className="dropdown-item" to="/user">Usuarios</NavLink>
                                        }
                                        {administrarRoles &&
                                        <NavLink className="dropdown-item" to="/roles">Rol de Usuarios</NavLink>
                                        }
                                    </div>
                            </div>
                        </li>
                    }
                    { UnidadesAdministrativas &&
                        <li className="nav-container--item">
                            <NavLink className="nav-link" to="/UnidadesAdministrativas">Unidades Administrativas</NavLink>
                        </li>
                    }
                    { administrarUnidadesdeGasto ? (
                        <li className="nav-container--item">
                            <NavLink className="nav-link" to="/unidadesDeGasto">Unidad de Gasto</NavLink>
                        </li>):(<div/>)
                    }
                    { Empresa &&
                        <li className="nav-container--item">
                            <NavLink className="nav-link" to="/empresas">Empresas</NavLink>
                        </li>
                    }
                    { decargaFormularioCoti &&
                        <li className="nav-container--item">
                            <NavLink className="nav-link" to="./SolicitudDeCotización.pdf" download>Descargar Formulario</NavLink>
                        </li>
                    }
                    { decargaFormularioAdqui &&
                        <li className="nav-container--item">
                            <NavLink className="nav-link" type="button" to="./SolicitudDeAdquisicion.pdf" download>Descargar Formulario</NavLink>
                        </li>
                    }
                    { admiMontoLimite &&
                        <li className="nav-container--item">
                            <NavLink className="nav-link" to="/montoLimite">Monto Limite</NavLink>
                        </li>
                    }
                </ul>
        </>
    );
}

export default MenuNavegacion;