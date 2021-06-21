

import React, { useState, useEffect } from 'react'
import { BagPlusFill, Flag } from 'react-bootstrap-icons'
import {getComparative } from '../../services/http/QuotitationService';
import { useHistory, useParams } from 'react-router-dom'
import Informe from '../informe/CrearInforme'
import ListaEmpresa from '../empresa/ListaEmpresa';

function RespuestaInformeCotizacion(){
    let history = useHistory()
    const [abierto, setAbierto] = useState(false);
    const [ solicitud, setSolicitud ] = useState({
        items:[
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
        ]
    })

    const [cotizados, setCotizados] = useState([]);

    const back = ()=>{
        history.push("/cotizaciones");
    }

    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }

    useEffect(()=>{
        const listQuotation = async () => {
            try {
                const response = await getComparative(3);
                setCotizados(response.comparativeChart);
               console.log(response) 
                
            } catch (error) {
                console.log(error);
            }
            };
            listQuotation();
    }, []);

    console.log(solicitud)

    const closePage = () => {

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

/*     var numeros = [ 67, 6, 23, 11, 100, 8, 3, 93, 0, 17, 24, 7, -2, 33, 45, 28, 33, 23, -12, 99, 100 ];
    var min = numeros[0];
    for (var i = 0; i < numeros.length ; i++) {
        if (numeros[i] < min) {
            console.log('Anterior minimo: ' + min + ', nuevo minimo: ' + numeros[i]);
            min = numeros[i];
        }
    }
    console.log('Valor mínimo: ' + min); */

    const SumaTotal = ( index ) => {
        var suma = 0;
        var aux;
            solicitud .items.forEach(element => {
            if(element.cotizaciones[index].total!=null){
                
                suma=suma+element.cotizaciones[index].total;

                console.log(suma)
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
                    <div className="col-md-6">
                        <h1>Cuadro Comparativo</h1>   
                    </div>
                    <div className="col-md-6" align="right">
                        <button type="button" className="close" onClick={ closePage }>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
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
                                            solicitud.items[0].cotizaciones.map((empresa,index)=>(
                                                <th scope="col">{empresa.empresa}</th>
                                            ))
                                        }
                                        <th scope="col">Precio mas bajo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        solicitud.items.map((item,index)=>(
                                            <tr key={item.id}>
                                                <th scope="row">{index+1}</th>
                                                <td >{item.descripcion}</td>
                                                <td className="text-lg font-bold">{item.amount}</td>
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
                                            solicitud.items[0].cotizaciones.map((cotizacion,index)=> SumaTotal(index))
                                        }
                                        <th></th>
                                    </tr>

                                </tfoot>
                            </table>
                        </div>
                        <div className="form-row" >
                     <div className="form-group col" id="toolbar">
                        <button className="btn btn-secondary" onClick={back}  id="btnV">Volver Atrás</button>
                        <button type="submit" className="btn btn-primary ml-4" id="btnEnviar" onClick={abrirModal} >Realizar Informe</button>
                     </div>           
                    </div>
                    <Informe abierto={abierto}  cerrarModal={cerrarModal}/>
        
                    </div> 
            
        </>
    );
}

export default RespuestaInformeCotizacion;







