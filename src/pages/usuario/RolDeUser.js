import React, {Component} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, InputGroupText} from 'reactstrap';
import './RolDeUser.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.css'



class RolDeUser extends Component{
    state={
        abierto:false
    }
    abrirModal = () =>{
        this.setState({abierto: !this.state.abierto})
    }

    render (){
        const modalStyles={
            top:"20%",
            transfrom: 'translate(-50%, -50%)'
        }
        return(
            <>
            <Button onClick={this.abrirModal}> Modal RolDeUser</Button>
            <div>
            <Modal isOpen={this.state.abierto} style={modalStyles}>
            <ModalHeader>
                Agregar Nuevo Rol
                <i class="bi bi-x"></i>
            </ModalHeader>
            <ModalBody className="modalBody">
                <FormGroup>
                    <div className="form-group mt-2">
                        <h6>Nombre de Rol de Usuario:</h6>
                        <input
                        type="text"
                        name="title"
                        className ="form-control"
                        placeholder="Title"
                        />
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className="form-group mt-2">
                        <h6>Descripción de Rol:</h6>
                        <textarea
                        type="text"
                        name="responsible"
                        className ="form-control"
                        placeholder="Responsible"
                       />
                    </div>
                </FormGroup>
                    <div className=" btnCancel mt-5">
                        <div className="cancel"><Button  onClick={this.abrirModal} >Cancelar</Button></div>
                        <div className="guardar"><Button color="primary">Guardar</Button></div>
                    </div>
                </ModalBody>
                 
            </Modal>
            </div>
            </>
            )
        }
}

export default RolDeUser