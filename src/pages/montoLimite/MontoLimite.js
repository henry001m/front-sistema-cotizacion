import React, { useState } from 'react'
import { PlusCircle } from 'bootstrap-icons-react'
import {Button} from 'reactstrap';
import MontoLimiteModal from './MontoLimiteModal'

function MontoLimite() {

    const [ amounts, setAmounts ] = useState([])

    const Amounts = amounts.map((amount,index)=>{
        return(
            <tr key={index}>
                <th scope="row">
                    {index+1}         
                </th>
                <td >
                    {amount.gestion}         
                </td>
                <td >
                    {amount.amountlimite}         
                </td>
                <td >
                    {amount.date}         
                </td>
            </tr>
        );
    });
    const [abierto, setAbierto] = useState(false);
    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }

    return(
        <>
            <div className="container" align="left">
                <br></br>
                <br></br>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-inline">
                                    <strong>Gestion Actual</strong>
                                    <input className="form-control mr-sm-2" style={{width: "100px", marginLeft:"10px"}}></input>
                            </div>
                        </div>
                        <div className="col-6" align="right">
                            <div className="form-inline" align="right">
                                    <strong>Monto Limite Actual</strong>
                                    <input className="form-control mr-sm-2" style={{width: "100px", marginLeft:"10px"}}></input>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-6">
                            
                        </div>
                        <div className="col-6" align="right">
                            <Button type="button" className="btn btn-success my-2 my-sm-0" onClick={abrirModal}> 
                            <PlusCircle  className="mb-1"/> Actualizar Monto </Button>
                        </div>
                    </div>
                    {/* Modal para agregar un nuevo limite */}
                    <MontoLimiteModal abierto={abierto} cerrarModal={cerrarModal}/>
                    <br></br>
                    <div className="form-register">             
                        <div className="form-row">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Gestiones</th>
                                    <th scope="col">Montos limites</th>
                                    <th scope="col">Fecha de actualización</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Amounts}
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </>
    );
};

export default MontoLimite;
