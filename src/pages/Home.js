import React, { Fragment,useState,useEffect } from 'react'
import { PersonCircle } from 'bootstrap-icons-react'
import MenuNavegacion from '../components/menuNavegacion/MenuNavegacion'
import {Button} from 'reactstrap'
import './Home.css';
function Home(){
    const [user, setUser] = useState(null);
    return(
     <> 
       
        {(user == null) ? (
            <div className="text-center">
            <h1>Bienvenido</h1>
            <img src="./logoumss.png"></img>
            </div>
        ):(
            <div className="text-center">
            <h1>Bienvenido al sistema</h1>
            <h2>Revise sus datos personales</h2>
            <img src="./logoumss.png"></img>
            </div>
        )
       }
     </>
    );
}

export default Home;