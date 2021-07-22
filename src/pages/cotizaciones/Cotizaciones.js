import React, { useEffect, useState } from 'react'
import { EyeFill, PlusCircle } from 'react-bootstrap-icons'
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { getQuotitationList } from '../../services/http/QuotitationService';
import SolicitudesCotizacion from './SolicitudesCotizacion'
function Cotizaciones(props) { 

    const {id} = useParams();
    const [ quotitations, setQuotitations ] = useState([]);
    const [flagCotizar, setFlagCotizar] = useState(true);
    const [finalizado, setFinalizado] = useState(false);
    const [dataQ, setDataQ] = useState({});
    const [ abierto, setAbierto ] = useState(false);
    let history = useHistory()
    const abrirSolicitudes = () => {
        setAbierto(true);
    }
    const cerrarSolicitudes = () => {
        setAbierto(false);
    }
    const abrirCuadro = ()=>{
        history.push({pathname:`/cuadro/${id}`,data:dataQ});
    }

    const agregarCotizacion = () =>{
        if(!finalizado){
            history.push();
            history.push({pathname:"/respuesta/cotizacion/ua/"+id,data:dataQ});
        }else{
            swal({
                title: "Finalizado",
                text: "Ya finalizo la cotización de esta solicitud",
                icon: "success",
                button: "Entendido",
              });
        }
    }
    useEffect(() => {
        const {data} = props.location;
        async function getQuotitations() {
            try {
                setDataQ(data);
                if(data.statusResponse ==="Finalizado"){
                    setFinalizado(true);
                }
                const result = await getQuotitationList(id);
                setQuotitations(result.Cotizaciones)
                if(result.Cotizaciones.length>2){
                    setFlagCotizar(false);
                }
                console.log(result);
            } catch (error) {
                console.log(error)
            }
        }
        getQuotitations();
    }, []);
 
  
    
    return(
        <>  
        
        <div className="container"  align="left" id="wrapper">
            <div class="row page-titles">
                <div class="col-md-12 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">Solicitudes de adquisicion</li>
                        <li class="breadcrumb-item">Solicitud N&#176; {id}</li>
                        <li class="breadcrumb-item">Cotizaciones</li>
                    </ol>
                </div>
            </div>
            <br></br>
            <div className="form-row">
                
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                      <h4>Cotizaciones
                    </h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div className="col-md-6">
                            <button onClick={abrirSolicitudes} class="btn btn-info" >Solicitudes de cotizacion</button>
                            </div>
                            <div className="col-md-6" style={{textAlign:"end"}}>
                                <button onClick={abrirCuadro} className="btn btn-secondary" disabled={flagCotizar} >
                                Realizar Comparación
                                </button>
                                <button  onClick={agregarCotizacion} className="btn btn-success" style={{marginLeft:"20px"}}>
                                    <PlusCircle className="mb-1"/> Agregar
                                </button>
                            </div>
                       </div>
                       <br></br>
                       <div class="table-responsive">
                            <table class="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th width="5%" scope="col">#</th>
                                        <th width="10%" scope="col">Codigo</th>
                                        <th width="30%" scope="col">Empresa</th>
                                        <th width="20%" scope="col">Items Cotizados</th>
                                        <th width="20%" scope="col">Total en Bs</th>
                                        <th width="15%" scope="col">Ver Cotización</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {quotitations.map((quotitation,index) => {
                                    return(
                                        <tr key={quotitation.idCotizacion}>
                                            <th scope="row">{index+1}</th>
                                            <td>{quotitation.idCotizacion}</td>
                                            <td>{quotitation.Empresa}</td>
                                            <td>{quotitation.ItemsCotizados}</td>
                                            <td>{quotitation.TotalEnBs}</td>
                                            <td><button className="btn btn-primary" id="btn-eye"
                                            onClick={() => {
                                                history.push({pathname:`/verCotizacion/${id}/${quotitation.idCotizacion}`,data:dataQ})
                                            }}><EyeFill/></button></td>
                                        </tr>
                                    );
                                })}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
            <SolicitudesCotizacion id={id} abierto={ abierto } cerrarSolicitudes = {cerrarSolicitudes} />  
        </> 
    )
}

export default Cotizaciones;