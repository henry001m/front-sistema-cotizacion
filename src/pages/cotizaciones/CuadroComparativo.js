
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getComparativeChart} from '../../services/http/QuotitationService'
import InformeCotizacion from '../cotizaciones/InformeCotizacion'
import { getReportQuotitation } from '../../services/http/ReportQuotitationService'

function RespuestaInformeCotizacion(props){

    const {id} = useParams();
    const [abierto, setAbierto] = useState(false);
    const [ solicitud, setSolicitud ] = useState([]);
    const [nameBusinesses, setNameBusinesses] = useState([]);
    const [abiertoInformeCotizacion, setAbiertoInformeCotizacion] = useState(false);
    const [ reportQuotitation, setReportQuotitation ] = useState(null)
    const [ valorMenor, setValorMenor ] = useState([])
    const [dataQu, setDataQu] = useState({});

    let history = useHistory();
    const back = ()=>{
        history.push({pathname:`/cotizaciones/${id}`,data:dataQu});
    }

    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }

    const ValorMenor = ( lista ) => {

        var menor = lista[0].total;

        lista.forEach(element => {
            if(element.total<menor && element.total!=null){
                menor = element.total;
            }
        });
        
        return(
            <th>{menor}</th>
        )
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

    const Suma = ( solicitudes ) => {
        var suma = 0;
        for (var i=0; i<solicitudes.length; i++){
            solicitud.forEach(element => {
                if(element.cotizaciones[i].total!=null){
                    suma=suma+element.cotizaciones[i].total;
                }
            });
        }
        return(
            <th>{suma}</th>
        );
    }

    useEffect(() => {
        const {data} = props.location;
        async function getComparatives() {
            try {
                setDataQu(data)
                const res = await getComparativeChart(id);
                Menor(res.comparativeChart)
                setSolicitud(res.comparativeChart)
                console.log("solicitudes", res)
                setNameBusinesses(res.businesses)
            } catch (error) {
                console.log(error)
            }
        }
        getComparatives();
    }, []);

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
        getInformeQuotitation(id)
        setAbiertoInformeCotizacion(true);
    }

    const cerrarModalInformeCotizacion=()=>{
        setReportQuotitation(null)
        setAbiertoInformeCotizacion(false);
    }

    async function getInformeQuotitation(id) {
        console.log("id",id)
        try {
            const result = await getReportQuotitation(id);
            console.log(result)
            if(result){
                setReportQuotitation(result);
            }else{
                setReportQuotitation(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <div className="container" align="left">
                <div className="row">
                    <div className="col-md-10">
                        <h1>Cuadro Comparativo de Cotizaciones</h1>   
                    </div>
                    <div className="col-md-2" align="right">
                        <button type="button" className="close" onClick={() =>  history.push({pathname:`/cotizaciones/${id}`,data:dataQu})}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <br></br>
                <div className="col">
                    <div className="form-register">
                        <div className="form-row">
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
                                                <th scope="row">{index}</th>
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
                </div>
                <div className="form-row" >
                     <div className="form-group col" id="toolbar">
                        <button className="btn btn-secondary" onClick={back}  id="btnV">Volver Atrás</button>
                        <button type="submit" className="btn btn-primary ml-4" id="btnEnviar" onClick={abrirModalInformeCotizacion} >Realizar Informe</button>
                     </div>           
                </div>
                <InformeCotizacion
                    id={id}
                    abierto={abiertoInformeCotizacion} 
                    cerrarModal={cerrarModalInformeCotizacion}
                    report={reportQuotitation}
                />
            </div>
        </>
    );
}

export default RespuestaInformeCotizacion;

