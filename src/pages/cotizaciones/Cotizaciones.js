import React, { useState } from 'react'
import { EyeFill, PlusCircle } from 'bootstrap-icons-react'
import { useHistory } from 'react-router-dom'

function Cotizaciones() { 

    const [ quotitations, setQuotitations ] = useState([{id:1, bussiness:"dumbo", items:4,total:450}])
    let history = useHistory()
    return(
        <>
            <div className="container" align="left" style={{marginBottom:"100px"}}>
                        <br></br>
                        <h1>Cotizaciones</h1>
                        <br></br>
                    <div className="col" style={{textAlign:"end"}}>
                        <button className="btn btn-secondary">
                            Realizar Comparación
                        </button>
                        <button className="btn btn-success" style={{marginLeft:"20px"}}>
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
                                        <tr key={quotitation.id}>
                                            <th scope="row">{index+1}</th>
                                            <td >{index+1}</td>
                                            <td>{quotitation.bussiness}</td>
                                            <td>{quotitation.items}</td>
                                            <td>{quotitation.total}</td>
                                            <td><button className="btn btn-primary" onClick={() => history.push(`/verCotizacion/${quotitation.id}`)}><EyeFill/></button></td>
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