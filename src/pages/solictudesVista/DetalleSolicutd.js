import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { getRequest } from '../../services/http/QuotitationService'

function DetalleSolicitud(){
    const {id} = useParams();
    const [ request, setRequest ] = useState();
    const [ nameUnidadGasto, setNameUnidadGasto ] = useState();
    const [ aplicantName, setAplicantName ] = useState();
    const [ requestDate, setRequestDate ] = useState();
    const [ amount, setAmount ] = useState();
    const [ details, setDetails ] = useState([])

    useEffect(() => {
        async function getRequestId() {
            const result = await getRequest(id);
            const resultQuotitations=result;
            setRequest(resultQuotitations);
            setNameUnidadGasto(resultQuotitations.nameUnidadGasto)
            setAplicantName(resultQuotitations.aplicantName)
            setRequestDate(resultQuotitations.requestDate)
            setDetails(resultQuotitations.details)
            setAmount(resultQuotitations.amount)
        }
        getRequestId();
    }, []);

    const Details = details.map((detail,index)=>{
        return(
            <tr key={index}>
                <th scope="row">
                    {index}         
                </th>
                <td>
                    {detail.amount}         
                </td>
                <td>
                    {detail.unitMeasure}         
                </td>
                <td >
                    {detail.description}         
                </td>
            </tr>
        );
    })

    return(
        <>
            <div className="container" align="left">
                <br></br>
                <h1>Solicitud # {id}</h1>
                <br></br>
                <div className="col" id="registro">
                    <div className="form-register" id="formRegistro">
                        <form>
                        <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Unidad de gasto:</label>
                                    <div className="form-row" id="inputs">
                                        <label class="col-form-label">{nameUnidadGasto}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombre del Solicitante:</label>
                                    <div className="form-row" id="inputs">
                                        <label class="col-form-label">{aplicantName}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Fecha de Solicitud:</label>
                                    <div className="form-row" id="inputs">
                                        <label class="col-form-label">{requestDate}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row" id="list">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Unidad</th>
                                        <th scope="col">Descripcion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Details}
                                    </tbody>
                                </table>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Monto Estimado:</label>
                                    <div className="form-row" id="inputs">
                                        <label class="col-form-label">{amount}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="form-group col" id="toolbar">
                                    <button type="button" className="btn btn-danger" id="btnV"> Rechazar solicitud </button>
                                    <button type="submit" className="btn btn-success" id="btnV" > Aceptar Solicitud </button>
                                </div>
                            </div>
                        </form>
                                
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetalleSolicitud;