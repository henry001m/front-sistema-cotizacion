
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getComparative} from '../../services/http/QuotitationService'
import Informe from '../informe/CrearInforme'

function RespuestaInformeCotizacion(){

    const {id} = useParams();
    const [abierto, setAbierto] = useState(false);
    const [ solicitud, setSolicitud ] = useState([
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
        const back = ()=>{
        history.push("/cotizaciones");
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


  /*   var precioMin = precios[0];
    for (var i = 0; i < precios.length ; i++) {
        if (precios[i] < precioMin) {
            console.log( precios[i]);
            precioMin = precios[i];
        }
    } */
    
        useEffect(() => {
        
            async function getComparatives() {
                try {
                    const res = await getComparative(id);
                    console.log(res.comparativeChart)
                    setSolicitud(res.comparativeChart)
                    console.log("Cotizaciones:",res)
    
                } catch (error) {
                    console.log(error)
                }
            }
            getComparatives();
        }, []);

        return(
            <th>{suma}</th>
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
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Cantidad</th>
                                        {
                                            solicitud[0].cotizaciones.map((empresa,index)=>(
                                                <th scope="col">{empresa.Empresa}</th>
                                            ))
                                        }
                                        <th scope="col">Precio Menor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        solicitud.map((item,index)=>(
                                            <tr key={item.id}>
                                                <th scope="row">{index+1}</th>
                                                <td >{item.descripcion}</td>
                                                <td>{item.amount}</td>
                                                {
                                                    item.cotizaciones.map((cotizacion,index)=>(
                                                        <td key={index}>{cotizacion.total}</td>
                                                    ))
                                                }

                                                {   
                                                    ValorMenor(item.cotizaciones)
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
                                            solicitud[0].cotizaciones.map((cotizacion,index)=> SumaTotal(index))
                                        }
                                        <th></th>
                                    </tr>

                                </tfoot>
                            </table>
                        </div>
                       
                    </div>
                </div>
                <div className="form-row" >
                     <div className="form-group col" id="toolbar">
                        <button className="btn btn-secondary" onClick={back}  id="btnV">Volver Atrás</button>
                        <button type="submit" className="btn btn-primary ml-4" id="btnEnviar" onClick={abrirModal} >Realizar Informe</button>
                     </div>           
                    </div>
            </div>
        </>
    );
}

export default RespuestaInformeCotizacion;

