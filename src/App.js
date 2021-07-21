import './App.css';
import { BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import MenuNavegacion from './components/menuNavegacion/MenuNavegacion';
import Main from './pages/Main';

function App() {
  return (
    <Router>
       <Navbar/>
        <Main/>
        <Footer/>
    </Router>
  );
}
export default App;