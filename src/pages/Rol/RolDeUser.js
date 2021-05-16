import React, {useState, useEffect} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup, Button} from 'reactstrap';
import { useForm } from "react-hook-form";
import { createRol } from '../../services/http/RolService'
import './RolDeUser.css';
import { getPermissions } from '../../services/http/PermissionService'
function RolDeUser(props){
  
    const { register, formState: { errors },handleSubmit, reset } = useForm();
    const [ rol, setRol ] = useState({nameRol:"",description:""});
    const [ permissions, setPermissions ] = useState([]);
    const [ selectedCheckboxes, setSelectedCheckboxes]=useState([]);
    const [message, setMessage] = useState("");
    const [ permisos, setPermisos ] = useState([
        {id:1 , namePermission:"Solicitud de Adquisicion" },
        {id:2 , namePermission:"Agregar detalle Solicitud" },
        {id:3 , namePermission:"Ver Solictudes de Adquisicion" },
        {id:4 , namePermission:"Enviar cotizacion"},
        {id:5 , namePermission:"Ver Detalle de Solictud de Adquisicion" },
        {id:6 , namePermission:"Actualizacion de montos limite" },
        {id:7 , namePermission:"Registro Unidades Administrativas" },
        {id:8 , namePermission:"Registro Unidades de Gasto"  },
        {id:9 , namePermission:"Registro Usuarios" },
    ]);
    var seleccionados =[];
    
    //Cargar permisos desde BD
    // useEffect(() => {
    //     const fetchData = async () => {
    //     try {
    //         const response = await getPermissions();
    //         setPermissions(response.permissions);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // fetchData();
    // }, []);
   
     //Pedir nombre rol / descripcion
     const handleInputChange = (event) => {
        if(event.target.value[0]==" "){
            setRol({
                ...rol,
                [event.target.name] : event.target.value.substring(1)
            });
        }else{
            setRol({
                ...rol,
                [event.target.name] : event.target.value
            });
        }
    };
    // Pedir arreglo de permisos
    const handleChangeCheckBox = (e) => {
        let auxiliar = [];
        if(selectedCheckboxes.includes(e.target.value)){ //elimina repetidos
            auxiliar=selectedCheckboxes.filter(elemento=>elemento!==e.target.value);
        }else{
            auxiliar=selectedCheckboxes.concat(e.target.value) //agrega nuevos
        }
        for (const per of auxiliar) { //convertimos a numeros
            seleccionados.push(parseInt(per));
        }
        setSelectedCheckboxes(auxiliar);
        console.log(seleccionados);
        // if(auxiliar.length == 0){
        //     setMessage("Seleccione una opcion");
        //     return false;
        // }
    }

    const closeModal = () => {
        reset();
        setMessage("");
        setSelectedCheckboxes("");
        setRol({nameRol:"",description:""});
        props.CloseModalRR();
    }

    const onSubmit = async ( )  => {
        for (const per of selectedCheckboxes) { 
            seleccionados.push(parseInt(per));
        }
        // if(seleccionados.length==0){
        //     alert('seleccione un permiso');
        // }
        const res = await createRol(rol,seleccionados);
        console.log(rol.nameRol, rol.description, seleccionados);
        setRol({nameRol:"",description:""});
        setSelectedCheckboxes("");
        setMessage("");
        props.updateRols();
        props.CloseModalRR();
        reset()
    }
    // const SaveData = async ( ) => {
    //     const result = await createRol(rol);
    //     console.log(result)
    //     if(result.data){
    //         setMessage(result.data.message);
    //     }
    //     console.log(result);
    //     props.updateRols();
    //     if(!result.data.message){
    //         setRol({nameRol:"",description:""});
    //         closeModal();
    //     }
    // };
    // const grabarDatos = () => {   
    //     for (const per of selectedCheckboxes) { 
    //         seleccionados.push(parseInt(per));
    //     }
    //     console.log(rol.nameRol, rol.description, seleccionados);
    // }

    return(
        <>
            <Modal isOpen={props.abierto} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader toggle={closeModal}>
                        Agregar Nuevo Rol
                    </ModalHeader>
                    <ModalBody>
                    <div className="form-rom">
                        <div className="form-group col-md-12">
                            <h6>Nombre de Rol de Usuario:</h6>
                                <input
                                type="text"
                                name="nameRol"
                                {...register("nameRol",{
                                    required:"Campo requerido",
                                    minLength:{
                                        value:3,
                                        message:"Este campo debe tener entre 3 y 50 caracteres"
                                    },
                                    maxLength:{
                                        value:50,
                                        message:"Este campo debe tener entre 3 y 50 caracteres"
                                    },
                                    pattern:{
                                        value: /^[Ññíóáéú. a-zA-Z ]+$/,
                                        message:"El campo solo permite caracteres alfabeticos"
                                    }
                                })}
                                value={rol.nameRol}
                                onChange={ handleInputChange }
                                className ="form-control"
                                />
                                {errors.nameRol && <span className="text-danger text-small d-block mb-2">{errors.nameRol.message}</span>}
                        </div>
                       
                        <div className="form-group col-md-12">
                            <h6>Descripción de Rol:</h6>
                                <textarea
                                type="text"
                                name="description"
                                {...register("description",{
                                    required:"Campo requerido",
                                    minLength:{
                                        value:15,
                                        message:"Este campo debe tener entre 15 y 200 caracteres"
                                    },
                                    maxLength:{
                                        value:200,
                                        message:"Este campo debe tener entre 15 y 200 caracteres"
                                    }
                                })}
                                value={rol.description}
                                onChange={ handleInputChange }
                                className ="form-control"
                                />
                                {errors.description && <span className="text-danger text-small d-block mb-2">{errors.description.message}</span>}
                        </div>
                        
                        <div className="form-group col-md-12">
                        
                            <h6>Asignar Permisos:</h6>
                            <div class="modal-table">
                            <Table bordered>
                              <thead>
                                  <tr>
                                      <th></th>
                                      <th>Permiso</th>
                                  </tr>
                              </thead> 
                              <tbody>
                                  {
                                    permisos.map((permission)=>{
                                    //permissions.map((permission)=>{
                                        return (
                                            <tr>
                                                <td scope="row"><input 
                                                                type="checkbox" 
                                                                name="permissions"
                                                                {...register("permissions",{
                                                                    required:"Seleccione al menos 1 permiso"
                                                                })}
                                                                value={permission.id} 
                                                                onChange={handleChangeCheckBox}/></td>
                                                <td>{permission.namePermission}</td>
                                            </tr>
                                        );
                                   })
                                 }
                              </tbody> 
                            </Table>
                            </div>
                            {errors.permissions && <span className="text-danger text-small d-block mb-2">{errors.permissions.message}</span>} 
                        </div>
                    </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal"
                            onClick={closeModal}>Cancelar</button>
                        <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                    </ModalFooter>  
                        {/* < div  className = "btnCancel mt-5" >
                            < div  className = "cancel" > < Button  onClick={closeModal}> Cancelar </Button > </div>
                            < div  className = "guardar" > < Button  type = "submit"  color = "primary" > Guardar </Button > </div>
                        </div >
                         */}
               </form>
               
            </Modal>
        </>
    )
}

export default RolDeUser