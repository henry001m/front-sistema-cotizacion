import React,{useState,useEffect, useRef} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table,FormGroup, Label, Input} from 'reactstrap';
import { useForm } from "react-hook-form";
import { getPermissions } from '../../services/http/PermissionService';
import { updateRol } from '../../services/http/RolService'
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
    const [ flag, setFlag] = useState(false);
    const [ rol, setRol ] = useState({nameRol:"",description:"",permissions:[]});
    const [ existEvent, setExistEvent] = useState(false);
    const [ permissions, setPermissions] = useState([]);
    const [ message, setMessage] = useState("")
    const [ messageD, setMessageD] = useState("")
    const [ selectedCheckboxes, setSelectedCheckboxes]=useState([]);
    const permissionsRef = useRef(props.rol.permissions);
    var seleccionados =[];
    const modalStyles={
        top:"5%",
        transfrom: 'translate(-50%, -50%)'
    }
    const closeModal = () => {
        props.cerrarEditor()
        props.updateRols()
        setSelectedCheckboxes([])
        setMessage("")
        setMessageD("")
        setRol("")
        reset()
    }
    const handleInputChange = (event) => {
        setRol({
            description: event.target.value
          });
        //setExistEvent(true);
    };
    function removeItemFromArr ( arr, item ) {
        var i = arr.indexOf( item );
        if ( i !== -1 ) {
            arr.splice( i, 1 );
        }
        console.log("cuando se elimina",arr);
    }
    function actualizarPermisos (seleccionados){
        let bandera=permissionsRef.current.concat(seleccionados);
        var repetidos = [];
        var temporal = [];
        bandera.forEach((value,index)=>{
            temporal = Object.assign([],bandera); 
            temporal.splice(index,1); 
            if(temporal.indexOf(value)!=-1 && repetidos.indexOf(value)==-1) 
            repetidos.push(value);
        });
        if(repetidos.length > 0){
             repetidos.forEach(element => 
                bandera = bandera.filter(function(item) {
                    return item !== element
                })
            );
        }
        return bandera;
    }
    const onCheckboxClicked=(id, isValue, isChecked)=>{
        let auxiliar = [];  
        if(selectedCheckboxes.includes(isValue) ){ 
            auxiliar=selectedCheckboxes.filter(elemento=>elemento!=isValue);
        }else{
            auxiliar=selectedCheckboxes.concat(isValue)
        }
        for (const per of auxiliar) {
            seleccionados.push(parseInt(per));
        }
        setSelectedCheckboxes(seleccionados)
        //console.log("seleccionados",seleccionados);
    }
    const onSubmit = async (data) => {
        try{
            if(selectedCheckboxes.length>0 | rol.description!=props.rol.description){
                let bandera = actualizarPermisos(selectedCheckboxes)
                if(bandera.length == 0){
                    setMessage('No puede dejar un rol sin permisos')
                }else{
                    console.log("IdRol:",props.rol.id,"Descripcion",data.description,"Permisos NUEVOS",bandera);
                    updateRol({idRol:props.rol.id,idPermission:bandera,description:data.description})
                    alert(`Se actualizo el rol ${props.rol.nameRol} exitosamente`);
                    closeModal();
                }
            }else{
                alert("No realizo cambios")
            } 
        }catch(error){
            console.log( error )
        }
    };
    useEffect(() => {
        async function getPermisos() {
            const response = await getPermissions();
            setPermissions(response.permissions);  
            setRol(props.rol)
        }
        getPermisos();
    }, [props.abrirEditor]);
    function ponleFocus(){
        document.getElementById("texto").focus();
    }
    useEffect(function(){
        permissionsRef.current = props.rol.permissions;
        console.log(`Usa Ref: ${permissionsRef.current}`);
    },[selectedCheckboxes]);
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
                        className="form-control"
                        type="text"
                        value={rol.description}
                        name="description"
                        {...register("description",{
                            required:"Campo Requerido"
                        })}
                        onChange={e => handleInputChange(e)}
                    ></input>
                    {errors.description && <span className="text-danger text-small d-block mb-2">{errors.description.message}</span>}
                </div>
               
                <div className="form-group col-md-12">
                        <h6>Permisos:</h6>                       
                    <div class="modal-table"> 
                        <Table striped bordered hover size="sm">
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
                                        <td scope="row">
                                             <Checkbox 
                                             initialState={props.rol.permissions.includes(permission.id)} 
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
                        <span className="text-danger text-small d-block mb-2">{message}</span>
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