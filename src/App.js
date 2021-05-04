
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import NavUnidadGasto from './components/navUnidadGasto/NavUnidadGasto'
import NavAdministrador from './components/navAdministrador/NavAdministrador'
import NavSuperusuario from './components/navSuperusuario/NavSuperusuario';
import DetalleSolicitud from './pages/solictudesVista/DetalleSolicutd';
import SolicitudesVista from './pages/solictudesVista/SolicitudesVista';
import EnviarCotizacion from './pages/enviarFormulario/EnviarCotizacion'
import Home from './pages/Home'
import Usuario from './pages/usuario/Usuario';
import NavInicio from './components/navInicio/NavInicio';
import IngresoCodigo from './pages/respEmpresa/IngresoCodigo';
import RespuestaCotizacion from './pages/respEmpresa/RespuestaCotizacion';
import RespCotizacion from './pages/respEmpresa/RespCotizacion.js';

import UnidadesAdministrativas from './pages/registroUnidadAdministrativa/UnidadesAdministrativas'

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/NavAdministrador" component={ NavAdministrador }/>
          <Route exact path="/" component={ Home }/>
          <Route exact path="/SolicitudesDeAdquisicionAdmin" component={ SolicitudesVista }/>
          <Route exact path="/EnviarCotizacion" component={ EnviarCotizacion }/>
          <Route exact path="/DetalleSolicitud/:id" component={ DetalleSolicitud }/>

            <Route exact path="/NavSuperusuario" component={ NavSuperusuario }/>
            <Route exact path="/SolicitudesDeAdquisicionAdmin" component={ SolicitudesVista }/>
            <Route exact path="/NavSuperusuario/usuarios" component={ Usuario }/>
            <Route exact path="/UnidadesAdministrativas" component={ UnidadesAdministrativas }/>
        </Switch>
      </Router>
  );
}
export default App;
