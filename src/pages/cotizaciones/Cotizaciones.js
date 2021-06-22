import React, { useEffect, useState } from 'react'
import { EyeFill, PlusCircle } from 'react-bootstrap-icons'
import { useHistory, useParams } from 'react-router-dom'
import { getQuotitationList } from '../../services/http/QuotitationService';

function Cotizaciones() { 

    const {id} = useParams();
    const [ quotitations, setQuotitations ] = useState([]);
    const [abierto, setAbierto] = useState(false);
    let history = useHistory()

    const abrirCuadro = ()=>{
        history.push("/cuadro/"+id);
    }

    const agregarCotizacion = () =>{
        history.push("/respuesta/cotizacion/ua/"+id);
    }
    useEffect(() => {
        async function getQuotitations() {
            try {
                const result = await getQuotitationList(id);
                console.log("id de solicitud", id)
                setQuotitations(result.Cotizaciones)
            } catch (error) {
                console.log(error)
            }
        }
        getQuotitations();
    }, []);
 
  
    
    return(
        <>
            <div className="container" align="left" style={{marginBottom:"100px"}}>
                        <br></br>
                        <h1>Cotizaciones</h1>
                        <br></br>
                    <div className="col" style={{textAlign:"end"}}>
                        <button className="btn btn-secondary" onClick={abrirCuadro} >
                          Realizar Comparación
                        </button>
                        
                        <button  onClick={agregarCotizacion} className="btn btn-success" style={{marginLeft:"20px"}}>
                            <PlusCircle className="mb-1"/> Agregar
                        </button>
                    </div>
                    <br></br>
                    <div className="form-register">             
                        <div className="form-row">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"> </th>
                                        <th scope="col">#</th>
                                        <th scope="col">Empresa</th>
                                        <th scope="col">Items Cotizados</th>
                                        <th scope="col">Total en Bs</th>
                                        <th scope="col">Ver Cotización</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {quotitations.map((quotitation,index) => {
                                    return(
                                        <tr key={quotitation.idCotizacion}>
                                            <th scope="row">{index+1}</th>
                                            <td >{index+1}</td>
                                            <td>{quotitation.Empresa}</td>
                                            <td>{quotitation.ItemsCotizados}</td>
                                            <td>{quotitation.TotalEnBs}</td>
                                            <td><button className="btn btn-primary" 
                                            onClick={() => {
                                                history.push(`/verCotizacion/${id}/${quotitation.idCotizacion}`)
                                                console.log("este es el ID",quotitation.idCotizacion)
                                            }}><EyeFill/></button></td>
                                        </tr>
                                    );
                                })}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </> 
    )
}

export default Cotizaciones;