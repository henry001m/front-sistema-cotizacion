
import './App.css';
import NavUnidadGasto from './components/navUnidadGasto/NavUnidadGasto'
import NavAdministrador from './components/navAdministrador/NavAdministrador'
import NavSuperusuario from './components/navSuperusuario/NavSuperusuario';
import DetalleSolicitud from './pages/solictudesVista/DetalleSolicutd'
import Usuario from './pages/usuario/Usuario';
import NavInicio from './components/navInicio/NavInicio';
import IngresoCodigo from './pages/respEmpresa/IngresoCodigo';
import RespCotizacion from './pages/respEmpresa/RespCotizacion.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (

    <div className="App">
      <IngresoCodigo/>
      
    </div>
    
  );
}
export default App;
