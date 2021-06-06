import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {Button} from 'reactstrap';
import {PlusCircle} from 'bootstrap-icons-react';
import {getPersonal} from '../../services/http/UserService'
import {getPersonalUG} from '../../services/http/UserService'

function ListaPersonal(){
   
    const [flag, setFlag] = useState(false);
    const [personal, setPersonal] =useState([]);
    let history = useHistory();
    // const [personal, setPersonal] = useState([
    //     {id:1 , name:"Fiorela Claros", ci:798647, phone:67676767, nameRol:"Secretaria"},
    //     {id:2 , name:"Sergio Orellana", ci:456647, phone:67686764, nameRol:"Cotizador"},
    //     {id:3 , name:"Enrique Saavedra", ci:998547, phone:68686868, nameRol:"Responsable de correos"},
    // ]);
    
    const updatePersonal = ()=>{
        setFlag(!flag);
    }
    function buttonPersonal(){
        history.push("/seleccionPersonal")
    }
    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("userDetails"));
        const idUnitA = user.user.administrative_units_id;
        const idUnitS = user.user.spending_units_id;
        async function getAllUsers() {
            if (idUnitA != null){
                const response = await getPersonal(idUnitA);
                setPersonal(response.users);
            }else{
                const resp = await getPersonalUG(idUnitS);
                setPersonal(resp.users);
            }
            // if(idUnitA != null && idUnitS != null){
            //     const response = await getPersonal(idUnitA);
            //     setPersonal(response.users);
            //     const resp = await getPersonalUG(idUnitS);
            //     setPersonal(resp.users);
            // }
        }
        getAllUsers();
    }, [setPersonal,flag]);
    return (
        <>
            <div className="container" align="left">
                <br></br>
                <h1>Personal</h1>
                <br></br>
                <div className="row">
                    <div className="col-6">
                        <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        </form>
                    </div>
                    <div className="col-6" align="right">
                        <button type="button" className="btn btn-success my-2 my-sm-0" onClick={ buttonPersonal }> 
                        <PlusCircle  className="mb-1"/>Agregar</button>
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
                                    <th scope="col">CI</th>
                                    <th scope="col">Telefono</th>
                                    {/* <th scope="col">Rol</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {personal.map((user,index) => {
                                    return(
                                        <tr key={user.id}>
                                            <td scope="row">{index+1}</td>
                                            <td>{user.name} {user.lastName}</td>
                                            <td>{user.ci}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.userRol}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaPersonal