import React,{useState,useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap';
import { updateBossUG } from '../../services/http/UniGastoService';
import { useForm } from "react-hook-form";
import { getPermissions } from '../../services/http/PermissionService';
// const {useState} = React;
const Checkbox = ({ initialState, id, value, onChange}) => {
    const [checked, setChecked] = useState(initialState);
    const onClick=(checked)=>{
     setChecked(checked);
     onChange(id, value, checked);
    }
    return (
      <input
        type="checkbox"
        onClick={e => onClick(e.target.checked)}
        checked={checked}
      />
    );
  };
  
function EditarRol (props){
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [ rol, setRol ] = useState({nameRol:"",description:"",permissions:[]});
    const [ flag, setFlag] = useState(false);
    const [ permissions, setPermissions ] = useState([]);
    const [ selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [ permisosRol, setPermisosRol] = useState([]);
    var seleccionados =[];
    // const [ permisosUser, setPermisosUser ] = useState([
    //     {id:1 , namePermission:"Solicitu de aquicición" },
    //     {id:2 , namePermission:"Agregar detalle solictud" },
    //     {id:3 , namePermission:"Ver las solicitudes de adquisición" },
    // ]);
    const modalStyles={
        top:"5%",
        transfrom: 'translate(-50%, -50%)'
    }
    const closeModal = () => {
        props.cerrarEditor()
        props.updateRols()
        setSelectedCheckboxes([])
        reset()
    }
    const onCheckboxClicked=(id, isValue, isChecked)=>{
        console.log(`I'm checkbox number ${id} and i'm checked? --> ${isChecked} con el valor ${isValue}`);
        let auxiliar = [];
        if(selectedCheckboxes.includes(isValue) ){ 
            auxiliar=selectedCheckboxes.filter(elemento=>elemento!=isValue);
        }else{
            auxiliar=selectedCheckboxes.concat(isValue)
        }
        for (const per of auxiliar) {
            seleccionados.push(parseInt(per));
        }
        setSelectedCheckboxes(auxiliar);
        console.log(auxiliar);
    }
    const onSubmit = async (data) => {
        try{
            // if(idAdmin != ""){  
            //     console.log("IdAdminNuevo:",data.admin_id,"IdUnidad:",props.gasto.id);
            //     const res = await updateBossUG(data.admin_id,props.gasto.id);
            //     alert("Se realizo el cambio exitosamente")
            //     closeModal()
            // }else{
            //     alert("No selecciono un administrador diferente")
            //     console.log("es el mismo id:",idAdmin)
            // }
        }catch(error){
            console.log( error )
        }
    };
    useEffect(() => {
        async function getRequestId() {
            const response = await getPermissions();
            setPermissions(response.permissions); 
            setSelectedCheckboxes([1,2,3]);
            setPermisosRol([1,2,3]);
        }
        getRequestId();
    }, []);
    return (
        <>
        <Modal isOpen={props.abrirEditor} style={modalStyles}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader toggle={closeModal}>
            Editar Rol
            </ModalHeader>  
            <ModalBody>
            <div className="form-rom">
                <div className="form-group col-md-12">
                    <h6>Nombre de Rol:</h6>
                        <input
                            name="nameRol"
                            className="form-control"
                            type="text"
                            value={props.rol.nameRol}
                            disabled
                        ></input>
                </div>
               
                <div className="form-group col-md-12">
                    <h6>Descripcion:</h6>
                    <input
                        name="description"
                        className="form-control"
                        type="text"
                        value={props.rol.description}
                    ></input>
                </div>
               
                <div className="form-group col-md-12">
                        <h6>Asignar Permisos:</h6>
                        
                        <div class="modal-table">
                        <Table bordered>
                          <thead>
                              <tr>
                                  <th></th>
                                  <th>#</th>
                                  <th>Permiso</th>
                              </tr>
                          </thead> 
                          <tbody>
                              {
                                permissions.map((permission,index)=>{
                                    return (
                                        <tr>
                                        <td>
                                             <Checkbox 
                                             initialState={permisosRol.includes(permission.id)} 
                                             id={index+1} 
                                             value={permission.id}
                                             onChange={onCheckboxClicked} 
                                             />
                                        </td>
                                        <th scope="row">{index+1}</th>
                                        <td>{permission.namePermission}</td> 
                                        </tr>
                                    )  
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
        </form>
        </Modal> 
        </>
    )
}
export default EditarRol