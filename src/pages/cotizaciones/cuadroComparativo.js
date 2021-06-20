
import React, { useState, useEffect } from 'react'
import { BagPlusFill, Flag } from 'react-bootstrap-icons'
import {getComparative } from '../../services/http/QuotitationService';
import { useHistory, useParams } from 'react-router-dom'
import Informe from '../informe/CrearInforme'
import ListaEmpresa from '../empresa/ListaEmpresa';

function CuadroComparativo(e){
    let history = useHistory()
    const [abierto, setAbierto] = useState(false);
    const [emp, setEmp]=useState(["dumbo", "Kin", "Jom"])
    const [data, setData]=([[{amount: 2,
                            description: "PC Lenovo Think Centre Modelo M720 Core I5-8400 de 1T 2g TWR DOS",
                            id: 15,
                           empresa:[{id: 1, nombrEmp: "dumbo", precio: 34}, {id:2, nombrEmp: "Kin", precio: 102},{id: 3, nombrEmp: "Jom", precio: 34}]
                            },

                            {amount: 2,
                            description: "Machine learning y Deep learning, autor Jesus Bobadilla",
                            id: 16,
                            empresa:[{id: 1, nombrEmp: "dumbo", precio: 43}, {id:2, nombrEmp: "Kin", precio:210},{id: 3, nombrEmp: "Jom", precio: "*"}]
                            },

                            {amount: 3,
                             description: "libro Internet de las cosas, autor Manel Lopez",
                            id: 17,
                            empresa:[{id: 1, nombrEmp: "dumbo", precio: 60}, {id:2, nombrEmp: "Kin", precio: 90}, {id: 3, nombrEmp: "Jom", precio: "*"}]

                            }]])
    
    const [listaCoti, setListaCoti] = useState([])


 

    const back = ()=>{
        history.push("/cotizaciones");
    }

    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }

    let arrayData=Object.entries(data)
    let dato1 = arrayData[0][1]
    console.log(dato1)

    let arrayData2=Object.entries(dato1)
    let subdata1 = arrayData2[3][1]

    let subArrayData = Object.entries(subdata1)
    let subsubData = subArrayData[1]
    /* console.log(subArrayData[0]) */
    let eKin = Object.entries(subsubData)
/*     console.log(eKin[1][1])
 */    let kin= eKin[1][1]
    let precio = Object.entries(kin)
   /*  console.log(precio[2]) */

    for(const property in data){
        console.log(data[property]);
    }
    console.log(data.empresa)



        /* for(var i =0; i<data.length; i++){
            let myArr=Object.entries(data[i])

            console.log(myArr)
        }
    */
    useEffect(()=>{
        const listQuotation = async () => {
            try {
                const response = await getComparative(6);
                setListaCoti(response.comparativeChart);
                /* console.log(response.comparativeChart) */
                
            } catch (error) {
                console.log(error);
            }
            };
            listQuotation();
    }, []);
   
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
                                {
                                       emp.map((e, i)=>(
                                           <th key={e.id}>  
                                                    {e}
                                           </th>
                                       ))
                                   }
                                
                            </tr>
                        </thead>
                        <tbody>
                                {data.map((lista, idx) => (
                                    
                                  <tr key={lista.id}>
                                      <th scope="row">{idx+1}</th>
                                      <td>{lista.description}</td>
                                      <td>{lista.amount}</td>
                                                {lista.empresa.map((e, i)=>(   
                                                    <td>{e.precio}</td>
                                      ))}
                                     
                                  </tr>  
                                ))}
                                    
                        </tbody>
                        <tfoot>
                            <tr>
                                <th  scope="col"></th>
                                <th  scope="col">Total</th>
                                <th  scope="col"></th>
                                <th  scope="col">50</th>
                                <th  scope="col">60</th>
                                <th  scope="col">8</th>
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