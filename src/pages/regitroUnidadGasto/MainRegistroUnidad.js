import React,{useState} from 'react'
import RegistroUnidadGastoModal from './RegistroUnidad'
import {Button} from 'reactstrap';


const MainRegistroUnidad = () => {
    const [abierto, setAbierto] = useState(false);
    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }
    return (
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
            <Button color="success" onClick={abrirModal}>Modal-UnidadGasto</Button>
            </div>
        </div>
        {/* Modal de registro de undiad de gasto */}
        <RegistroUnidadGastoModal abierto={abierto} cerrarModal={cerrarModal}/>
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
                    
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default MainRegistroUnidad
