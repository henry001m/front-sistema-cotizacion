import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getComparativeChart } from '../../services/http/QuotitationService'
import { getReportQuotitation } from '../../services/http/ReportQuotitationService';
import './Cotizaciones.css'

function RespuestaInformeCotizacion(){

    const {idRe} = useParams();

    const [ empresas, setEmpresas ] = useState([])
    const [ items, setItems ] = useState([
            {
                id:1, descripcion:"barbijos", amount:20,
                cotizaciones:[
                    {empresa:"chicken", total:200},{empresa:"Sensacion", total:350},{empresa:"Keido", total:400}
                ]
            },
            {
                id:2, descripcion:"guantes", amount:25,
                cotizaciones:[
                    {empresa:"chicken", total:100},{empresa:"Sensacion", total:420},{empresa:"Keido", total:null}
                ]
            },
            {
                id:3, descripcion:"lentes", amount:30,
                cotizaciones:[
                    {empresa:"chicken", total:250},{empresa:"Sensacion", total:null},{empresa:"Keido", total:300}
                ]
            },
        ])
    const [reportQuotitation, setReportQuotitation ] = useState({})

    let history = useHistory();

    useEffect(() => {
        console.log("id de items", idRe)
        async function getComparative() {
            try {
                const report = await getReportQuotitation(idRe)
                setReportQuotitation(report)
                const result = await getComparativeChart(idRe);
                console.log(result.comparativeChart)
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
            <div className="container" align="left">
                <div className="row">
                    <div className="col-md-10">
                        <h1>Informe de cotización</h1>   
                    </div>
                    <div className="col-md-2" align="right">
                        <button type="button" className="close" onClick={() => history.goBack()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <br></br>
                <div className="col">
                    <div className="form-register">
                        <div className="form-row">
                            <div className="form-group col-md-6" >
                                <div className="row">
                                    <h5>Encargado: </h5>
                                    <label style={{fontSize:"20px"}}>{reportQuotitation.aplicantName}</label>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="row">
                                    <h5>Fecha: </h5>
                                    <label style={{fontSize:"20px"}}>{reportQuotitation.dateReport}</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-row" id="informe">
                            <div dangerouslySetInnerHTML={{ __html: reportQuotitation.description}} style={{margin:"10px"}}/>
                        </div> 
                        <br></br>
                        <div className="form-row">
                            <h4>Cuadro comparativo de cotizaciones </h4>
                        </div>
                        <br></br>
                        <div className="form-row">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Producto</th>
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
                                                    item.cotizaciones.map((cotizacion,index)=>(
                                                        <td key={index}>{cotizacion.total}</td>
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
                        <div className="form-row">
                            <div className="col" align="right">
                                <button className="btn btn-secondary" onClick={() => history.goBack()}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RespuestaInformeCotizacion;