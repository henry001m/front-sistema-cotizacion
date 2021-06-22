
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getComparativeChart} from '../../services/http/QuotitationService'
import Informe from './InformeCotizacion';

function RespuestaInformeCotizacion(){

    const {id} = useParams();
    const [abierto, setAbierto] = useState(false);
    const [ solicitud, setSolicitud ] = useState([]);
    const [nameBusinesses, setNameBusinesses] = useState([]);
    let history = useHistory();
    const back = ()=>{
        history.push("/cotizaciones/"+id);
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

    useEffect(() => {
        async function getComparatives() {
            try {
                const res = await getComparativeChart(id);
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
        <Informe abierto={abierto} cerrarModal={cerrarModal}/>
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
                                                    item.cotizaciones.map((cotizacion,index)=>(
                                                        <td key={index}>{cotizacion.total}</td>
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
                        <button type="submit" className="btn btn-primary ml-4" id="btnEnviar" onClick={abrirModal} >Realizar Informe</button>
                     </div>           
                    </div>
            </div>
        </>
    );
}

export default RespuestaInformeCotizacion;

