import React, {useState, useEffect} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup, Button} from 'reactstrap';
import { useForm } from "react-hook-form";

function RolDeUser(props){
  
    const { register, formState: { errors },handleSubmit, reset } = useForm();
    const [ selectedCheckboxes, setSelectedCheckboxes]=useState([]);
    const [ message, setMessage] = useState("");
    const [ usuarios, setUsuarios ] = useState([
        {id:1 , nameUser:"Oscar Zelada" ,nameRol:"Encargado de solicitudes"},
        {id:2 , nameUser:"Jaqueline Zurita",nameRol:"Secretaria" },
        {id:3 , nameUser:"Mauricio Grageda",nameRol:"Cotizador" },
        {id:4 , nameUser:"Alvaro Rioja",nameRol:"Encargado de correos"},
    ]);
    var seleccionados =[];
   
    // Pedir arreglo de usuarios
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
    }

    const closeModal = () => {
        clearForm();
        props.cerrarModal();
    }

    const clearForm = () => {
        setMessage("");
        setSelectedCheckboxes("");
        reset();
    };

    const onSubmit = async (data)  => {
        // setRol(rol.nameRol,rol.description,rol.users);
        // const res = await createRol(rol);
        // alert(res.message);
        // console.log("Esto se envia",rol);
        props.cerrarModal();
        closeModal();
        clearForm();
    }

    return(
        <>
            <Modal isOpen={props.abierto} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader toggle={closeModal}>
                        Seleccion de Personal
                    </ModalHeader>
                    <ModalBody>
                    <div className="form-rom">
                        <div className="form-group col-md-12">
                            <h6>Usuarios:</h6>
                            <div class="modal-table">
                            <Table bordered>
                              <thead>
                                  <tr>
                                      <th>#</th>
                                      <td>Nombre</td>
                                      <td>Rol</td>
                                  </tr>
                              </thead> 
                              <tbody>
                                  {
                                    usuarios.map((user)=>{
                                        return (
                                            <tr>
                                                <td scope="row"><input 
                                                                type="checkbox" 
                                                                name="users"
                                                                {...register("users",{
                                                                    required:"Seleccione al menos 1 usuario"
                                                                })}
                                                                value={user.id} 
                                                                onChange={handleChangeCheckBox}/></td>
                                                <td>{user.nameUser}</td>
                                                <td>{user.nameRol}</td>
                                            </tr>
                                        );
                                   })
                                 }
                              </tbody> 
                            </Table>
                            </div>
                            {errors.users && <span className="text-danger text-small d-block mb-2">{errors.users.message}</span>} 
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

export default RolDeUser