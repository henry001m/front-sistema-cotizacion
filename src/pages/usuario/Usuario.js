import React,{useEffect, useState} from  'react'
import { PlusCircle } from 'bootstrap-icons-react';
import ModalAgregarUsuario from './ModalAgregarUsuario';
import { getUsers } from '../../services/Http/UserService' ;


function Usuario(){

const [users, setUsers] = useState([]);
const [flag, setFlag] = useState(false);
const updateUsers = ()=>{
    setFlag(!flag);
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        setUsers(response.users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [setUsers,flag]);
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
                        <ModalAgregarUsuario updateUsers={updateUsers}/>
                    </div>
                </div>
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
                                </tr>
                            </thead>
                            <tbody>
                               {
                                   users.map((user)=>{
                                        return (
                                            <tr key={user.id}>
                                                <td></td>
                                                <td>{user.name}</td>
                                                <td>{user.ci}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.email}</td>
                                                <td>.....</td>
                                            </tr>
                                        );
                                   })
                               }
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
        </>
    );
}

export default Usuario;