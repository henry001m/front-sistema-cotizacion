import React,{useEffect, useState} from  'react'
import { PencilSquare, PlusCircle } from 'bootstrap-icons-react';
import RolDeUser from './RolDeUser';
import NavSuperusuario from '../../components/navSuperusuario/NavSuperusuario'
import {getRoles, getRols} from '../../services/http/RolService'

function ListaRoles(){

    const [ roles, setRoles ] =useState([])
    const [ isShowModalRegistroRol, setIsShowModalRegistroRol ] = useState(false)
    const [flag, setFlag] = useState(false);
    
    const CloseModalRR = () => {
        setIsShowModalRegistroRol( false );
    };
   
    const Roles = roles.map((rols,index)=>{
        return(
            <tr key={index}>
                <th scope="row">
                    {index+1}         
                </th>
                <td >
                    {rols.nameRol}         
                </td>
                <td >
                    {rols.description}         
                </td>
            </tr>
        );
    });
    
    const updateRoles = ()=>{
        setFlag(!flag);
    }
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getRols();
            setRoles(response.roles);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        };
    fetchData();
    }, [setRoles,flag]);


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
                        <button type="button" className="btn btn-success my-2 my-sm-0" onClick={() => setIsShowModalRegistroRol(true)}> 
                        <PlusCircle  className="mb-1"/> Nuevo </button>
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
                                {Roles}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <RolDeUser
            isShowModalRegistroRol={ isShowModalRegistroRol }
            CloseModalRR = {CloseModalRR}
            updateRoles={updateRoles}
            />
        </>
    );
}

export default ListaRoles;