import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import UserImg from './../../resources/user.jpg'
import Home from '../../pages/Home'
import SolicitudesVista from '../../pages/solictudesVista/SolicitudesVista';
import Usuario from '../../pages/usuario/Usuario';
import { PersonCircle } from 'bootstrap-icons-react';
import UnidadesAdministrativas from '../../pages/registroUnidadAdministrativa/UnidadesAdministrativas';

function NavSuperusuario() {
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
            <Router>
                <ul className="nav nav-pills justify-content-center" id="navmenu">
                    <li className="nav-container--item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-container--item">
                        <a className="nav-link" href="/SolicitudesDeAdquisicionAdmin">Solicitudes De Adquisicion</a>
                    </li>
                    <li className="nav-container--item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="" aria-haspopup="true" aria-expanded="true">Cotización</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" >Realizar Cotización</a>
                            <a className="dropdown-item" href="">Enviar Cotizacion</a>
                        </div>
                    </li>
                    <li className="nav-container--item dropdown">
                        <div class="dropdown">
                            <button class="dropbtn nav-link ">Administrar accesos</button>
                                <div class="dropdown-content">
                                    <a className="dropdown-item" href="/NavSuperusuario/usuarios">Usuarios</a>
                                    <a className="dropdown-item" href="/">Rol de Usuarios</a>
                                </div>
                        </div>
                    </li>
                    <li className="nav-container--item">
                        <a className="nav-link" href="/UnidadesAdministrativas">Unidades Administrativas</a>
                    </li>
                    <li className="nav-container--item">
                        <a className="nav-link" href="">Unidad de Gasto</a>
                    </li>
                    <li className="nav-container--item">
                        <a className="nav-link" href="">Empresas</a>
                    </li>
                    <li className="nav-container--item">
                        <a className="nav-link" href="">Descargar Formulario</a>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/" component={ Home }/>
                    <Route exact path="/SolicitudesDeAdquisicionAdmin" component={ SolicitudesVista }/>
                    <Route exact path="/NavSuperusuario/usuarios" component={ Usuario }/>
                    <Route exact path="/UnidadesAdministrativas" component={ UnidadesAdministrativas }/>
                </Switch>
            </Router>
        </>
    );
}

export default NavSuperusuario;