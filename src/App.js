
import './App.css';
import NavUnidadGasto from './components/navUnidadGasto/NavUnidadGasto'
import NavAdministrador from './components/navAdministrador/NavAdministrador'
import NavSuperusuario from './components/navSuperusuario/NavSuperusuario';
import DetalleSolicitud from './pages/solictudesVista/DetalleSolicutd'

function App() {
  return (
    <div className="App">
      <NavSuperusuario/>
    </div>
  );
}
export default App;
