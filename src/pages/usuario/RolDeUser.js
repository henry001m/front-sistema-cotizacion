import React, {Component} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, InputGroupText} from 'reactstrap';
import './RolDeUser.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import NavSuperusuario from '../../components/navSuperusuario/NavSuperusuario';
import { Route, Switch } from "react-router";
import esNom from '../../validaciones';


class RolDeUser extends Component{
    
    state ={
        error:false,
        mensajeError: "Campo resseed"
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
            <div>
            <Modal isOpen={this.abrirModal} style={modalStyles}>
            <ModalHeader>
                Agregar Nuevo Rol
                <a className="btnx" href="/vistaSuperusuario" type="button"><i className="bi bi-x" ></i></a>
            </ModalHeader>
            <ModalBody className="modalBody">
                <FormGroup>
                    <div className="form-group mt-2">
                        <h6>Nombre de Rol de Usuario:</h6>
                        <input
                        type="text"
                        name="rol"
                        className ="form-control"
                        validacion = {this.actualizarState}
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
                       />
                    </div>
                </FormGroup>
                <Route>
                    <div className=" btnCancel mt-5">
                        <div className="cancel"><Button  href="/vistaSuperusuario" >Cancelar</Button></div>
                        <div className="guardar"><Button color="primary">Guardar</Button></div>
                    </div>
                    <Switch>
                        <Route exact path="/vistaSuperusuario" component={ NavSuperusuario }/>
                    </Switch>
                </Route>
                </ModalBody>
                 
            </Modal>
            </div>
            </>
            )
        }
}

export default RolDeUser