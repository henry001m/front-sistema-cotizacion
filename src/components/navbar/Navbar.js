import React,{useState,useEffect} from 'react'
import LoginModal from '../../pages/iniciarSesion/IniciarSesionModal';
import MenuNavegacion from '../menuNavegacion/MenuNavegacion';
import {Button} from 'reactstrap'
import './Navbar.css'

function Navbar() {
    const [ abierto, setAbierto] = useState(false)
    const [ user, setUser] = useState(null)

    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(window.localStorage.getItem("userDetails"));
                setUser(user.user);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    },[])

    return(
        <> 
          {(window.location.pathname=="/ingresoCodigo") ? 
          (
            <nav className="navbar navbar-info justify-content-between" id="cabecera">
            <h1> Sistema de Cotizaciones </h1>
            </nav>
            
          ):(
            (user === null) ? 
                (<div>
                <nav className="navbar navbar-color-on-scroll fixed-top navbar-expand-lg navbar-transparent" id="cabecera">
                    <div class="container">
                        <div class="navbar-translate">
                            <h1 id="title-navbar"> Sistema de Cotizaciones </h1>
                        </div>
                             <Button type="button" color="primary" onClick={abrirModal}>
                              Iniciar Sesión</Button>
                    </div>
                   
                </nav>
                <LoginModal abierto={abierto} cerrarModal={cerrarModal}/> 
                </div>):( <MenuNavegacion/>
                )
          )}

            
        </>
    );
}

export default Navbar;