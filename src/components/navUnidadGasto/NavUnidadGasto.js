import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import UserImg from './../../resources/user.jpg'
import Home from './../../pages/Home'
import SolicitudesDeAdquisicion from '../../pages/solicitudes/SolicitudesDeAdquisicion'
import './NavUnidadGasto.css'
import AgregarDetalleSolictud from '../../pages/solicitudes/AgregarDetallleSolicitud'

function NavUnidadGasto() {
    return(
        <>
            <nav className="navbar navbar-light justify-content-between" id="cabecera">
                <h1>
                    Sistema de Cotizaciones
                </h1>
                <button type="button" className="btn btn-default" id="userImg">
                    <img  src={UserImg} height="50" alt="logo" />
                        Unidad de Gasto
                </button>
            </nav>
            <Router>
                <ul className="nav nav-pills justify-content-center" id="navmenu">
                    <li className="nav-container--item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-container--item">
                        <a className="nav-link" href="/SolicitudesDeAdquisicion">Solicitudes De Adquisicion</a>
                    </li>
                    <li className="nav-container--item">
                        <a className="nav-link" href="/DescargarFormulario">Descargar Formulario</a>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/" component={ Home }/>
                    <Route exact path="/SolicitudesDeAdquisicion" component={ SolicitudesDeAdquisicion }/>
                    <Route exact path="/AgregarDetalleSolictud" component={ AgregarDetalleSolictud }/>
                </Switch>
            </Router>
        </>
    );
}

export default NavUnidadGasto;