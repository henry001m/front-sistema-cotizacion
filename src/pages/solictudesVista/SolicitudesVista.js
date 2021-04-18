import React,{useState,useEffect} from 'react'
import './SolicitudesVista.css'
import {getQuotitation} from '../../services/http/QuotitationService';
import { useHistory  } from 'react-router-dom'


function SolicitudesVista(){
    const [quotitations, setQuotitations] = useState([]);
    let history = useHistory();
    const [request, setRequest ] = useState({});

    useEffect(() => {
        async function getAllQuotitations() {
            const result = await getQuotitation();
            const resultQuotitations=result.request_quotitations;
            setQuotitations(resultQuotitations);
        }
        getAllQuotitations();
        //eslint-disable-next-line
    }, []);


    const RequestSelect = (index) =>{
        setRequest(quotitations[index])
        console.log("solicitud",quotitations[index])
    }

    const Quotitations = quotitations.map((quotitation,index)=>{
        return(
            <tr key={index}>
                <td className="col-1">
                    {index+1}         
                </td>
                <td className="col-2">
                    {/limpieza/}         
                </td>
                <td className="col-2">
                    {/fecha/}         
                </td>
                <td className="col-2">
                    <a className="link">ver</a>
                </td>
                <td className="col-3">
                    {/pendiente/}         
                </td>
                <td className="col-2">----</td>
            </tr>
        );
    })
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
                            {quotitations.map((quotitation,index) => {
                                return(
                                    <tr key={quotitation.id}>
                                        <th scope="row">{quotitation.id}</th>
                                        <td >{quotitation.nameUnidadGasto}</td>
                                        <td>{quotitation.requestDate}</td>
                                        <td>
                                            <a className="link" onClick={()=> RequestSelect(index) } href="/DetalleSolicitud/${quotitation}">ver</a>
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