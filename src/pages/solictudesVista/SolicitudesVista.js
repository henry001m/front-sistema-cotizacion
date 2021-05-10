import React,{useState,useEffect} from 'react'
import './SolicitudesVista.css'
import {getQuotitation} from '../../services/http/QuotitationService';
import { Link, useHistory  } from 'react-router-dom'
import { Eye, FileEarmarkText, Envelope, ChevronLeft } from 'bootstrap-icons-react'
import EnviarCotizacion from '../enviarFormulario/EnviarCotizacion'
import NavAdministrador from '../../components/navAdministrador/NavAdministrador'

function SolicitudesVista(){
    const [quotitations, setQuotitations] = useState([]);
    const [abiertoEmail, setAbiertoEmail] = useState(false);
    const [quotitationId, setQuotitationID ] = useState("")
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

    const EnablebuttonAddReport = (quotitation) =>{
        if(quotitation.status!="pendiente"){
            return(
                <button className="dropdown-item">
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

    const abrirModalEmail =(id)=>{
        setQuotitationID(id);
        setAbiertoEmail(true);
    }
    const cerrarModalEmail=()=>{
        setAbiertoEmail(false);
    }

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
                                        <th scope="col">Estado</th>
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
            </div>
        </>
    );
}

export default SolicitudesVista;