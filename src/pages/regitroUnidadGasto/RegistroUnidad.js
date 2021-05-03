
import React, {Component} from 'react';
import './RegistroUnidad.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.css'

class RegistroUnidad extends Component{
    state={
        abierto: false,
    }
    abrirModal=() => {
        this.setState({abierto: !this.state.abierto})
    }

    render (){

        const modalStyles={
            top:"20%",
            transfrom: 'translate(-50%, -50%)'
        }
        return(
            <>
        <Button color="success" onClick={this.abrirModal}>Modal-UnidadGasto</Button>

            <div className="principal col md-8 mt-8">
           
            <Modal isOpen={this.abrirModal} style={modalStyles}>
                <ModalHeader>
                    Agregar Unidad de Gasto        
                    <i class="bi bi-x"></i>
                </ModalHeader>

                <ModalBody>
                   <FormGroup className="col-md-8">
                       <Label for="unidadGasto">
                            Nombre de Unidad de Gasto:
                       </Label>
                       <Input type="text" id="unidadGasto" placeholder="Ingrese el nombre de la unidad"/>
                   </FormGroup>
                   <FormGroup className="col-md-8 mt-3">
                       <Label for="unidadAdmin">
                            Unidad Administrativa Correspondiente:
                       </Label>
                       <div className="form-group">
                        <select
                        name="unidadGasto"
                        className="form-control mt-2"
                        >
                        <option >Seleccione la Unidad Administrativa</option>
                        <option>Admin1</option>       
                        <option>Admin2</option>
                        <option>Admin3</option>
                        </select>
                    </div> 
                   </FormGroup>
                </ModalBody>  

                
                   <ModalFooter>
                    <Button  onClick={this.abrirModal} >Cancelar</Button>
                    <Button color="primary">Guardar</Button>
                    </ModalFooter> 
              

            </Modal> 
            </div> 
            </>
        )
    }
}

export default RegistroUnidad