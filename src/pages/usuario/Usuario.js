import React,{useEffect, useState} from  'react'
import { PencilSquare, PlusCircle } from 'react-bootstrap-icons';
import ModalAgregarUsuario from './ModalAgregarUsuario';
import { getUsers } from '../../services/http/UserService' ;
import ModalEditarUsuario from './ModalEditarUsuario';
import {Button} from 'reactstrap';
function Usuario(){

    const [users, setUsers] = useState([]);
    const [flag, setFlag] = useState(false);
    const [ isShowModalEditarU, setIsShowModalEditarU ] = useState(false)
    const [ isShowModalAgregarU, setIsShowModalAgregarU ] = useState(false)
    const [user, setUser ] = useState({name:"",lastName:"",ci:"",phone:"",direction:"",email:"",userName:"",userRol:""})

    const updateUsers = ()=>{
        setFlag(!flag);
    }
    const openModalAgregarU= () => {
        setIsShowModalAgregarU( true );
    }
    const CloseModalEditarU = () => {
        setIsShowModalEditarU( false );
    };
    const CloseModalAgregarU = () => {
        setIsShowModalAgregarU( false );
    }
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getUsers();
            setUsers(response.users);
            console.log(response.users)
        } catch (error) {
            console.log(error);
        }
    };

    fetchData();
    }, [setUsers,flag]);;

    return(
        <>
            <div className="container" align="left">
                    <br></br>
                    <h1>Usuarios</h1>
                    <br></br>
                <div className="row">
                    <div className="col-6">
                        <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        </form>
                    </div>
                    <div className="col-6" align="right">
                    <Button color="success" onClick={openModalAgregarU}><PlusCircle className="mr-1"/>Nuevo</Button>
                    </div>
                </div>
                <ModalAgregarUsuario isShowModalAgregarU={ isShowModalAgregarU } CloseModalAgregarU={ CloseModalAgregarU } updateUsers={ updateUsers }/>
                <br></br>
                <div className="form-register">             
                    <div className="form-row">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Carnet de Identidad</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Rol de Usuario</th>
                                <th scope="col">Modificar</th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                   users.map((user,index)=>{
                                        return (
                                            <tr key={user.id}>
                                                <td scope="row">{index+1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.ci}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.email}</td>
                                                <td>{user.userRol}</td>
                                                <td><button className="btn  btn-warning" 
                                                        onClick={()=>{
                                                            setIsShowModalEditarU(true)
                                                            setUser(user)
                                                        }}
                                                        style={{color:'white', backgroundColor:'orange'}}
                                                    ><PencilSquare/></button>
                                                </td>
                                                <td>{console.log("esto estra en iteracion",user.id)}</td>
                                            </tr>
                                        );
                                   })
                               }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ModalEditarUsuario
                isShowModalEditarU={ isShowModalEditarU }
                user={ user }
                CloseModalEditarU = {CloseModalEditarU}
                updateUsers={updateUsers}
            />
        </>
    );
}

export default Usuario;