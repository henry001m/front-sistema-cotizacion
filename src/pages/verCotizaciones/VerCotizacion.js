import React, { useState, useEffect } from 'react'
import { BagPlusFill } from 'react-bootstrap-icons'
import { getQuotitationId } from '../../services/http/QuotitationService';
import { useHistory, useParams } from 'react-router-dom'
import ModalVerOferta from './ModalVerOferta'
import { getFileNameDetail } from '../../services/http/FileService';

function VerCotizacion(){
    const {idRe} = useParams();
    const {idCo} = useParams();
    let history = useHistory();
    const [ detalles, setDetalles ] = useState([{amount:"",unitMeasure:"",description:"",unitPrice:"",totalPrice:""}])
    const [ cotizacion, setCotizacion] = useState({offerValidity:"",answerDate:"",deliveryTime:"",paymentMethod:"",observation:""})
    const [ abrirOferta, setAbrirOferta] = useState(false); 
    const [ disabledVerCotizacion, setDisabledVerCotizacion] = useState(false)
    const [ oferta, setOferta ] = useState("");
    const [ file, setFile ] = useState([])
    const cerrarOferta = () => {
        setAbrirOferta( false );
    }
    useEffect(() => {
        async function getQuotitation() {
            try {
                const result = await getQuotitationId(idRe, idCo)
                console.log(result)
                setCotizacion(result.Cotizacion[0])
                var aux = []
                
                for (var i = 1; i < result.Cotizacion.length; i++) {
                    aux.push(result.Cotizacion[i][0]);
                }
                // const fileQuotation = result.Cotizacion;
                // if ( fileQuotation ){
                //     setDisabledVerCotizacion(false)
                // } 
                setDetalles(aux)
            } catch (error) {
                console.log(error)
            }
        }
        getQuotitation();
    }, []);

    const AbrirModalOferta = async(detalle) => {
        try {
            const result = await getFileNameDetail(detalle.idDetail)
            setFile(result)
            setAbrirOferta(true)
            setOferta(detalle)
        } catch (error) {
            console.log(error)
        }
    }
    
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
                                    <input className="form-control" value={ cotizacion.offerValidity}></input>
                                </div>
                                <div className="form-group col-md-4">
                                    <h5>Fecha de Cotizacion</h5>
                                    <input className="form-control" value={ cotizacion.answerDate}></input>
                                </div>      
                            </div>     
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <h5>Tiempo de Entrega</h5>
                                    <input className="form-control" value={ cotizacion.deliveryTime}></input>
                                </div>
                                <div className="form-group col-md-4">
                                    <h5>Forma de Pago</h5>
                                    <input className="form-control" value={ cotizacion.paymentMethod}></input>
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
                                    if(detalle){
                                        return(
                                            <tr key={detalle.id}>
                                                <th scope="row">{index}</th>
                                                <td >{detalle.amount}</td>
                                                <td>{detalle.unitMeasure}</td>
                                                <td>{detalle.description}</td>
                                                <td>{detalle.unitPrice}</td>
                                                <td>{detalle.totalPrice}</td>
                                                <td><button className="btn btn-warning" 
                                                style={{color:"white", backgroundColor:"orange"}}
                                                onClick={()=>AbrirModalOferta(detalle)}
                                                ><BagPlusFill/></button></td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="form-row" >
                    <div className="col-6" style={{marginLeft:"5%", marginRight:"5%"}}>
                        <h4>Observaciones</h4>
                        <textarea type="text" className="form-control" value={ cotizacion.observation}></textarea>
                    </div>
                    {/* <div className="form-group col-md-6" align="end">
                            <button type="button" className="btn btn-secondary"
                                disabled={disabledVerCotizacion}
                                onClick={()=>
                                    {history.push(`/showFile/${idRe}`)}
                                }
                        >Ver Cotizacion</button>
                    </div> */}
                </div>
                <div className="form-row" >
                    <div className="form-group col" id="toolbar">
                        <button className="btn btn-secondary" id="btnV" onClick={()=>{history.replace(`/cotizaciones/${idRe}`)}}>Cerrar</button>
                    </div>
                </div>
            </div>
            <ModalVerOferta 
            abrirOferta={abrirOferta} 
            cerrarOferta={cerrarOferta} 
            oferta={oferta}
            file={file}/>
        </>
    );
}

export default VerCotizacion;