import React,{useEffect, useState} from  'react'
import {PlusCircle, PencilSquare} from 'bootstrap-icons-react';
import RolDeUser from './RolDeUser';
import EditarRol from './EditarRol';
import {getRols} from '../../services/http/RolService'
import {Button} from 'reactstrap';

function ListaRoles(){

    const [ abierto, setAbierto ] = useState(false);
    const [ rols, setRols ] =useState([]);
    const [ flag, setFlag] = useState(false);
    const [ rol, setRol ] = useState({nameRol:"",description:""})
    const [ abrirEditor, setAbrirEditor] = useState(false);
    const OpenModalRR = () => {
        setAbierto(true);
    };
    const CloseModalRR = () => {
        setAbierto(false);
    };
    const cerrarEditor = () => {
        setAbrirEditor( false );
    }
    const updateRols = ()=>{
        setFlag(!flag);
    }
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getRols();
            setRols(response.roles);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
    }, [setRols,flag] );
    
    return(
        <>
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
                         </div>
            </div>
            <RolDeUser abierto={ abierto } CloseModalRR={CloseModalRR} updateRols={updateRols} /> 
                <br></br>
                <div className="form-register">             
                    <div className="form-row">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rols.map((rol,index)=>{
                                        return (
                                            <tr key={index}>
                                                <td scope="row">{index+1}</td>
                                                <td>{rol.nameRol}</td>
                                                <td>{rol.description}</td>
                                                <td><button className="btn  btn-warning" 
                                                        onClick={()=>{
                                                            setAbrirEditor(true)
                                                            setRol(rol)
                                                        }}
                                                        style={{color:'white', backgroundColor:'orange'}}
                                                    ><PencilSquare/></button>
                                                </td>
                                            </tr>
                                        );
                                   })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <EditarRol 
            abrirEditor={ abrirEditor }
            rol={ rol }
            cerrarEditor = {cerrarEditor}
            updateRols= {updateRols}
        /> 
        </>
    );
}

export default ListaRoles;