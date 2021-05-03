import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import UserImg from './../../resources/user.jpg'
import Home from './../../pages/Home'
import SolicitudesVista from '../../pages/solictudesVista/SolicitudesVista';
import EnviarCotizacion from '../../pages/enviarFormulario/EnviarCotizacion';
import { PersonCircle } from 'bootstrap-icons-react';
import DetalleSolicitud from '../../pages/solictudesVista/DetalleSolicutd';
import MontoLimite from '../../pages/montoLimite/MontoLimite'
import './NavAdministrador.css';

function NavAdministrador() {
    return(
        <>
            <nav className="navbar navbar-light justify-content-between" id="cabecera">
                <h1>
                    Sistema de Cotizaciones
                </h1>
                <button type="button" className="btn btn-default" id="userImg">
                    <PersonCircle height={45} width={45} />  Unidad Administrativa
                </button>
            </nav>
            <Router>
                <ul className="nav nav-pills justify-content-center" id="navmenu">
                    <li className="nav-container--item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-container--item">
                        <a className="nav-link" href="/SolicitudesDeAdquisicionAdmin">Solicitudes De Adquisicion</a>
                    </li>
                    <li className="nav-container--item dropdown">
                        <div class="dropdown">
                                <button class="dropbtn nav-link ">Cotización</button>
                                    <div class="dropdown-content">
                                        <a className="dropdown-item" >Realizar Comparación</a>
                                        <a className="dropdown-item" href="/EnviarCotizacion">Enviar Cotizacion</a>
                                    </div>
                        </div>
                    </li>
                    <li className="nav-container--item">
                        <a className="nav-link" href="">Unidad de Gasto</a>
                    </li>
                    <li className="nav-container--item">
                        <a className="nav-link" href="">Empresas</a>
                    </li>
                    <li className="nav-container--item">
                        <a className="nav-link" href="./SolicitudDeCotización.pdf" download>Descargar Formulario</a>
                    </li>
                    <li className="nav-container--item">
                        <a className="nav-link" href="/montoLimite">Monto Limite</a>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/" component={ Home }/>
                    <Route exact path="/SolicitudesDeAdquisicionAdmin" component={ SolicitudesVista }/>
                    <Route exact path="/EnviarCotizacion" component={ EnviarCotizacion }/>
                    <Route exact path="/DetalleSolicitud/:id" component={ DetalleSolicitud }/>
                    <Route exact path="/montoLimite" component={ MontoLimite }/>
                </Switch>
            </Router>
        </>
    );
}

export default NavAdministrador;
