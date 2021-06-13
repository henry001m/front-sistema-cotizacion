
import React, { useState, useEffect } from 'react'
import { BagPlusFill } from 'react-bootstrap-icons'
import { getQuotitationId } from '../../services/http/QuotitationService';
import { useHistory, useParams } from 'react-router-dom'

function VerCotizacion(){
    
    const {idRe} = useParams();
    const {idCo} = useParams();
    let history = useHistory();
    const [ detalles, setDetalles ] = useState([{amount:"",unitMeasure:"",detalle:"",precUnit:"",precTotal:""}])
    
    useEffect(() => {
        async function getQuotitation() {
            console.log(idRe)
            console.log(idCo)
            const result = await getQuotitationId(idRe, idCo);
            console.log(result)
            setDetalles(result.details)
        }
        getQuotitation();
    }, []);
    
    return(
        <>
            <div className="container" align="left">
                <br></br>
                    <h1> Cotización</h1>
                <br></br>
                <h3>Datos de Cotización</h3>
                <div className="col" style={{marginLeft:"5%", marginRight:"5%"}}>
                    <div className="form-register">
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <h5>Validez de la oferta</h5>
                                    <input className="form-control"></input>
                                </div>
                                <div className="form-group col-md-4">
                                    <h5>Fecha de Cotizacion</h5>
                                    <input className="form-control"></input>
                                </div>      
                            </div>     
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <h5>Tiempo de Entrega</h5>
                                    <input className="form-control"></input>
                                </div>
                                <div className="form-group col-md-4">
                                    <h5>Forma de Pago</h5>
                                    <input className="form-control"></input>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <h3>Detalle por item de Cotización</h3>
                <div className="col" style={{marginLeft:"5%", marginRight:"5%"}}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th width="3%" scope="col">#</th>
                                <th width="11%" scope="col">Cantidad</th>
                                <th width="11%" scope="col">Unidad</th>
                                <th width="43%" scope="col">Detalle</th>
                                <th width="13%" scope="col">Precio Unit.</th>
                                <th width="13%" scope="col">Precio total</th>
                                <th width="6%" scope="col">Oferta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                detalles.map((detalle,index)=>{
                                    return(
                                        <tr key={detalle.id}>
                                            <th scope="row">{index+1}</th>
                                            <td >{detalle.amount}</td>
                                            <td>{detalle.unitMeasure}</td>
                                            <td>{detalle.detalle}</td>
                                            <td>{detalle.precUnit}</td>
                                            <td>{detalle.precTotal}</td>
                                            <td><button className="btn btn-warning" style={{color:"white", backgroundColor:"orange"}}><BagPlusFill/></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-6" style={{marginLeft:"5%", marginRight:"5%"}}>
                    <h4>Observaciones</h4>
                    <textarea type="text" className="form-control"></textarea>
                </div>
                <div className="form-row" >
                    <div className="form-group col" id="toolbar">
                        <button className="btn btn-secondary" id="btnV" onClick={()=>{history.replace(`/cotizaciones/${idRe}`)}}>Cerrar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VerCotizacion;