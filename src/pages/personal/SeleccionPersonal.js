import React, {useState, useEffect} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup, Button} from 'reactstrap';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom'
import { getUsers } from '../../services/http/UserService' ;
import ModalSeleccionRoles from "./ModalSeleccionRoles";
import './SeleccionPersonal.css';

function SeleccionPersonal(props){
  
    const { register, formState: { errors },handleSubmit, reset } = useForm();
    const [ users, setUsers ] = useState([]);
    const [ user, setUser ] = useState([{id:"",name:"",lastName:""}]);
    const [ rol, setRol ] = useState({id:"",nameRol:"",description:""})
    const [ flag, setFlag] = useState(false);
    const [ abierto, setAbierto] = useState(false);
    const userBandera = JSON.parse(window.localStorage.getItem("userDetails"));
    let history = useHistory();

    function closePage(){
        // history.replace(`/personal/${props.idUnitA}/${props.idUnitS}`);
        window.history.back();
    }
    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }
    const updateUsers = ()=>{
        setFlag(!flag);
    }
    const onSubmit = async (data)  => {
        // setRol(rol.nameRol,rol.description,rol.users);
        // const res = await createRol(rol);
        // alert(res.message);
        // console.log("Esto se envia",rol);
        closePage();
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
    }, [setUsers,flag]);

    return(
        <>
            <div className="container" align="left">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader toggle={closePage}>
                        Seleccion de Personal
                    </ModalHeader>
                        <div className="form-row">
                            <div className="col-md-12">
                                <div class="table table-hover">
                                   <br></br>
                                   <label>Estos usuarios no estan en su unidad</label>
                                   <h5 id="titulo-tabla">Usuarios</h5>
                                   <table id="tablaC">
                                            <thead>
                                                <tr>
                                                    {/* <th width="3%" scope="col"></th> */}
                                                    <th id="columna" scope="col">Nombre</th>
                                                    <th id="columna" scope="col">Seleccionar Rol</th>
                                                </tr>
                                            </thead> 
                                            <tbody>
                                                {
                                                    users.map((userAdd,index)=>{
                                                        if(userAdd.id != userBandera.user.id & userAdd.id != 1){
                                                            return (
                                                                <tr>
                                                                    {/* <td>{index+1}</td> */}
                                                                    <td id="fila">{userAdd.name} {userAdd.lastName}</td>
                                                                    <td id="fila">
                                                                        <button type="button" class="btn btn-info"
                                                                        onClick={()=>{
                                                                            setAbierto(true)
                                                                            setUser(userAdd)
                                                                        }}
                                                                        >Seleccionar Rol</button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                })
                                                }
                                            </tbody> 
                                    </table>
                                </div>
                            </div>
                        </div>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal" onClick={closePage}>Cancelar</button>
                    </ModalFooter>
                </form>
            </div>
            <ModalSeleccionRoles
                abierto ={ abierto }
                user={ user }
                cerrarModal = {cerrarModal}
                updateUsers= {updateUsers}
           /> 
        </>
    )
}

export default SeleccionPersonal