import React,{useState,useEffect} from 'react'
import RegistroUnidadGastoModal from './RegistroUnidad'
import {Button} from 'reactstrap';
import {PlusCircle} from 'bootstrap-icons-react';
import {getUnidadesGastos} from '../../services/http/UniGastoService'

const MainRegistroUnidad = () => {
    const [abierto, setAbierto] = useState(false);
    const [unidadesGasto, setUnidadesGasto] = useState([]);
    const [flag, setFlag] = useState(false);
    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }
    const updateGastos = ()=>{
        setFlag(!flag);
    }
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getUnidadesGastos();
            console.log(response.spending_units)
            setUnidadesGasto(response.spending_units);
        } catch (error) {
            console.log(error);
        }
        };

        fetchData();
    }, [setUnidadesGasto,flag]);
    return (
        <>
            <div className="container" align="left">
                <br></br>
                <h1>Unidades de Gasto</h1>
                <br></br>
                <div className="row">
                    <div className="col-6">
                        <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        </form>
                    </div>
                    <div className="col-6" align="right">
                    {/*  Botom para abrir el modal*/}
                    <Button color="success" onClick={abrirModal}><PlusCircle className="mr-1"/>Nuevo</Button>
                    </div>
                </div>
                {/* Modal de registro de undiad de gasto */}
                <RegistroUnidadGastoModal abierto={abierto} cerrarModal={cerrarModal} updateGastos={updateGastos}/>
                <br></br>
                <div className="form-register">             
                    <div className="form-row">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Facultad</th>
                                    <th scope="col">Unidad Administrativa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    unidadesGasto.map((gasto,index)=>{
                                        return(
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{gasto.nameUnidadGasto}</td>
                                                <td>{gasto.faculty.nameFacultad}</td>
                                                <td>{gasto.administrativeUnit.name}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainRegistroUnidad