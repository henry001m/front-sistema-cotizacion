import React, { useState, useEffect } from 'react'
import { BagPlusFill, FileEarmarkArrowUpFill, FileEarmarkFill } from 'react-bootstrap-icons'
import { getQuotitationId } from '../../services/http/QuotitationService';
import { useHistory, useParams } from 'react-router-dom'
import ModalVerOferta from './ModalVerOferta'
import { getFileNameDetail, getFileNameQuotitation } from '../../services/http/FileService';
import { ModalHeader } from 'reactstrap';
function VerCotizacion(props){
    const {idRe} = useParams();
    const {idCo} = useParams();
    let history = useHistory();
    const [ detalles, setDetalles ] = useState([])
    const [ cotizacion, setCotizacion] = useState({offerValidity:"",answerDate:"",deliveryTime:"",paymentMethod:"",observation:""})
    const [ abrirOferta, setAbrirOferta] = useState(false); 
    const [ verCotizacion, setVerCotizacion] = useState(false)
    const [ nameFile, setNameFile ] = useState("")
    const [ oferta, setOferta ] = useState("");
    const [dataQ, setDataQ] = useState({});
    const [ files, setFiles ] = useState([])
    const cerrarOferta = () => {
        setAbrirOferta( false );
    }
    const cerrarVerCotizacion = ()=>{
        history.push({pathname:`/cotizaciones/${idRe}`,data:dataQ})
    }
    useEffect(() => {
        const {data} = props.location;
        async function getQuotitation() {
            try {
                setDataQ(data);
                const result = await getQuotitationId(idRe, idCo)
                setCotizacion(result.Cotizacion[0])
                var aux = []
                var files = []
                
                for (var i = 1; i < result.Cotizacion.length; i++) {
                    aux.push(result.Cotizacion[i][0]);
                    const res = await getFileNameDetail(result.Cotizacion[i][0].idDetail)
                    files.push(res[0]);
                }
                const fileQuotation = await getFileNameQuotitation(idCo);
                if ( fileQuotation.length>0 ){
                    setVerCotizacion(true)
                    setNameFile(fileQuotation[0])
                }
                setDetalles(aux)
                setFiles(files)
                console.log(files)
            } catch (error) {
                console.log(error)
            }
        }
        getQuotitation();
    }, []);
    return(
        <>
            <div className="container" align="left">
                <div class="row page-titles">
                    <div class="col-md-12 align-self-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">Solicitudes de adquisicion</li>
                            <li class="breadcrumb-item">Solicitud N&#176; {idRe}</li>
                            <li class="breadcrumb-item">Cotizaciones</li>
                            <li class="breadcrumb-item">Cotizacion N&#176; {idCo}</li>
                        </ol>
                    </div> 
                </div><br></br>
                <div className="form-row">
                    <div className="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h4>Cotizacion N&#176; {idCo}
                                <button type="button" className="close" onClick={()=>{cerrarVerCotizacion();}}>
                                <span aria-hidden="true">&times;</span>
                                </button></h4>
                            </div>
                            <div class="card-body">
                                <div className="form-register">
                                    <ModalHeader>Datos de cotizacion</ModalHeader><br></br>
                                    <div className="col">
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label><strong>Fecha de Cotizacion: </strong></label> <label>{cotizacion.answerDate}</label>
                                        </div>    
                                        <div className="form-group col-md-3">
                                            <label><strong>Validez de la oferta: </strong></label> <label>{cotizacion.offerValidity}</label>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label><strong>Tiempo de Entrega: </strong></label> <label>{cotizacion.deliveryTime}</label>
                                        </div>
                                        <div className="form-group col-md-3">
                                           <label><strong>Forma de Pago: </strong></label> <label>{cotizacion.paymentMethod}</label>
                                        </div>
                                    </div>  
                                    </div>  
                                    <ModalHeader>Detalle por item</ModalHeader><br></br>
                                    <div class="col">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th width="3%" scope="col">#</th>
                                                <th width="8%" scope="col">Cant.</th>
                                                <th width="8%" scope="col">Unidad</th>
                                                <th width="22%" scope="col">Detalle</th>
                                                <th width="11%" scope="col">Precio Unit.</th>
                                                <th width="11%" scope="col">Precio total</th>
                                                <th width="23%" scope="col">Oferta</th>
                                                <th width="16%" scope="col">Archivo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                detalles.map((detalle,index)=>{
                                                    if(detalle){
                                                        return(
                                                            <tr key={detalle.id}>
                                                                <th scope="row">{index+1}</th>
                                                                <td >{detalle.amount}</td>
                                                                <td>{detalle.unitMeasure}</td>
                                                                <td>{detalle.description}</td>
                                                                <td>{detalle.unitPrice}</td>
                                                                <td>{detalle.totalPrice}</td>
                                                                <td>Marca: {detalle.brand} <br></br>Modelo: {detalle.model}<br></br>Industria: {detalle.industry}<br></br> Tiempo de Garantia: {detalle.warrantyTime}</td>
                                                                <td>
                                                                { (files[index])?
                                                                (<a
                                                                href={`/showFileQuotitationDetail/${1}/${files[index]}`} 
                                                                className="btn btn-secondary sm" target="_blank"
                                                                ><FileEarmarkFill className="mb-1"/>Ver archivo</a>):
                                                                (<button className="btn btn-secondary sm" disabled><FileEarmarkFill className="mb-1"/>Ver archivo</button>)
                                                                }
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>   
                                </div>
                                <div className="col">
                                    <div className="form-row" >
                                        <div className="form-group col-md-6">
                                            <label><strong>Observaciones:</strong></label>
                                            <textarea type="text" className="form-control" value={ cotizacion.observation}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                <div className="form-row" >
                                    <div className="form-group col-md-6">
                                        {(verCotizacion) && 
                                            (<a href={`/showFileQuotitationDetail/${2}/${nameFile}`} className="btn btn-secondary sm" target="_blank"><FileEarmarkFill className="mb-1"/> Ver archivo</a>)
                                        }
                                    </div>
                                    <div className="form-group col-md-6" id="toolbar">
                                        <button className="btn btn-secondary" id="btnV" onClick={()=>{cerrarVerCotizacion();}}>Cerrar</button>
                                    </div>
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div><br></br>
        </>
    );
}

export default VerCotizacion;