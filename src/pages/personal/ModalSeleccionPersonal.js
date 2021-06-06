import React, {useState, useEffect} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup, Button} from 'reactstrap';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom'
import { getUsers } from '../../services/http/UserService' ;
import { getRols } from '../../services/http/RolService';
function RolDeUser(props){
  
    const { register, formState: { errors },handleSubmit, reset } = useForm();
    const [ selectedCheckboxes, setSelectedCheckboxes]=useState([]);
    const [ message, setMessage] = useState("");
    const [ users, setUsers ] = useState([{id:"",name:"",lastName:""}]);
    const [ rols, setRols ] = useState([])
    const [ idRol, setIdRol ] = useState("")
    const [ ids, setIds] = useState([{idUser:"",idRol:"",idUnit:""}]);
    const [ flag, setFlag] = useState(false);
    const [ selectActivo, setSelectActivo]=useState(false)
    const [abierto, setAbierto] = useState(false);
    const user = JSON.parse(window.localStorage.getItem("userDetails"));
    // const [ usuarios, setUsuarios ] = useState([
    //     {id:1 , nameUser:"Oscar Zelada" ,nameRol:"Encargado de solicitudes"},
    //     {id:2 , nameUser:"Jaqueline Zurita",nameRol:"Secretaria" },
    //     {id:3 , nameUser:"Mauricio Grageda",nameRol:"Cotizador" },
    //     {id:4 , nameUser:"Alvaro Rioja",nameRol:"Encargado de correos"},
    // ]);
    var seleccionados =[];
    let history = useHistory();
    function closePage(){
        history.replace("/ListaPersonal");
    }
    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
        updatePersonal()
    }
    const handleChangeCheckBox = (e) => {
        let auxiliar = [];
        if(selectedCheckboxes.includes(e.target.value)){ 
            document.getElementById('idRol').setAttribute("disabled","disabled");
            // document.getElementById('idRol').setAttribute("disabled","true");
            // document.getElementById('idRol').disabled = true;
        }else{
           // document.getElementById('idRol').removeAttribute('disabled');
        }
        // if(selectedCheckboxes.includes(e.target.value)){ 
        //     auxiliar=selectedCheckboxes.filter(elemento=>elemento!==e.target.value);
        //     // setSelectActivo(false);
        // }else{
        //     auxiliar=selectedCheckboxes.concat(e.target.value) 
        //     // setSelectActivo(true);
        // }
        // for (const per of auxiliar) { 
        //     seleccionados.push(parseInt(per));
        // }
        // setSelectedCheckboxes(auxiliar);
        // console.log(seleccionados);
    }

    const closeModal = () => {
        reset();
        setMessage("");
        setSelectedCheckboxes("");
        updateRoles()
        updateUsers()
        setIdRol("")
        props.cerrarModal()
    }

    const updateUsers = ()=>{
        setFlag(!flag);
    }
    const updateRoles = ()=>{
        setFlag(!flag);
    }
    const handleSelectChange = (event) => {
        setIdRol(event.target.value)
    }
    const onSubmit = async (data)  => {
        // setRol(rol.nameRol,rol.description,rol.users);
        // const res = await createRol(rol);
        // alert(res.message);
        // console.log("Esto se envia",rol);
        closeModal();
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

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getRols();
            setRols(response.roles);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
    }, [setRols,flag]);
    

    return(
        <>
            <div className="container" align="left" isOpen={props.abierto} >
                <br></br>
                <h1>Seleccionar Personal</h1>
                <br></br>
                <div className="col" id="registro">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <h6>Usuarios:</h6>
                                <div class="modal-table">
                                <div className="form-row" id="list">
                                <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th width="3%" scope="col"></th>
                                        <td width="20%" scope="col">Nombre</td>
                                        <td width="50%" scope="col">Rol</td>
                                    </tr>
                                </thead> 
                                <tbody>
                                    {
                                        users.map((userAdd)=>{
                                            if(userAdd.id != user.user.id & userAdd.id != 1){
                                                return (
                                                    <tr>
                                                        <td scope="row"><input 
                                                                        type="checkbox" 
                                                                        name="user"
                                                                        {...register("user",{
                                                                            required:"Seleccione al menos 1 usuario"
                                                                        })}
                                                                        value={userAdd.id} 
                                                                        onChange={handleChangeCheckBox}/></td>
                                                        <td>{userAdd.name} {userAdd.lastName}</td>
                                                        <td>
                                                            <select 
                                                                id="idRol"
                                                                name="idRol"
                                                                {...register("idRol",{})}
                                                                class="form-control" aria-label=".form-select-lg example"
                                                                disabled
                                                                onClick={handleSelectChange}>
                                                                    <option value="0">{userAdd.userRol}</option>
                                                                    {
                                                                        rols.map((role, index)=>{
                                                                            if(role.nameRol != userAdd.userRol & role.id != 1 & role.id != 2 & role.id != 3){
                                                                                return(
                                                                                    <option value={role.id} key={index}>{role.nameRol}</option>   
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                            </select>
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
                                {errors.users && <span className="text-danger text-small d-block mb-2">{errors.users.message}</span>} 
                            </div>
                        </div>
                        <div className="form-row" >
                            <div className="form-group col" id="toolbar">
                                <button type="button" className="btn btn-secondary btn-sm" onClick={closePage}>Cancelar</button>
                                <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                            </div>
                        </div>
                </form>
               </div>
            </div>
        </>
    )
}

export default RolDeUser