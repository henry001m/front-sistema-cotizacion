import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './../../pages/Home'
import SolicitudesDeAdquisicion from '../../pages/solicitudes/SolicitudesDeAdquisicion'
import './NavUnidadGasto.css'
import AgregarDetalleSolictud from '../../pages/solicitudes/AgregarDetalleSolicitud'
import { PersonCircle } from 'bootstrap-icons-react'

function NavUnidadGasto() {
    return(
        <>
            <nav className="navbar navbar-light justify-content-between" id="cabecera">
                <h1>
                    Sistema de Cotizaciones
                </h1>
                <button type="button" className="btn btn-default" id="userImg">
                    <PersonCircle height={45} width={45}/> Unidad de Gasto
                </button>
            </nav>
                <ul className="nav nav-pills justify-content-center" id="navmenu">
                    <li className="nav-container--item">
                        <a className="nav-link" type="button" href="/">Home</a>
                    </li>
                    <li className="nav-container--item">
                        <a className="nav-link" type="button" href="/SolicitudesDeAdquisicion">Solicitudes De Adquisicion</a>
                    </li>
                    <li className="nav-container--item">
                        <a className="nav-link" type="button" href="./SolicitudDeAdquisicion.pdf" download>Descargar Formulario</a>
                    </li>
                </ul>
        </>
    );
}

export default NavUnidadGasto;