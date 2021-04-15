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
                                    <th className="col-1">#</th>
                                    <th className="col-2">Unidad de Gasto</th>
                                    <th className="col-2">Fecha</th>
                                    <th className="col-2">solicitud</th>
                                    <th className="col-3">Estado</th>
                                    <th className="col-2">Informe</th>
                                </tr>
                            </thead>
                            <tbody>
                            {quotitations.map((quotitation) => {
                                return(
                                    <tr key={quotitation.id}>
                                    <td className="col-1">{quotitation.id}</td>
                                    <td className="col-2">{quotitation.nameUnidadGasto}</td>
                                    <td className="col-2">{quotitation.requestDate}</td>
                                    <td className="col-2">
                                        <a className="link">ver</a>
                                    </td>
                                    <td className="col-3">{quotitation.status}</td>
                                    <td className="col-2">----</td>
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