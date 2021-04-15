
import './App.css';
import NavUnidadGasto from './components/navUnidadGasto/NavUnidadGasto'
import NavAdministrador from './components/navAdministrador/NavAdministrador'
import NavSuperusuario from './components/navSuperusuario/NavSuperusuario';
import ModalAgregarAdquisicion from './pages/solicitudes/ModalAgregarAdquisicion'
import ModalAgregarUsuario from './pages/usuario/ModalAgregarUsuario'

function App() {
  return (
    <div className="App">
      <NavSuperusuario/>
    </div>
  );
}

export default App;
