import './App.css';
import { BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Main from './pages/Main';

function App() {
  return (
    <Router>
       <Navbar/>
        <Main/> 

    </Router>
  );
}
export default App;