import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getRequest,updateStatus } from '../../services/http/QuotitationService'
import VerArchivos from '../verArchivos/VerArchivos'
import './SolicitudesVista.css'

function DetalleSolicitud(){
    const {id} = useParams();
    const [ request, setRequest ] = useState();
    const [ nameUnidadGasto, setNameUnidadGasto ] = useState();
    const [ aplicantName, setAplicantName ] = useState();
    const [ requestDate, setRequestDate ] = useState();
    const [ amount, setAmount ] = useState();
    const [ details, setDetails ] = useState([])
    const [ btnActivo, setBtnActivo ] = useState(false); 
    const [ isShowModalFile, setIsShowModalFile ] = useState(false)

    let history = useHistory();

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
            if(resultQuotitations.status=="pendiente"){
                setBtnActivo(true);
            }else{
                setBtnActivo(false);
            }
        }
        getRequestId();
    }, []);
    
  
    const acceptRequest = async ( ) => {
        const aux = {status:"aceptado"}
        const result = await updateStatus(id,aux);
        history.replace("/SolicitudesDeAdquisicionAdmin")
    };

    const rejectRequest = async ( ) => {
        const aux = {status:"rechazado"}
        const result = await updateStatus(id,aux);
        history.replace("/SolicitudesDeAdquisicionAdmin")
    };

    const closePage = ( ) => {
        history.replace("/SolicitudesDeAdquisicionAdmin")
    };

    const closeModal = () => {
        setIsShowModalFile(false)
    }

    const Details = details.map((detail,index)=>{
        return(
            <tr key={index}>
                <th scope="row">
                    {index+1}         
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
                <div className="row">
                    <div className="col-md-6">
                        <h1>Solicitud # {id}</h1>   
                    </div>
                    <div className="col-md-6" align="right">
                        <button type="button" className="close" onClick={ closePage }>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <br></br>
                <div className="col" id="registro">
                    <div className="form-register">
                        <form>
                        <div className="form-row" id="formData">
                                <div className="form-group col-md-4" >
                                    <label>Unidad de gasto:</label>
                                    <div className="form-row" id="input">
                                        <label class="col-form-label">{nameUnidadGasto}</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Nombre del Solicitante:</label>
                                    <div className="form-row" id="input">
                                        <label class="col-form-label">{aplicantName}</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Fecha de Solicitud:</label>
                                    <div className="form-row" id="input">
                                        <label class="col-form-label">{requestDate}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label>Detalle de solicitud</label>
                                </div>
                            </div>
                            <div className="form-row" id="lista">
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
                                    <div className="form-row" id="input">
                                        <label class="col-form-label">{amount}</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-6" style={{marginTop:"33px"}}>
                                    <button type="button" className="btn btn-secondary"
                                        onClick={()=>setIsShowModalFile(true)}
                                    >Ver Archivos</button>
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="form-group col" id="toolbar">
                                    <button type="button" className="btn btn-danger" id="btnV" onClick={ rejectRequest } disabled={ !btnActivo }> Rechazar solicitud </button>
                                    <button type="button" className="btn btn-success" id="btnV" onClick={ acceptRequest } disabled={ !btnActivo }> Aceptar Solicitud </button>
                                </div>
                            </div>
                        </form>
                                
                    </div>
                </div>
                <VerArchivos
                    isShowModalFile={isShowModalFile}
                    closeModal={closeModal}
                    id={id}    
                />
            </div>
        </>
    );
}

export default DetalleSolicitud;