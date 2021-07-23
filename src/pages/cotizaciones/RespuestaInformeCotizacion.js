import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getComparativeChart } from '../../services/http/QuotitationService'
import { getReportQuotitation } from '../../services/http/ReportQuotitationService';
import './Cotizaciones.css'
import { ModalHeader } from 'reactstrap';

function RespuestaInformeCotizacion(){

    const {idRe} = useParams();

    const [ items, setItems ] = useState([
            {
                id:0, descripcion:"", amount:0,
                cotizaciones:[]
            }
        ])
    const [reportQuotitation, setReportQuotitation ] = useState({})

    let history = useHistory();

    useEffect(() => {
        async function getComparative() {
            try {
                const report = await getReportQuotitation(idRe)
                setReportQuotitation(report)
                const result = await getComparativeChart(idRe);
                console.log(result)
                setItems(result.comparativeChart)

            } catch (error) {
                console.log(error)
            }
        }
        getComparative();
    }, []);

    const SumaTotal = ( index ) => {
        var suma = 0;
        items.forEach(element => {
            if(element.cotizaciones[index].total!=null){
                suma=suma+element.cotizaciones[index].total;
            }
        });

        return(
            <td>{suma}</td>
        );
    }

    return(
        <>
            <div className="container" align="left" id="wrapper">
                <div class="row page-titles">
                    <div class="col-md-12 align-self-center">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">Solicitudes de adquisicion</li>
                            <li class="breadcrumb-item">Solicitud N&#176; {idRe}</li>
                            <li class="breadcrumb-item">Informe de cotizacion</li>
                        </ol>
                    </div>
                </div> <br></br>
                <div className="form-row">
                    <div className="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h4>Informe de cotizacion
                                <button type="button" className="close" onClick={() => history.goBack()}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                                </h4>
                            </div>
                            <div class="card-body">
                                <div className="row">
                                    <div className="form-group col-md-4" >
                                        <label><strong>Encargado: </strong></label> <label>{reportQuotitation.aplicantName}</label>
                                    </div>
                                    <div className="form-group col-md-4" >
                                        <label><strong>Fecha: </strong></label> <label>{reportQuotitation.dateReport}</label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div dangerouslySetInnerHTML={{ __html: reportQuotitation.description}} style={{margin:"10px"}}/>
                                </div> 
                                
                                <div className="form-row">
                                   <div className="form-group col-md-4" >
                                        <label><strong>Cuadro comparativo de cotizaciones </strong></label> 
                                    </div>
                                   <div class="table-responsive">
                                        <table className="table-sm table-striped">
                                        <thead>
                                            <tr>
                                                <th width="5%" scope="col">#</th>
                                                <th width="35%" scope="col">Producto</th>
                                                <th scope="col">Cantidad</th>
                                                {
                                                    items[0].cotizaciones.map((empresa,index)=>(
                                                        <th scope="col">{empresa.Empresa}</th>
                                                    ))
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                items.map((item,index)=>(
                                                    <tr key={item.id}>
                                                        <th scope="row">{index+1}</th>
                                                        <td >{item.description}</td>
                                                        <td>{item.amount}</td>
                                                        {
                                                            item.cotizaciones.map((cotizacion,i)=>(
                                                                <td key={i}>{cotizacion.total}</td>
                                                            ))
                                                        }
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <th scope="row"></th>
                                                <td>Total</td>
                                                <td></td>
                                                {
                                                    items[0].cotizaciones.map((cotizacion,index)=> SumaTotal(index))
                                                }
                                            </tr>
                                        </tbody>
                                    </table>
                                   </div>
                                </div> <br></br>
                                <div className="form-row">
                                    <div className="col" align="right">
                                        <button className="btn btn-secondary" onClick={() => history.goBack()}>Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RespuestaInformeCotizacion;