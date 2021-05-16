import React,{useEffect, useState} from  'react'
import { PlusCircle } from 'bootstrap-icons-react';
import RolDeUser from './RolDeUser';
import {getRols} from '../../services/http/RolService'
import {Button} from 'reactstrap';

function ListaRoles(){

    const [ abierto, setAbierto ] = useState(false);
    const [ roles, setRoles ] =useState([]);
    const [ flag, setFlag] = useState(false);
    
    const OpenModalRR = () => {
        setAbierto(true);
    };
    const CloseModalRR = () => {
        setAbierto(false);
    };
    const updateRoles = ()=>{
        setFlag(!flag);
    }
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
                        {/* <button type="button" className="btn btn-success my-2 my-sm-0" onClick={OpenModalRR}> 
                        <PlusCircle  className="mb-1"/> Nuevo </button> */}
                        <Button color="success" onClick={OpenModalRR}><PlusCircle className="mr-1"/>Nuevo</Button>
                         </div>
                    </div>
                <RolDeUser abierto={ abierto } CloseModalRR={CloseModalRR} updateRoles={updateRoles} /> 
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
            
        </>
    );
}

export default ListaRoles;