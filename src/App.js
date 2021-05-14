
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Main from './pages/Main';
import VerArchivos from './pages/verArchivos/VerArchivos';

function App() {
  return (
    <Router>
        <VerArchivos/>
        {/* <Navbar/>
        <Main/> */}
    </Router>
  );
}
export default App;
