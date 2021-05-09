import React,{useEffect, useState} from  'react'
import { PencilSquare, PlusCircle } from 'bootstrap-icons-react';
import RolDeUser from './RolDeUser';
import NavSuperusuario from '../../components/navSuperusuario/NavSuperusuario'
import {getRols} from '../../services/http/RolService'
import {Button} from 'reactstrap';
import RegistroUnidad from '../regitroUnidadGasto/RegistroUnidad'

function ListaRoles(){

    const [ abierto, setAbierto ] = useState(false);
    const [ rols, setRols ] =useState([]);
    const [ flag, setFlag] = useState(false);
    const [ rol, setRol ] = useState({nameRol:"",description:""})

    const OpenModalRR = () => {
        setAbierto(true);
    };
    const CloseModalRR = () => {
        setAbierto(false);
    };

    const updateRols = ()=>{
        setFlag(!flag);
    }
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getRols();
            setRols(response.rols);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
    }, [setRols,flag]);

    return(
        <>
            <NavSuperusuario/>
            <div className="container" align="left">
                    <br></br>
                    <h1>Roles</h1>
                    <br></br>
                    <div className="row">
                        <div className="col-6">
                            <form className="form-inline">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            </form>
                        </div>
                        <div className="col-6" align="right">
                             <Button color="success" onClick={OpenModalRR}><PlusCircle className="mr-1"/>Nuevo</Button>
                             <RolDeUser updateRols={updateRols} /> 
                         </div>
                    </div>
                
                <br></br>
                <div className="form-register">             
                    <div className="form-row">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Descripcion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rols.map((rols,index)=>{
                                        return (
                                            <tr key={index}>
                                                <td scope="row">{index+1}</td>
                                                <td>{rols.nameRol}</td>
                                                <td>{rols.description}</td>
                                            </tr>
                                        );
                                   })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <RolDeUser 
            abierto={ abierto } 
            rol = {rol} 
            CloseModalRR={CloseModalRR} 
            updateRols={updateRols} /> 
        </>
    );
}

export default ListaRoles;