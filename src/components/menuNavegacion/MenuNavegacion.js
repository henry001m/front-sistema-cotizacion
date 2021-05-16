import React, { useState, useEffect } from 'react';
import { PersonCircle } from 'bootstrap-icons-react'
import './MenuNavegacion.css'

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(window.localStorage.getItem("userDetails"));
                setUserName(user.user.name)
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
    })

    return(
        <>
            <nav className="navbar navbar-light justify-content-between" id="cabecera">
                <h1>
                    Sistema de Cotizaciones
                </h1>
                <button type="button" className="btn btn-default" id="userImg">
                    <PersonCircle height={45} width={45}/>   {userName}
                </button>
            </nav>
                <ul className="nav nav-pills justify-content-center" id="navmenu">
                    {home &&
                        <li className="nav-container--item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                    }
                    {realizarSolicitudesAdqui &&
                        <li className="nav-container--item">
                            <a className="nav-link" type="button" href="/SolicitudesDeAdquisicion">Solicitudes De Adquisicion</a>
                        </li>
                    }
                    {verSolicitudesAdqui &&
                        <li className="nav-container--item">
                            <a className="nav-link" href="/SolicitudesDeAdquisicionAdmin">Solicitudes De Adquisicion</a>
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
                                {realizarComparacion &&
                                    <a className="dropdown-item" href="">Realizar Comparacion</a>
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
                                        <a className="dropdown-item" href="/user">Usuarios</a>
                                        }
                                        {administrarRoles &&
                                        <a className="dropdown-item" href="/roles">Rol de Usuarios</a>
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
                            <a className="nav-link" href="/unidadesDeGasto">Unidad de Gasto</a>
                        </li>):(<div/>)
                    }
                    { Empresa &&
                        <li className="nav-container--item">
                            <a className="nav-link" href="/empresas">Empresas</a>
                        </li>
                    }
                    { decargaFormularioCoti &&
                        <li className="nav-container--item">
                            <a className="nav-link" href="./SolicitudDeCotización.pdf" download>Descargar Formulario</a>
                        </li>
                    }
                    { decargaFormularioAdqui &&
                        <li className="nav-container--item">
                            <a className="nav-link" type="button" href="./SolicitudDeAdquisicion.pdf" download>Descargar Formulario</a>
                        </li>
                    }
                    { admiMontoLimite &&
                        <li className="nav-container--item">
                            <a className="nav-link" href="/montoLimite">Monto Limite</a>
                        </li>
                    }
                </ul>
        </>
    );
}

export default MenuNavegacion;