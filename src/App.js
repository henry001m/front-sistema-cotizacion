
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import NavUnidadGasto from './components/navUnidadGasto/NavUnidadGasto'
import NavAdministrador from './components/navAdministrador/NavAdministrador'
import NavSuperusuario from './components/navSuperusuario/NavSuperusuario';
import DetalleSolicitud from './pages/solictudesVista/DetalleSolicutd';
import SolicitudesVista from './pages/solictudesVista/SolicitudesVista';
import EnviarCotizacion from './pages/enviarFormulario/EnviarCotizacion';
import Home from './pages/Home'
import Usuario from './pages/usuario/Usuario';
import IngresoCodigo from './pages/respEmpresa/IngresoCodigo';
import RespCotizacion from './pages/respEmpresa/RespCotizacion.js';

import UnidadesAdministrativas from './pages/registroUnidadAdministrativa/UnidadesAdministrativas'
import MainRegistroUnidad from './pages/regitroUnidadGasto/MainRegistroUnidad'
import MontoLimite from './pages/montoLimite/MontoLimite'
import SolicitudesDeAdquisicion from './pages/solicitudes/SolicitudesDeAdquisicion'
import AgregarDetalleSolictud from './pages/solicitudes/AgregarDetalleSolicitud'

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/NavAdministrador" component={ NavAdministrador }/>
          <Route exact path="/" component={ Home }/>
          <Route exact path="/SolicitudesDeAdquisicionAdmin" component={ SolicitudesVista }/>
          <Route exact path="/EnviarCotizacion" component={ EnviarCotizacion }/>
          <Route exact path="/DetalleSolicitud/:id" component={ DetalleSolicitud }/>
          <Route exact path="/NavUnidadGAsto" component={ NavUnidadGasto }/>
          <Route exact path="/NavSuperusuario" component={ NavSuperusuario }/>
          <Route exact path="/SolicitudesDeAdquisicionAdmin" component={ SolicitudesVista }/>
          <Route exact path="/NavSuperusuario/usuarios" component={ Usuario }/>
          <Route exact path="/UnidadesAdministrativas" component={ UnidadesAdministrativas }/>
          <Route exact path='/respuestaCotizacion' component={ RespCotizacion }/>
          <Route exact path='/ingresoCodigo' component={ IngresoCodigo }/>
          <Route exact path='/unidadDeGasto' component={ MainRegistroUnidad }/>
          <Route exact path='/montoLimite' component={ MontoLimite }/>
          <Route exact path='/SolicitudesDeAdquisicion' component={ SolicitudesDeAdquisicion}/>
          <Route exact path='/AgregarDetalleSolictud' component={ AgregarDetalleSolictud }/>
        </Switch>
      </Router>
  );
}
export default App;
