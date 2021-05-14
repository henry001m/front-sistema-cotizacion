import React, {useState, useEffect} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup, Button} from 'reactstrap';
import { useForm } from "react-hook-form";
import { createRol } from '../../services/http/RolService'
// import '../bootstrap/dist/css/bootstrap.min.css'
import './RolDeUser.css';
//import { getPermisos } from '../../services/http/PermisosService'
function RolDeUser(props){

    const { register, formState: { errors },handleSubmit, reset } = useForm();
    const [ rol, setRol ] = useState({nameRol:"",description:""})
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
    const [checkBoxSelected,setCheckBoxSelected]=useState([]);
    const handleChangeCheckBox=e=>{
        console.log(e.target.value)
    }
    // const modalStyles={
    //     top:"20%",
    //     transfrom: 'translate(-50%, -50%)'
    // }

    const closeModal = () => {
        reset()
        setRol({nameRol:"",description:""});
        props.CloseModalRR()
    }

    const onSubmit = async ( )  => {
        const res = await createRol(rol);
        console.log(res);
        setRol({nameRol:"",description:""});
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

    // useEffect(() => {
    //     const fetchData = async () => {
    //     try {
    //         const response = await getPermisos();
    //         setPermisos(response.permisos);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // fetchData();
    // }, []);

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
    
    
    
    return(
        <>
            <Modal isOpen={props.abierto} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader toggle={closeModal}>
                        Agregar Nuevo Rol
                    </ModalHeader>
                    <ModalBody>
                    <div className="form-rom">
                        <div className="form-group col-md-10">
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
                       
                        <div className="form-group col-md-10">
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
                                        message:"Este campo debe tener entre 15 y 200caracteres"
                                    }
                                })}
                                value={rol.description}
                                onChange={ handleInputChange }
                                className ="form-control"
                                />
                                {errors.description && <span className="text-danger text-small d-block mb-2">{errors.description.message}</span>}
                        </div>
                        
                        <div className="form-group col-md-10">
                        
                            <h6>Permisos:</h6>
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
                                    permisos.map((permiso)=>{
                                        return (
                                            <tr>
                                                <td scope="row"><input type="checkbox" value={permiso.id} onChange={handleChangeCheckBox}/></td>
                                                <td>{permiso.namePermission}</td>
                                            </tr>
                                        );
                                   })
                                 }
                              </tbody> 
                            </Table>
                            
                            </div>
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