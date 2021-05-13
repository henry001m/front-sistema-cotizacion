import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { PlusCircle} from 'bootstrap-icons-react'
import { getQuotitation } from '../../services/http/QuotitationService';
import NavUnidadGasto from '../../components/navUnidadGasto/NavUnidadGasto'

function SolicitudesDeAdquisicion(){

    let history = useHistory();


    function ButtonAgregar(){
        history.push("/AgregarDetalleSolictud")
    }

    const [quotitations, setQuotitations] = useState([]);

    useEffect(() => {
        async function getAllQuotitations() {
            const result = await getQuotitation();
            console.log(result);
            const resultQuotitations=result.request_quotitations;
            setQuotitations(resultQuotitations);
        }
        getAllQuotitations();
        //eslint-disable-next-line
    }, []);

    const Quotitations = quotitations.map((quotitation,index)=>{
        return(
            <tr key={index}>
                <th scope="row">
                    {index+1}         
                </th>
                <td >
                    {quotitation.nameUnidadGasto}         
                </td>
                <td >
                    {quotitation.requestDate}         
                </td>
                <td  align="center">
                    <a className="link">ver</a>
                </td>
                <td>
                    {quotitation.status}         
                </td>
                <td >
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
                                <th scope="col">#</th>
                                <th scope="col">Unidad de Gasto</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Solicitud</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Respuesta</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Quotitations}
                            </tbody>
                        </table>
                    </div>
                </div>
            
        </div>
        </>
    );
}

export default SolicitudesDeAdquisicion;