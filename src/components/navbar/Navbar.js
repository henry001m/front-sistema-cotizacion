import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import { PersonCircle } from 'bootstrap-icons-react';
import LoginModal from '../../pages/IniciarSesion/IniciarSesionModal';
import {Button} from 'reactstrap'
import MenuNavegacion from '../menuNavegacion/MenuNavegacion'
import './Navbar.css'

function Navbar() {
    const [abierto, setAbierto] = useState(false);
    const [user, setUser] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset} = useForm();

    const abrirModal =()=>{
        setAbierto(true);
        
    }
    const cerrarModal=()=>{
        setAbierto(false);
        reset()
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(window.localStorage.getItem("userDetails"));
                
                setUser(user.user);
                setPermissions(user.user.permissions);
                console.log(user.user);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])
    return(
        <> 
            {(user === null) ? 
            (<div>
            <nav className="navbar navbar-info justify-content-between" id="cabecera">
                <h1>
                    Sistema de Cotizaciones
                </h1>
                <Button type="button" color="primary" onClick={abrirModal}>
                    Iniciar Sesión
                </Button>
            </nav>
        {/*     <LoginModal abierto={abierto} cerrarModal={cerrarModal}/> */}
            <ul className="nav nav-pills justify-content-center" id="navmenu">
                    {permissions.map((permission)=>{
                            return(
                                <li className="nav-container--item">
                                    <a className="nav-link" href={permission.url}>{permission}</a>
                                </li>
                            );
                        }
                    )}
            </ul>
            </div>):(<MenuNavegacion/>)
            }
        </>
    );
}

export default Navbar;