import React, { useState,useEffect } from 'react'
import { PlusCircle } from 'bootstrap-icons-react'
import {Button} from 'reactstrap';
import MontoLimiteModal from './MontoLimiteModal';
import NavAdministrador from '../../components/navAdministrador/NavAdministrador'
import {getMontoLomite} from '../../services/http/MontoLimiteService'

function MontoLimite() {

    const [limiteAmouts, setLimiteAmouts] = useState([]);
    const [flag, setFlag] = useState(false);
    const [final, setFinal] = useState({})
    const updateLimitAmout = ()=>{
        setFlag(!flag);
    }
    const Amounts = limiteAmouts.map((amount,index)=>{
        return(
            <tr key={amount.id}>
                <th scope="row">
                    {index+1}         
                </th>
                <td >
                    {amount.steps}         
                </td>
                <td >
                    {amount.monto}         
                </td>
                <td >
                    {amount.dateStamp}         
                </td>
            </tr>
        );
    });
    const sacarUltimo = ()=>{
        var fin = limiteAmouts.length;
        console.log(limiteAmouts.length)
        setFinal(limiteAmouts[fin-1]);
    }
    const [abierto, setAbierto] = useState(false);
    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getMontoLomite();
            console.log(response.limit_amout)
            setFinal(response.limit_amout[response.limit_amout.length-1]);
            console.log(response.limit_amout[response.limit_amout.length-1])
            setLimiteAmouts(response.limit_amout);
        } catch (error) {
            console.log(error);
        }
        };
        fetchData();
    }, [setLimiteAmouts,flag]);

    return(
        <>
            <NavAdministrador/>
            <div className="container" align="left">
                <br></br>
                <br></br>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-inline">
                                    <strong>Gestion Actual</strong>
                                    <input value="2021" className="form-control mr-sm-2" style={{width: "100px", marginLeft:"10px"}} readonly></input>
                            </div>
                        </div>
                        <div className="col-6" align="right">
                            <div className="form-inline" align="right">
                                    <strong>Monto Limite Actual</strong>
                                    <input value={final.monto} className="form-control mr-sm-2" style={{width: "100px", marginLeft:"10px"}} readonly></input>
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
                    <MontoLimiteModal abierto={abierto} cerrarModal={cerrarModal} updateLimitAmout={updateLimitAmout}/>
                    <br></br>
                    <div className="form-register">             
                        <div className="form-row">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Gestiones</th>
                                    <th scope="col">Montos limites</th>
                                    <th scope="col">Fecha de actualizaci??n</th>
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
