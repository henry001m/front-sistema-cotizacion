import { Button } from 'bootstrap';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import RegistroUnidad from '../../pages/regitroUnidadGasto/RegistroUnidad'

function MainRegistroUnidad () {
    return (
        
        <div className="container" align="left">
        <br></br>
        <h1>Unidades de Gasto</h1>
        <br></br>
    <div className="row">
        <div className="col-6">
            <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            </form>
        </div>
        <Router>
            <div className="col-6" align="right">
            <button  href="/register">Agragar Unidad de Gasto</button>
            </div>
            <Switch>
                <Route exact path="/register" component={ RegistroUnidad }/>

            </Switch>
        </Router>
        
        </div>
    <br></br>
    <div className="form-register">             
        <div className="form-row">
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Facultad</th>
                    <th scope="col">Unidad Administrativa</th>
                    </tr>
                </thead>
                <tbody>
                  
                </tbody>
            </table>
        </div>
    </div>
</div>
       

    )
}

export default MainRegistroUnidad
