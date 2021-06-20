import React, { useState } from 'react'

function RespuestaInformeCotizacion(){

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
            <td>{menor}</td>
        )
    }

    const SumaTotal = ( index ) => {
        var suma = 0;
        solicitud.items.forEach(element => {
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
                    <div className="col-md-6">
                        <h1>Informe de cotización</h1>   
                    </div>
                    <div className="col-md-6" align="right">
                        <button type="button" className="close" onClick={ closePage }>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <br></br>
                <div className="col">
                    <div className="form-register">
                        <div className="form-row">
                            <div className="form-group col-md-6" >
                                <h5>Encargado: </h5>
                                <label>Nombre</label>
                            </div>
                            <div className="form-group col-md-6">
                                <h5>Fecha: </h5>
                                <label> fecha</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <textarea value="valor"></textarea>
                        </div>
                        <div className="form-row">
                            <h5>Cuadro comparativo de cotizaciones </h5>
                        </div>
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
                                    <tr>
                                        <th scope="row"></th>
                                        <td>Total</td>
                                        <td></td>
                                        {
                                            solicitud.items[0].cotizaciones.map((cotizacion,index)=> SumaTotal(index))
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RespuestaInformeCotizacion;