import React,{useState,useEffect} from 'react'
import './SolicitudesVista.css'
import { getQuotitationAdministrativeUnit} from '../../services/http/QuotitationService';
import { useHistory, useParams } from 'react-router-dom'
import { Eye, FileEarmarkText, Envelope, ChevronLeft, Printer, Coin } from 'react-bootstrap-icons'
import EnviarCotizacion from '../enviarFormulario/EnviarCotizacion'
import CrearInforme from '../informe/CrearInforme';
import { getReport } from '../../services/http/ReportService';
import InformeCotizacion from '../cotizaciones/InformeCotizacion';

function SolicitudesVista(){
    const {idUA} = useParams();
    //const [quotitations, setQuotitations] = useState([{id:1, nameUnidadGasto:"tecno", requestDate:"20-10-18", status:"aceptado"}]);
    const [quotitations, setQuotitations] = useState([]);
    const [abiertoEmail, setAbiertoEmail] = useState(false);
    const [quotitationId, setQuotitationID ] = useState("")
    let history = useHistory();
    const [request, setRequest ] = useState({});
    const [abiertoInforme, setAbiertoInforme] = useState(false);
    const [ report, setReport ] = useState(null)
    const [abiertoInformeCotizacion, setAbiertoInformeCotizacion] = useState(false);

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("userDetails"));
        async function getAllQuotitations() {
            try {
                const result = await getQuotitationAdministrativeUnit(idUA);
                const resultQuotitations=result.request_quotitations;
                console.log(resultQuotitations)
                setQuotitations(resultQuotitations);
            } catch (error) {
                console.log(error)
            }
        }
        getAllQuotitations();
        //eslint-disable-next-line
    }, []);

    const EnablebuttonAddReport = (quotitation) =>{
        if(quotitation.status!="pendiente"){
            return(
                <button className="dropdown-item" onClick={() => abrirModalInforme(quotitation.id)}>
                    <FileEarmarkText/> Agregar informe
                </button>                                    
            );
        }else{
            return(
                <button className="dropdown-item" disabled>
                    <FileEarmarkText/> Agregar informe
                </button>
            );
        }
    }

    const EnableSendMailButton = (quotitation) =>{
        if(quotitation.status=="aceptado"){
            return(
                <button className="dropdown-item" onClick={ () => abrirModalEmail(quotitation.id) }>
                    <Envelope/> Enviar correo
                </button>                                    
            );
        }else{
            return(
                <button className="dropdown-item" disabled>
                    <Envelope/> Enviar correo
                </button>
            );
        }
    }

    const EnablebuttonImprimir=(quotitation)=>{
        if(quotitation.status=="aceptado"){
            const urlQuotitation = "http://127.0.0.1:8000/api/requestquotitationpdf/"+quotitation.id;
            return(
                <button className="dropdown-item">
                    <a target="true" href={urlQuotitation} style={{textDecoration:'none',padding:'0px', color:"#000"}}><Printer/> Imprimir cotización</a>
                </button>                                    
            );
        }else{
            return(
                <button className="dropdown-item" disabled>
                    <Printer/> Imprimir cotización
                </button>
            );
        }
    }

    const EnablebuttonQuotitation = (quotitation) =>{
        if(quotitation.status!="pendiente"){
            return(
                <button className="dropdown-item" onClick={() => history.push(`/cotizaciones/${quotitation.id}`)}>
                    <Coin/> Cotizaciones
                </button>                                    
            );
        }else{
            return(
                <button className="dropdown-item" disabled>
                    <Coin/> Cotizaciones
                </button>
            );
        }
    }

    const EnablebuttonAddReportQuotitation = (quotitation) =>{
        if(quotitation.status!="pendiente"){
            return(
                <button className="dropdown-item" onClick={() => abrirModalInformeCotizacion(quotitation.id)}>
                    <FileEarmarkText/>Informe cotizacion
                </button>                                    
            );
        }else{
            return(
                <button className="dropdown-item" disabled>
                    <FileEarmarkText/>Informe cotizacion
                </button>
            );
        }
    }

    const abrirModalEmail =(id)=>{
        setQuotitationID(id);
        setAbiertoEmail(true);
    }
    const cerrarModalEmail=()=>{
        setAbiertoEmail(false);
    }

    const abrirModalInforme =(id)=>{
        getInforme(id)
        setQuotitationID(id);
        setAbiertoInforme(true);
    }
    const cerrarModalInforme=()=>{
        setReport(null)
        setAbiertoInforme(false);
    }

    const abrirModalInformeCotizacion =(id)=>{
        setQuotitationID(id);
        setAbiertoInformeCotizacion(true);
    }
    const cerrarModalInformeCotizacion=()=>{
        setAbiertoInformeCotizacion(false);
    }

    const RequestSelect = (index) =>{
        setRequest(quotitations[index])
        console.log("solicitud",quotitations[index])
    }

    async function getInforme(id) {
        console.log("id",id)
        try {
            const result = await getReport(id);
            console.log(result)
            if(result){
                setReport(result);
            }else{
                setReport(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <div className="container" align="left" style={{marginBottom:"100px"}}>
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
                                        <th scope="col">Estado de Solicitud</th>
                                        <th scope="col">Estado de Cotización</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {quotitations.map((quotitation,index) => {
                                    return(
                                        <tr key={quotitation.id}>
                                            <th scope="row">{index+1}</th>
                                            <td >{quotitation.nameUnidadGasto}</td>
                                            <td>{quotitation.requestDate}</td>
                                            <td>{quotitation.status}</td>
                                            <td>{""/**quotitation.statusQuotitation*/}</td>
                                            <td>
                                                <div className="dropdown">
                                                    <button className="dropbtn"><ChevronLeft/> Acciones</button>
                                                    <div className="dropdown-content dropdown-menu-right">
                                                        <button className="dropdown-item"  onClick={() => history.push(`/DetalleSolicitud/${quotitation.id}`)}>
                                                            <Eye/> Ver solicitud
                                                        </button>
                                                        {
                                                            EnablebuttonAddReport(quotitation)
                                                        }
                                                        {
                                                            EnableSendMailButton(quotitation)
                                                        }
                                                        {
                                                            EnablebuttonImprimir(quotitation)
                                                        }
                                                        {
                                                            EnablebuttonQuotitation(quotitation)
                                                        }
                                                        {
                                                            EnablebuttonAddReportQuotitation(quotitation)
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <EnviarCotizacion
                        id={quotitationId}
                        abiertoEmail={abiertoEmail} 
                        cerrarModal={cerrarModalEmail}
                    />
                    <CrearInforme
                        id={quotitationId}
                        abierto={abiertoInforme} 
                        cerrarModal={cerrarModalInforme}
                        report={report}
                    />
                    <InformeCotizacion
                        id={quotitationId}
                        abierto={abiertoInformeCotizacion} 
                        cerrarModal={cerrarModalInformeCotizacion}
                    />
            </div>
        </>
    );
}

export default SolicitudesVista;