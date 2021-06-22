import React, { useState, useEffect } from 'react'
import { useHistory, useParams} from 'react-router-dom'
import { PlusCircle, ChevronLeft, Eye, FileEarmarkText, Coin} from 'react-bootstrap-icons'
import { getQuotitationSpendingUnit } from '../../services/http/QuotitationService';
import InformeVista from './InformeVista';
import { getReport } from '../../services/http/ReportService';

function SolicitudesDeAdquisicion(){
    const {idUS} = useParams();
    const {nameUS} = useParams();
    const [abrirModalInforme, setAbrirModalInforme] = useState(false)
    const [ idSolicitud, setIdSolicitud ] = useState("")
    const [ report, setReport ] = useState({description:""})

    let history = useHistory();


    function ButtonAgregar(){
        history.push(`/AgregarDetalleSolictud/${idUS}/${nameUS}`)
    }

    const [quotitations, setQuotitations] = useState([]);

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("userDetails"));
        async function getAllQuotitations() {
            try {
                console.log("llega esta unidad a solicitudes",idUS)
                const result = await getQuotitationSpendingUnit(idUS);
                console.log(result);
                const resultQuotitations=result.request_quotitations;
            setQuotitations(resultQuotitations);
            } catch (error) {
                console.log(error)
            }
        }
        getAllQuotitations();
        //eslint-disable-next-line
    }, []);

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
                                    <button className="dropdown-item" >
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