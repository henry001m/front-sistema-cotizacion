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
            <div className="container" align="left">
                <div className="form-row">
                    <div class="col-md-6">
                        <img src="./logoumss.png"></img>
                    </div>
                    <div class="col-md-6" id="cont-bienvenida">
                        <h3>Bienvenido/a , {user.user.name}</h3>
                        <p >En este sistema podra realizar sus respectivas funciones <br></br>
                            en la unidad o unidades a las que pertenece.<br></br>
                            Si necesita mas informacion sobre el uso del mismo<br></br>
                            comuniquese al correo o cosulte los manuales.
                        </p>
                        <a class="btn btn-info" href="https://drive.google.com/drive/folders/1a3yRE9I8NpsgWkRn5AVgz7MwBQEVh1Ux?usp=sharing" target="_blank"> Ver manuales</a>
                    </div>
                </div>
            </div>
        )
       }
       
     </>
    );
}

export default Home;