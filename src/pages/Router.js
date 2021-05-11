import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SolicitudesVista from './solictudesVista/SolicitudesVista';
import EnviarCotizacion from './enviarFormulario/EnviarCotizacion'
import Home from './Home'
import Usuario from './usuario/Usuario';
import IngresoCodigo from './respEmpresa/IngresoCodigo';
import RespCotizacion from './respEmpresa/RespCotizacion.js';
import UnidadesAdministrativas from './registroUnidadAdministrativa/UnidadesAdministrativas'
import MainRegistroUnidad from './regitroUnidadGasto/MainRegistroUnidad'
import MontoLimite from './montoLimite/MontoLimite'
import SolicitudesDeAdquisicion from './solicitudes/SolicitudesDeAdquisicion'
import AgregarDetalleSolictud from './solicitudes/AgregarDetalleSolicitud'
import DetalleSolicitud from './solictudesVista/DetalleSolicutd'
import ListaEmpresa from './empresa/ListaEmpresa'

const Router = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={ Home }/>
                {/* Unidad de Gasto */}
                <Route exact path='/SolicitudesDeAdquisicion' component={ SolicitudesDeAdquisicion}/>
                <Route exact path='/AgregarDetalleSolictud' component={ AgregarDetalleSolictud }/>
                {/* Unidad Administratica */}
                <Route exact path="/SolicitudesDeAdquisicionAdmin" component={ SolicitudesVista }/>
                <Route exact path="/EnviarCotizacion" component={ EnviarCotizacion }/>
                <Route exact path="/DetalleSolicitud/:id" component={ DetalleSolicitud }/>
                <Route exact path='/montoLimite' component={ MontoLimite }/>
                {/* Administrador del Sistema */}
                <Route exact path="/UnidadesAdministrativas" component={ UnidadesAdministrativas }/>
                <Route exact path='/respuestaCotizacion' component={ RespCotizacion }/>
                <Route exact path='/ingresoCodigo' component={ IngresoCodigo }/>
                <Route exact path='/unidadesDeGasto' component={ MainRegistroUnidad }/>
                <Route exact path='/user' component={Usuario}/>
                <Route exact path='/empresas' component={ListaEmpresa}/>
            </Switch>
        </div>
    )
}

export default Router
