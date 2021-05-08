import React,{useState,useEffect} from 'react'
import {Button} from 'reactstrap';
import NavSuperusuario from '../../components/navSuperusuario/NavSuperusuario'
import {PlusCircle} from 'bootstrap-icons-react';
import {getUnidadesGastos} from '../../services/http/UniGastoService'

function ListaEmpresa(){
    const [abierto, setAbierto] = useState(false);
    const [empresas, setEmpresas] = useState([]);
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
            {/*consulta para cargar la lista de empresas template
                const response = await getEmpresas();
            console.log(response.spending_units)
            setEmpresas(response.spending_units);*/}
        } catch (error) {
            //console.log(error);
        }
        };

        fetchData();
    }, [setEmpresas,flag]);
    return (
        <>
            <NavSuperusuario/>
            <div className="container" align="left">
                <br></br>
                <h1>Empresas</h1>
                <br></br>
                <div className="row">
                    <div className="col-6">
                        <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        </form>
                    </div>
                    <div className="col-6" align="right">
                    {/*  Boton para abrir el modal*/}
                    <Button color="success" onClick={abrirModal}><PlusCircle className="mr-1"/> Agregar Empresa</Button>
                    </div>
                </div>
                {/* Modal de registro de empresa */}
                <br></br>
                <div className="form-register">             
                    <div className="form-row">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Empresa</th>
                                    <th scope="col">NIT</th>
                                    <th scope="col">Dirección</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Rubro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   /* empresas.map((empresa,index)=>{
                                        return(
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{empresa.nameEmpresa}</td>
                                                <td>{empresa.nit}</td>
                                                <td>{empresa.direction}</td>
                                                <td>{empresa.phone}</td>
                                                <td>{empresa.email}</td>
                                                <td>{empresa.rubro}</td>
                                            </tr>
                                        )
                                    })*/
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaEmpresa
