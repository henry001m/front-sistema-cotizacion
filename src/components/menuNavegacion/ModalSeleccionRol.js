import React, { Fragment,useState,useEffect } from 'react'
import { PersonCircle ,BoxArrowRight,HouseDoorFill} from 'react-bootstrap-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { useHistory  } from 'react-router-dom'
import { useForm } from "react-hook-form";
import './ModalSeleccionRol.css';
function ModalSeleccionRol(props){
    const [user, setUser] = useState([]);
    const [userRol, setUserRol] = useState([]);
    const [nameUnidad, setNameUnidad] = useState("")
    const [ flag, setFlag] = useState(false);
    let history = useHistory();
    

    const modalStyles={
        top:"5%",
        transfrom: 'translate(-50%, -50%)'
    }
    const closeModal = () => {
        props.cerrarModalRoles()
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(window.localStorage.getItem("userDetails"));
                setUser(user.user);
                setUserRol(user.user.roles);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])

    return(
     <> 
     <Modal isOpen={props.abrirRoles}  style={modalStyles}>
        <ModalHeader toggle={closeModal}>
          Seleccione el rol con el que desea acceder
        </ModalHeader>
        <ModalBody>
                <div align="center" class="tabla grid-container--fill">
                    {userRol.map((rol)=>{
                        return(
                            <div id="card">
                            <image class="card-img-top"><PersonCircle height={60} width={60} id="card-image"/></image>
                            <div class="card-body">
                                <h6 class="card-title">{rol.nameRol}</h6>
                                <label class="card-text">{rol.nameUnidadGasto} </label>
                                <label class="card-text">{rol.nameUnidadAdministrativa}</label>
                                <button type="button" class="btn btn-info"
                                 onClick={()=>{
                                    console.log("entra con el rol",rol.nameRol,rol.nameUnidadAdministrativa,rol.nameUnidadGasto);  
                                    props.updateRol(rol)
                                    closeModal()
                                }}>Acceder</button> 
                            </div>
                            </div>
                        );
                    }
                    )}
                </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal" onClick={closeModal}>Cerrar</button>
        </ModalFooter>
    </Modal>
     </>
    )
}

export default ModalSeleccionRol;