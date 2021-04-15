import React,{useState,useEffect} from 'react'
import './SolicitudesVista.css'
import {getQuotitation} from '../../services/Http/QuotitationService';
function SolicitudesVista(){
    const [quotitations, setQuotitations] = useState([]);

    useEffect(() => {
        async function getAllQuotitations() {
            const result = await getQuotitation();
            const resultQuotitations=result.request_quotitations;
            setQuotitations(resultQuotitations);
        }
        getAllQuotitations();
        //eslint-disable-next-line
    }, []);
    return(
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
                </div>
                <br></br>
                <div className="form-register">             
                    <div className="form-row">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Unidad de Gasto</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">solicitud</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Informe</th>
                                </tr>
                            </thead>
                            <tbody>
                            {quotitations.map((quotitation) => {
                                return(
                                    <tr key={quotitation.id}>
                                        <th scope="row">{quotitation.id}</th>
                                        <td >{quotitation.nameUnidadGasto}</td>
                                        <td>{quotitation.requestDate}</td>
                                        <td>
                                            <a className="link">ver</a>
                                        </td>
                                        <td>{quotitation.status}</td>
                                        <td>----</td>
                                    </tr>
                                );
                            })}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            
        </div>
    );
}

export default SolicitudesVista;