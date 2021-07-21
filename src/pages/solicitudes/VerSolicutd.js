import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getRequest,updateStatus } from '../../services/http/QuotitationService'
import { getFileNames } from '../../services/http/FileService'
import VerArchivos from '../verArchivos/VerArchivos'
import swal from 'sweetalert'
import CrearInforme from '../informe/CrearInforme'

function VerSolicitud(){
    const {id} = useParams();
    const [ request, setRequest ] = useState();
    const [ nameUnidadGasto, setNameUnidadGasto ] = useState();
    const [ aplicantName, setAplicantName ] = useState();
    const [ requestDate, setRequestDate ] = useState();
    const [messageAmount, setMessageAmount] = useState("");
    const [ amount, setAmount ] = useState();
    const [ details, setDetails ] = useState([])
    const [ isShowModalFile, setIsShowModalFile ] = useState(false)
    const [btnActivo, setBtnActivo]=useState(false)
    const [disabledVerArchivos, setDisabledVerArchivos] = useState(true)
    const [montoTope, setMontoTope] = useState(0)
    const [isShowModalInforme, setIsShowModalInforme] = useState(false)

    let history = useHistory();
    const acceptRequest = async ( ) => {
        if(amount > montoTope){
            swal({
                title: "Monto excedido",
                button: "Aceptar",
                icon: "warning"
                
            });
            
        }else{
            const aux = {status:"Aceptado"}
            const result = await updateStatus(id,aux);
            window.history.back();
        }
    };

    const rejectRequest = async ( ) => {
        const aux = {status:"Rechazado"}
        const result = await updateStatus(id,aux);
        window.history.back();
    };

    const closePage = ( ) => {
        window.history.back();
    };

    const alertMessgeInforme = () => {
        swal({
            title: "¿Estas seguro?",
            text: "Para cambiar el estado de una solicitud se debera agregar un informe",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                console.log("se debe abrir el modal")
                setIsShowModalInforme(true)
            } else {
                console.log("no pasa nada")
            }
          });
    };

    const cerrarModalInforme=()=>{
        setIsShowModalInforme(false);
    }

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
            setMontoTope(resultQuotitations.limite.monto)
            setMessageAmount(resultQuotitations.message);
            const files = await getFileNames(id);   
            if ( files ){
                setDisabledVerArchivos(false)
            }    
            if((resultQuotitations.status == "Pendiente")){
                    setBtnActivo(true);
               }else{
                    setBtnActivo(false);
               }
            
        }
        getRequestId();
    }, []);
    return(
        <>
            <div className="container" align="left">
                <div class="row page-titles">
                    <div class="col-md-12 align-self-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">Solicitudes de adquisicion</li>
                            <li class="breadcrumb-item">Solicitud N&#176; {id}</li>
                        </ol>
                    </div>
                </div>
                <br></br>
                <div className="form-row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h4>Solicitud N&#176; {id}
                                    <button type="button" className="close" onClick={ closePage }>
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </h4>
                            </div>
                            <div class="card-body">
                                <div className="row">
                                    <div className="form-group col-md-4" >
                                        <label><strong>Unidad de gasto: </strong></label> <label>{nameUnidadGasto}</label>
                                    </div>
                                    <div className="form-group col-md-4">
                                    <label><strong>Solicitante: </strong></label> <label>{aplicantName}</label>
                                    </div>
                                    <div className="form-group col-md-4">
                                    <label><strong>Fecha de Solicitud:</strong></label> <label>{requestDate}</label>
                                    </div>
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <label><strong>Detalle de solicitud</strong></label>
                                    </div>
                                </div>
                                <div className="form-row"align="center">
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
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label><strong>Monto Estimado: </strong></label> <label>{amount}</label>
                                </div>
                                <div style={{color:'red'}}>{messageAmount}</div>
                                {
                                    messageAmount&&<div style={{color:'red'}}>: {montoTope}</div>
                                }
                            </div>
                            <br></br>
                            <div className="form-row">
                               <div className="form-group col-md-6" align="left">
                                    <button type="button" className="btn btn-secondary"
                                        disabled={disabledVerArchivos}
                                        onClick={()=>setIsShowModalFile(true)}
                                    >Ver Archivos</button>
                                </div>
                                    <div className="form-group col-md-6" align="right">
                                        <button type="button" className="btn btn-secondary"  id="btnV" onClick={() => history.goBack()}> Cerrar </button>
                                    </div>
                            </div>

                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <VerArchivos
                    isShowModalFile={isShowModalFile}
                    closeModal={closeModal}
                    id={id}    
                />
                <CrearInforme
                        id={id}
                        abierto={isShowModalInforme} 
                        cerrarModal={cerrarModalInforme}
                        report={null}
                        rejectRequest={rejectRequest}
                />
            </div>
        </>
    );
}

export default VerSolicitud;