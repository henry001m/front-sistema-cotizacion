
import './App.css';
import NavUnidadGasto from './components/navUnidadGasto/NavUnidadGasto'
import NavAdministrador from './components/navAdministrador/NavAdministrador'
import NavSuperusuario from './components/navSuperusuario/NavSuperusuario';
import DetalleSolicitud from './pages/solictudesVista/DetalleSolicutd'
import Usuario from './pages/usuario/Usuario';
import NavInicio from './components/navInicio/NavInicio';
import IngresoCodigo from './pages/respEmpresa/IngresoCodigo';
import RespuestaCotizacion from './pages/respEmpresa/RespuestaCotizacion';
import VerArchivos from './pages/verArchivos/VerArchivos'

function App() {
  return (
    <div className="App">
      {/* <NavSuperusuario/> */}
      <VerArchivos />
      {/* <IngresoCodigo/> */}
    </div>
  );
}
export default App;
