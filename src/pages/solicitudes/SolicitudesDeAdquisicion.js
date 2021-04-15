import React, { useState, useEffect } from 'react'
import './SolicitudesDeAdquisicion.css'
import { useHistory } from 'react-router-dom'
import { PlusCircle} from 'bootstrap-icons-react'
import Axios from "axios"

function SolicitudesDeAdquisicion(){

    let history = useHistory();


    function ButtonAgregar(){
        history.push("/AgregarDetalleSolictud")
    }

    const [list, setList] = useState([]);
    useEffect(() => {
        Axios({
        url: "http://127.0.0.1:8000/quotitations",
        })
        .then((response) => {
            setList(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }, [setList]);

    const [requests, setRequests ] = useState([])

    const [ number, setNumber ] = useState([9,8,7,6,5,4,3,2,1])

    const Requests = number.map((number,index)=>{
        return(
            <tr key={index}>
                <td className="col-1">
                    {index+1}         
                </td>
                <td className="col-2">
                    {number}         
                </td>
                <td className="col-2">
                    {number}         
                </td>
                <td className="col-2" align="center">
                    <a className="link">ver</a>
                </td>
                <td className="col-3">
                    {number}         
                </td>
                <td className="col-2">
                    <a className="link">ver</a>        
                </td>
            </tr>
        );
    });

    return(
        <>
        <div className="container" align="left">
                    <br></br>
                    <h1>Solicitudes</h1>
                    <br></br>
                <div className="row">
                    <div className="col-6">
                        <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        </form>
                    </div>
                    <div className="col-6" align="right">
                        <button type="button" className="btn btn-success my-2 my-sm-0" onClick={ ButtonAgregar }> 
                        <PlusCircle  className="mb-1"/> Nueva Solicitud </button>
                    </div>
                </div>
                <br></br>
                <div className="form-register">             
                    <div className="form-row">
                        <table className="table table-striped">
                        <thead>
                                <tr>
                                <th className="col-1">#</th>
                                <th className="col-2">Unidad de Gasto</th>
                                <th className="col-2">Fecha</th>
                                <th className="col-2">solicitud</th>
                                <th className="col-3">Estado</th>
                                <th className="col-2">Respuesta</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Requests}
                            <tr>
                                <td className="col-1">1</td>
                                <td className="col-2">limpieza</td>
                                <td className="col-2">02/02/21</td>
                                <td className="col-2">
                                    <a className="link">ver</a>
                                </td>
                                <td className="col-3">pendiente</td>
                                <td className="col-2">
                                <a className="link">ver</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="col-1">2</td>
                                <td className="col-2">maquinaria</td>
                                <td className="col-2">02/02/21</td>
                                <td className="col-2">
                                    <a className="link">ver</a>
                                </td>
                                <td className="col-3">pendiente</td>
                                <td className="col-2">
                                    <a className="link">ver</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="col-1">3</td>
                                <td className="col-2">laboratorios</td>
                                <td className="col-2">02/02/21</td>
                                <td className="col-2">
                                    <a className="link">ver</a>
                                </td>
                                <td className="col-3">pendiente</td>
                                <td className="col-2">
                                <a className="link">ver</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="col-1">1</td>
                                <td className="col-2">limpieza</td>
                                <td className="col-2">02/02/21</td>
                                <td className="col-sm-2" align="char">
                                    <a className="link">ver</a>
                                </td>
                                <td className="col-3">pendiente</td>
                                <td className="col-2">
                                    <a className="link">ver</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="col-1">2</td>
                                <td className="col-2">maquinaria</td>
                                <td className="col-2">02/02/21</td>
                                <td className="col-2">
                                    <a className="link">ver</a>
                                </td>
                                <td className="col-3">pendiente</td>
                                <td className="col-2">
                                    <a className="link">ver</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="col-1">3</td>
                                <td className="col-2">laboratorios</td>
                                <td className="col-2">02/02/21</td>
                                <td className="col-2">
                                    <a className="link">ver</a>
                                </td>
                                <td className="col-3">pendiente</td>
                                <td className="col-2">
                                    <a className="link">ver</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            
        </div>
        </>
    );
}

export default SolicitudesDeAdquisicion;