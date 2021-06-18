
import React, { useState, useEffect } from 'react'
import { BagPlusFill, Flag } from 'react-bootstrap-icons'
import {getComparative } from '../../services/http/QuotitationService';
import { useHistory, useParams } from 'react-router-dom'
import Informe from '../informe/CrearInforme'
import ListaEmpresa from '../empresa/ListaEmpresa';

function CuadroComparativo(e){
    let history = useHistory()
    const [abierto, setAbierto] = useState(false);
    const [empresa, setEmpresa]  = useState([{nombre:["Ositos ", "marcos", "No"], nombre2:"None "}]);
    const [listaCoti, setListaCoti] = useState([])
    const [flag, setFlag] = useState(false);

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
                const response = await getComparative(6);
                setListaCoti(response.comparativeChart);
               console.log(response)
                
            } catch (error) {
                console.log(error);
            }
            };
            listQuotation();
    }, []);
    console.log(listaCoti)
    return(
        <>
        <div className="container" align="left" style={{marginBottom:"100px"}} >
           
        <div className="form-register">  
        <h1>Cuadro Comparativo</h1>
        <div className="form-row">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th  scope="col">#</th>
                                <th  scope="col">Descripción</th>
                                <th  scope="col">Cantidad</th>
                                <th  scope="col">
                                    Emp1
                                </th>
                                <th  scope="col">
                                    Emp2
                                </th>
                                <th  scope="col">
                                    Emp3
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                                {listaCoti.map((lista, idx) => (
                                    <tr key={lista.id}>
                                        <td scope="row">{idx+1}</td>
                                        <td>{lista.description}</td>
                                        <td>{lista.amount}</td>
                                        <td>{lista.id}</td>
                                        
                                    </tr> 
                                ))}
                                    
                        </tbody>
                        <tfoot>
                            <tr>
                                <th  scope="col"></th>
                                <th  scope="col">Total</th>
                                <th  scope="col">60</th>
                                <th  scope="col">50</th>
                                <th  scope="col">60</th>
                            </tr>
                        </tfoot>
                    </table>
                    </div>
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

export default CuadroComparativo;