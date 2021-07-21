import React, {useState, useEffect} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup, Button} from 'reactstrap';
import { useForm } from "react-hook-form";
import { useParams} from 'react-router-dom'
import { getUsersOutUA,getUsersOutUS} from '../../services/http/UserService' ;
import ModalSeleccionRoles from "./ModalSeleccionRoles";
import './SeleccionPersonal.css';

function SeleccionPersonal(){
    const {idUS} = useParams();
    const {idUA} = useParams();
    const { register, formState: { errors },handleSubmit, reset } = useForm();
    const [ users, setUsers ] = useState([]);
    const [ user, setUser ] = useState([{id:"",name:"",lastName:""}]);
    const [ rol, setRol ] = useState({id:"",nameRol:"",description:""})
    const [ flag, setFlag] = useState(false);
    const [ abierto, setAbierto] = useState(false);
    const userBandera = JSON.parse(window.localStorage.getItem("userDetails"));
    function closePage(){
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
        closePage();
    }
    useEffect(() => {
        try {
            async function getAllUsers() {
                if (idUS === "null" ){
                    const response = await getUsersOutUA(idUA);
                    setUsers(response.users);
                }
                if (idUA === "null"){
                    const resp = await getUsersOutUS(idUS);
                    setUsers(resp.users);
                }
            }
            getAllUsers();
        } catch (error) {
            console.log(error);
        }
    }, [setUsers,flag]);

    return(
        <>
            <div className="container" align="left">
               <div className="form-row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h4>Seleccion de personal
                                <button type="button" className="close" onClick={ closePage }>
                                    <span aria-hidden="true">&times;</span>
                                </button></h4>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <div class="table table-hover">
                                        <label>Estos usuarios no estan en su unidad</label>
                                        <table id="tablaC">
                                                <thead>
                                                    <tr>
                                                        <th width="5%" scope="col">#</th>
                                                        <th width="30%" scope="col">Nombre</th>
                                                        <th width="20%" scope="col">Telefono</th>
                                                        <th width="30%" scope="col">Seleccionar Rol</th>
                                                    </tr>
                                                </thead> 
                                                <tbody>
                                                    {
                                                        users.map((userAdd,index)=>{
                                                            if(userAdd.id != 1){
                                                                return (
                                                                    <tr>
                                                                        <td scope="row">{index}</td>
                                                                        <td >{userAdd.name} {userAdd.lastName}</td>
                                                                        <td >{userAdd.phone}</td>
                                                                        <td >
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
                            <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal" onClick={closePage}>Atras</button>
                            </ModalFooter>
                        </div>
                    </div>
                    
                </div>
                <br></br>
            </div>
            <ModalSeleccionRoles
                abierto ={ abierto }
                user={ user }
                idUS={idUS}
                idUA={idUA}
                cerrarModal = {cerrarModal}
                updateUsers= {updateUsers}
           /> 
        </>
    )
}

export default SeleccionPersonal