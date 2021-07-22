import React,{useState,useEffect} from 'react'
import './SolicitudesVista.css'
import { useForm } from "react-hook-form";
import { getQuotitationAdministrativeUnitPage} from '../../services/http/QuotitationService';
import { useHistory, useParams } from 'react-router-dom'
import { Eye, FileEarmarkText, Envelope, ChevronLeft, Printer, Coin } from 'react-bootstrap-icons'
import Pagination from 'react-js-pagination';
import EnviarCotizacion from '../enviarFormulario/EnviarCotizacion'
import CrearInforme from '../informe/CrearInforme';
import { getReport } from '../../services/http/ReportService';
import InformeCotizacion from '../cotizaciones/InformeCotizacion';
import { getReportQuotitation } from '../../services/http/ReportQuotitationService';
import {URL_API} from '../../services/const';
import { ModalHeader } from 'reactstrap';
import ImprimirCotización from '../modalImprimirCotizacion/ImprimirCotizacion';
function SolicitudesVista(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {idUA} = useParams();
    const [quotitations, setQuotitations] = useState([]);
    const [abiertoEmail, setAbiertoEmail] = useState(false);
    const [quotitationId, setQuotitationID ] = useState("")
    let history = useHistory();
    const [request, setRequest ] = useState({});
    const [abiertoInforme, setAbiertoInforme] = useState(false);
    const [abiertoModalImprimir, setAbiertoModalImprimir] = useState(false);
    const [report, setReport ] = useState(null)
    const [abiertoInformeCotizacion, setAbiertoInformeCotizacion] = useState(false);
    const [reportQuotitation, setReportQuotitation ] = useState(null)
    const [search, setSearch] = useState("");
    const [filteredQuontitation, setFilteredQuotitation] = useState([])
    const [currentPage, setCurrentPage] = useState(null)
    const [perPage, setPerPage] = useState(null)
    const [total, setTotal] = useState(null)
    const [status, setStatus] = useState("")

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("userDetails"));
        getAllQuotitations(1,"");
        //eslint-disable-next-line
    }, []);

    async function getAllQuotitations(page,status) {
        try {
            const aux = {status:status}
            const result = await getQuotitationAdministrativeUnitPage(idUA,page,aux)
            console.log(result.data)
            setQuotitations(result.data);
            setCurrentPage(result.current_page)
            setPerPage(result.per_page)
            setTotal(result.total)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setFilteredQuotitation(
            quotitations.filter((quantitation) =>
                quantitation.nameUnidadGasto.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search,quotitations]);
    const EnablebuttonAddReport = (quotitation) =>{
        if(quotitation.statusReport){
            return(
                <button className="dropdown-item" onClick={() => abrirModalInforme(quotitation.id)}>
                    <FileEarmarkText/> Informe Solicitud
                </button>                                    
            );
        }else{
            return(
                <button className="dropdown-item" disabled>
                    <FileEarmarkText/> Informe Solicitud
                </button>
            );
        }
    }

    const EnableSendMailButton = (quotitation) =>{
        if(quotitation.status=="Aceptado" && quotitation.statusResponse !== "Finalizado"){
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
        if(quotitation.status=="Aceptado" && quotitation.statusResponse !== "Finalizado"){
            /* const urlQuotitation = URL_API+"/requestquotitationpdf/"+quotitation.id; */
            return(
                <button className="dropdown-item" onClick={() => abrirModalImprimir(quotitation.id)} >
{/*                     <a target="true" href={urlQuotitation} style={{textDecoration:'none',padding:'0px', color:"#000"}}><Printer/> Imprimir cotización</a>
 */}              <Printer/> Imprimir cotización
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
        if(quotitation.statusResponse==="En proceso" || quotitation.statusResponse==="Finalizado"){
            return(
                <button className="dropdown-item" onClick={() => {history.push({pathname:`/cotizaciones/${quotitation.id}`,data:quotitation});}}>
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

    const EnablebuttonReportQuotitation = (quotitation) =>{
        if(quotitation.statusResponse==="Finalizado"){
            return(
                <button className="dropdown-item" onClick={() => history.push(`/informeCotizacionResp/${quotitation.id}`)}>
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

    const abrirModalImprimir=(id)=>{
        setQuotitationID(id);
        setAbiertoModalImprimir(true);
    }
    const cerrarModalImprimir=()=>{
        setAbiertoModalImprimir(false);
    }

    const abrirModalInformeCotizacion =(id)=>{
        getInformeQuotitation(id)
        setQuotitationID(id);
        setAbiertoInformeCotizacion(true);
    }

    const cerrarModalInformeCotizacion=()=>{
        setReportQuotitation(null)
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

    async function getInformeQuotitation(id) {
        console.log("id",id)
        try {
            const result = await getReportQuotitation(id);
            console.log(result)
            if(result){
                setReportQuotitation(result);
            }else{
                setReportQuotitation(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSelectChange = (event) => {
        setStatus(event.target.value)
        getAllQuotitations(1,event.target.value)
    }

    return(
        <>
            <div className="container" align="left">
                    <div class="card-header">
                    <h4>Solicitudes</h4>
                    </div>
                    <br></br>
                    <div className="form-row">
                        <div className="col-4" style={{textAlign:"justify"}}>
                            <h6>Buscar por estado de solicitud: </h6>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-4">
                            <select 
                                name="selectRol"
                                className="form-control"
                                onChange={ handleSelectChange }>
                                <option value="">Todos</option>
                                <option value="Aceptado">Aceptado</option>
                                <option value="Rechazado">Rechazado</option>
                                <option value="Pendiente">Pendiente</option>   
                            </select>
                        </div>
                    </div>
                    <br></br>
                    <div className="form-register">             
                        <div className="form-row">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Cod</th>
                                        <th scope="col">Unidad de Gasto</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Estado de Solicitud</th>
                                        <th scope="col">Estado de Cotización</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {filteredQuontitation.map((quotitation,index) => {
                                    return(
                                        <tr key={quotitation.id}>
                                            <th scope="row">{index+1}</th>
                                            <td>
                                                { (quotitation.id>0 && quotitation.id<10)?(<div >00000{quotitation.id}</div>):
                                                  ((quotitation.id>9 && quotitation.id<100)?(<div >0000{quotitation.id}</div>):
                                                  (<div >000{quotitation.id}</div>))
                                                }
                                            </td>
                                            <td>{quotitation.nameUnidadGasto}</td>
                                            <td>{quotitation.requestDate}</td>
                                            <td>
                                                { (quotitation.status=="Aceptado")?(<div class="badge badge-success text-wrap">{quotitation.status}</div>):
                                                  ((quotitation.status=="Rechazado")?(<div class="badge badge-danger text-wrap">{quotitation.status}</div>):
                                                  (<div class="badge badge-warning">{quotitation.status}</div>))
                                                }
                                            </td>
                                            <td>
                                                { (quotitation.statusResponse=="Finalizado")?(<div class="badge badge-success text-wrap">{quotitation.statusResponse}</div>):
                                                  ((quotitation.statusResponse=="Denegado")?(<div class="badge badge-danger text-wrap">{quotitation.statusResponse}</div>):
                                                  (quotitation.statusResponse=="En proceso")?(<div class="badge badge-warning">{quotitation.statusResponse}</div>):
                                                  (<div class="badge badge-light">{quotitation.statusResponse}</div>))
                                                }
                                            </td>
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
                                                            EnablebuttonReportQuotitation(quotitation)
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
                        <div className="form-row">
                            <div className="col">
                                <Pagination
                                activePage = {currentPage}
                                totalItemsCount = {total}
                                itemsCountPerPage = {perPage}
                                onChange = {(pageNumber)=> getAllQuotitations(pageNumber,status)}
                                itemClass = "page-item"
                                linkClass = "page-link"
                                />
                            </div>
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
                        title={"Informe solicitud"}
                    />
                    <ImprimirCotización
                        id={quotitationId}
                        abierto={abiertoModalImprimir}
                        cerrarModal = {cerrarModalImprimir}
                    />
                    <InformeCotizacion
                        id={quotitationId}
                        abierto={abiertoInformeCotizacion} 
                        cerrarModal={cerrarModalInformeCotizacion}
                        report={reportQuotitation}
                    />
            </div><br></br><br></br><br></br><br></br><br></br>
        </>
    );
}

export default SolicitudesVista;