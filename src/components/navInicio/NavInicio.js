import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../../pages/Home'
import './NavInicio.css'

function NavInicio() {
    return(
        <>
            <nav className="navbar navbar-light justify-content-between" id="cabecera">
                <h1>
                    Sistema de Cotizaciones
                </h1>
            </nav>
            <h1>Bienvenido</h1>
            <img src="./logoumss.png"></img>
        </>
    );
}

export default NavInicio;