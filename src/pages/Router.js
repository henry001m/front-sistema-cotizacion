import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
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
import ListaRoles from './rol/ListaRoles'
import ListaPersonal from './personal/ListaPersonal'
import VentanaVerArchivo from './verArchivos/VentanaVerArchivo';
import SeleccionPersonal from './personal/SeleccionPersonal'
import Cotizaciones from './cotizaciones/Cotizaciones';
import VerCotizacion from './verCotizaciones/VerCotizacion';
import InicioSegunRol from '../components/menuNavegacion/InicioSegunRol';
import MenuNavegacion from '../components/menuNavegacion/MenuNavegacion';
import RespCotizacionUA from './resgistrarRespuestaUA/RespCotizacion';


const Router = () => {
    return (
        <div>
            <Switch>
                <Redirect exact from="/" to="/home" />
                <Route exact path="/home" component={ Home }/>
                {/* Unidad de Gasto */}
                <Route exact path='/SolicitudesDeAdquisicion/:idUS/:nameUS' component={ SolicitudesDeAdquisicion}/>
                <Route exact path='/AgregarDetalleSolictud/:idUS/:nameUS' component={ AgregarDetalleSolictud }/>
                {/* Unidad Administratica */}
                <Route exact path="/SolicitudesDeAdquisicionAdmin/:idUA" component={ SolicitudesVista }/>
                <Route exact path="/EnviarCotizacion" component={ EnviarCotizacion }/>
                <Route exact path="/DetalleSolicitud/:id" component={ DetalleSolicitud }/>
                <Route exact path='/montoLimite/:idUA' component={ MontoLimite }/>
                <Route exact path="/personal/:idUA/:idUS" component={ListaPersonal}/>
                <Route exact path='/seleccionPersonal/:idUA/:idUS' component={SeleccionPersonal}/>
                <Route exact path='/perfil' component={InicioSegunRol}/>
                <Route exact path="/menu" component={ MenuNavegacion }/>
                <Route exact path='/respuesta/cotizacion/ua/:id' component={RespCotizacionUA}/>
                {/* Administrador del Sistema */}
                <Route exact path="/UnidadesAdministrativas" component={ UnidadesAdministrativas }/>
                <Route exact path='/unidadesDeGasto' component={ MainRegistroUnidad }/>
                <Route exact path='/user' component={Usuario}/>
                <Route exact path='/empresas' component={ListaEmpresa}/>
                <Route exact path='/roles' component={ListaRoles}/>
                <Route exact path='/showFile/:id/:fl' component={VentanaVerArchivo}/>
                {/* Empresa respuesta de cotizacion */}
                <Route exact path='/respuestaCotizacion' component={ RespCotizacion }/>
                <Route exact path='/ingresoCodigo' component={ IngresoCodigo }/>
                {/**Cotizaciones */}
                <Route exact path='/cotizaciones/:id' component={ Cotizaciones }/>
                <Route exact path='/verCotizacion/:idRe/:idCo' component={ VerCotizacion }/>
            </Switch>
        </div>
    )
}

export default Router
