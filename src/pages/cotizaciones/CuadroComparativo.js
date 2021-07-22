import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getComparativeChart} from '../../services/http/QuotitationService'
import InformeCotizacion from '../cotizaciones/InformeCotizacion'
import { getReportQuotitation } from '../../services/http/ReportQuotitationService'
import swal from 'sweetalert';
function RespuestaInformeCotizacion(props){

    const {id} = useParams();
    const [ solicitud, setSolicitud ] = useState([]);
    const [nameBusinesses, setNameBusinesses] = useState([]);
    const [abiertoInformeCotizacion, setAbiertoInformeCotizacion] = useState(false);
    const [ reportQuotitation, setReportQuotitation ] = useState(null)
    const [ valorMenor, setValorMenor ] = useState([])
    const [dataQu, setDataQu] = useState({});
    const [informeEnviado, setinformeEnviado] = useState(false);

    let history = useHistory();
    const back = ()=>{
        if(informeEnviado){
            dataQu.statusResponse = "Finalizado";
        }
        history.push({pathname:`/cotizaciones/${id}`,data:dataQu});
    }

    const SumaTotal = ( index ) => {
        var suma = 0;
        solicitud.forEach(element => {
            if(element.cotizaciones[index].total!=null){
                suma=suma+element.cotizaciones[index].total;
            }
        });
        return(
            <th>{suma}</th>
        );
    }

    const Menor = (solicitudes) => {
        var aux = valorMenor
        solicitudes.forEach(element => {
            var auxMenor = element.cotizaciones[0].total
            element.cotizaciones.forEach(cotizacion => {
                if(cotizacion.total<auxMenor && cotizacion.total!=null){
                    auxMenor=cotizacion.total
                }
            });
            aux.push(auxMenor)
        });
        setValorMenor(aux)
    }
    const abrirModalInformeCotizacion =()=>{
        if(reportQuotitation!=" "){
            swal({
                text: "Ya realizo informe de respuesta a esta solicitud",
                icon: "warning",
                button: "Ok",
              });
        }else{
            getInformeQuotitation(id)
            setAbiertoInformeCotizacion(true);
        }
    }

    const cerrarModalInformeCotizacion=()=>{
        setReportQuotitation(null)
        setAbiertoInformeCotizacion(false);
    }

    async function getInformeQuotitation(id) {
        try {
            const result = await getReportQuotitation(id);
            if(result){
                setReportQuotitation(result);
            }else{
                setReportQuotitation(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const {data} = props.location;
        async function getComparatives() {
            try {
                setDataQu(data)
                const res = await getComparativeChart(id);
                Menor(res.comparativeChart)
                setSolicitud(res.comparativeChart)
                setNameBusinesses(res.businesses)
            } catch (error) {
                console.log(error)
            }
        }
        getComparatives();
    }, []);

    return(
        <>
            <div className="container" align="left">
            <div class="row page-titles">
                <div class="col-md-12 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">Solicitudes de adquisicion</li>
                        <li class="breadcrumb-item">Solicitud N&#176; {id}</li>
                        <li class="breadcrumb-item">Cotizaciones</li>
                        <li class="breadcrumb-item">Cuadro comparativo</li>
                    </ol>
                </div>
            </div>
            <br></br>
                <div className="form-row">
                    <div className="col-md-12">
                        <div class="card"> 
                           <div class="card-header">
                                <h4>Cuadro comparativo de cotizaciones
                                <button type="button" className="close" onClick={() =>  history.push({pathname:`/cotizaciones/${id}`,data:dataQu})}>
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </h4>
                           </div>
                           <br></br>
                           <div class="body">
                                <div class="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr className="table-active">
                                            <th width="5%" scope="col">#</th>
                                            <th width="40%" scope="col">Producto</th>
                                            <th width="10%" scope="col">Cantidad</th>
                                            {
                                                nameBusinesses.map((name,index)=>(
                                                    <th scope="col">{name}</th>
                                                ))
                                            }
                                            {/* <th scope="col">Precio Menor</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            solicitud.map((item,index)=>(
                                                <tr key={item.id}>
                                                    <th scope="row">{index+1}</th>
                                                    <td >{item.description}</td>
                                                    <td>{item.amount}</td>
                                                    {
                                                        item.cotizaciones.map((cotizacion,i)=>(
                                                            (cotizacion.total==valorMenor[index])?
                                                                (<td key={i}><strong>{cotizacion.total}</strong></td>):
                                                                (<td key={i}>{cotizacion.total}</td>)
                                                        ))
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th scope="row"></th>
                                            <th>Total</th>
                                            <th></th>
                                            {
                                                nameBusinesses.map((cotizacion,index)=> SumaTotal(index))
                                            }
                                        </tr>

                                    </tfoot>
                                </table>
                            </div>
                           </div>
                           <div className="form-row" >
                                <div className="form-group col" id="toolbar">
                                    <button className="btn btn-secondary" onClick={back}  id="btnV">Volver Atrás</button>
                                    <button type="submit" className="btn btn-primary ml-4" id="btnEnviar" onClick={abrirModalInformeCotizacion} >Realizar Informe</button>
                                </div>           
                            </div>
                        </div>   
                    </div>
                </div>
                <br></br>
                <InformeCotizacion
                    id={id}
                    abierto={abiertoInformeCotizacion} 
                    cerrarModal={cerrarModalInformeCotizacion}
                    report={reportQuotitation}
                    setinformeEnviado={setinformeEnviado}
                />
            </div>
        </>
    );
}

export default RespuestaInformeCotizacion;

