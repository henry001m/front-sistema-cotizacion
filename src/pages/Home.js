import React, { Fragment,useState,useEffect } from 'react'
import './Home.css'
function Home(){
    const user = JSON.parse(window.localStorage.getItem("userDetails"));
    return(
     <> 
        {(user == null) ? (
            <div id="cont-portada">
                <img class="color-overlay" src="./fondoumss.png"></img>
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                        <h1 id="title-portada">Bienvenido</h1>
                        <p >En apoyo al procesos de cotizaciones
                            este sistema le permitira realizar solicitudes,
                            registrar respuestas de las empresas cotizantes.
                        </p>
                        </div>
                    </div>
                </div>
            </div>
            
        ):(
            <div className="text-center">
            <h1>Bienvenido al sistema</h1>
            <img src="./logoumss.png"></img>
            </div>
        )
       }
       
     </>
    );
}

export default Home;