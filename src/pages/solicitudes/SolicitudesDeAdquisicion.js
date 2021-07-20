import React, { useState, useEffect } from 'react'
import { useHistory, useParams} from 'react-router-dom'
import { PlusCircle, ChevronLeft, Eye, FileEarmarkText, Coin} from 'react-bootstrap-icons'
import Pagination from 'react-js-pagination';
import { getQuotitationSpendingUnitPage } from '../../services/http/QuotitationService';
import InformeVista from './InformeVista';
import { getReport } from '../../services/http/ReportService';
import { useForm } from "react-hook-form";
function SolicitudesDeAdquisicion(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {idUA} = useParams();
    const {idUS} = useParams();
    const {nameUS} = useParams();
    const [abrirModalInforme, setAbrirModalInforme] = useState(false)
    const [ idSolicitud, setIdSolicitud ] = useState("")
    const [ report, setReport ] = useState({description:""})
    const [ search, setSearch ] = useState("");
    const [ filteredSolicitud, setFilteredSolicitud ] = useState([]);
    const [currentPage, setCurrentPage] = useState(null)
    const [perPage, setPerPage] = useState(null)
    const [total, setTotal] = useState(null)
    const [status, setStatus] = useState("")
    let history = useHistory();
    function ButtonAgregar(){
        history.push(`/AgregarDetalleSolictud/${idUS}/${nameUS}`)
    }

    const [quotitations, setQuotitations] = useState([]);

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("userDetails"));
        getAllQuotitations(1,"");
    }, []);

    async function getAllQuotitations(page,status) {
        try {
            const aux = {status:status}
            const result = await getQuotitationSpendingUnitPage(idUS,page,aux);
            console.log(result);
            setQuotitations(result.data);
            setCurrentPage(result.current_page)
            setPerPage(result.per_page)
            setTotal(result.total)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setFilteredSolicitud(
            quotitations.filter((nameSolicitud) =>
                nameSolicitud.nameUnidadGasto.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search,quotitations]);
    async function getInforme(id) {
        console.log("id",id)
        try {
            const result = await getReport(id);
            console.log(result)
            if(result){
                setReport(result);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const VerifyInforme = async (id) => {
        console.log(id)
        const res = false
        try {
            const result = await getReport(id);
            console.log(result)
            if(result){
                res = true
            }
        } catch (error) {
            console.log(error)
        }
        return res
    }

    const EnablebuttonReport = (id,statusReport) =>{
        if(statusReport){
            return(
                <button className="dropdown-item" onClick={()=>AbrirModal(id)}>
                    <FileEarmarkText/> Ver informe
                </button>                                    
            );
        }else{
            return(
                <button className="dropdown-item" disabled>
                    <FileEarmarkText/> Ver informe
                </button>
            );
        }
    }

    const EnablebuttonInformeCotizacion = (id,statusResponse) =>{
        if(statusResponse==="Finalizado"){
            return(
                <button className="dropdown-item" onClick={() => history.push(`/informeCotizacionResp/${id}`)}>
                    <Coin/> Respuesta Cotización
                </button>                                    
            );
        }else{
            return(
                <button className="dropdown-item" disabled>
                    <Coin/> Respuesta Cotización
                </button>
            );
        }
    }

    const AbrirModal = (id) => {
        getInforme(id)
        setIdSolicitud(id)
        setAbrirModalInforme(true)
    }

    const CerrarModal = () => {
        setAbrirModalInforme(false)
        setReport([{description:""}])
    }

    const handleSelectChange = (event) => {
        setStatus(event.target.value)
        getAllQuotitations(1,event.target.value)
    }

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
                <td>
                    {quotitation.status}         
                </td>
                <td>
                    {quotitation.statusResponse}         
                </td>
                <td >
                    <li className="nav-container--item dropdown">
                        <div className="dropdown">
                            <button className="dropbtn"><ChevronLeft/>Acciones</button>
                                <div className="dropdown-content  dropdown-menu-right">
                                    <button className="dropdown-item" onClick={ () => history.push(`/verSolicitud/${quotitation.id}`)}>
                                        <Eye/> Ver solicitud
                                    </button>
                                    {
                                        EnablebuttonReport(quotitation.id,quotitation.statusReport)
                                    }  
                                    {
                                        EnablebuttonInformeCotizacion(quotitation.id, quotitation.statusResponse)
                                    }                                 
                                </div>
                        </div>
                    </li>
                    {//<a className="link" onClick={()=>AbrirModal(quotitation.id)}>ver</a>        
    }
                </td>
            </tr>
        );
    });

    return(
        <>
        <div className="container" align="left" style={{marginBottom:"100px"}}>
                    <br></br>
                    <h1>Solicitudes</h1>
                    <br></br>
                <div className="row">
                    <div className="col-4">
                        <input {...register("solicitud", { required: true })}
                                className="form-control"
                                placeholder="Ingrese nombre unidad de gasto" 
                                aria-label="Search"
                                type="search"
                                id = "search"
                                onChange = {(e) => setSearch(e.target.value)}                                    
                         /> 
                    </div>
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
                    <div className="col-4" align="right">
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
                                <th scope="col">Estado de Solicitud</th>
                                <th scope="col">Estado de Cotización</th>
                                <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Quotitations}
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
            <InformeVista
                CerrarModal={CerrarModal}
                abrirModalInforme={abrirModalInforme}
                idSolicitud={idSolicitud}
                report={report}
            />
        </div>
        </>
    );
}

export default SolicitudesDeAdquisicion;