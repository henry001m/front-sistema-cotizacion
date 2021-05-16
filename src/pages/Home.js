import React, { Fragment,useState } from 'react'
import LoginModal from './iniciarSesion/IniciarSesionModal';
import {Button} from 'reactstrap'
function Home(){
    return(
        <Fragment>
            <div className="text-center">
                <h1>Bienvenido</h1>
                <img src="./logoumss.png"></img>
            </div>
        </Fragment>
    );
}

export default Home;