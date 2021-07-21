import React, {useState, useEffect} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup, Button} from 'reactstrap';
function SolicitudesCotizacion(props){
    const [solicitudes, setSolicitudes] = useState([
        {codigo:"000001", empresa:"Muebleria Rivera", tipo:"Impreso", resp:"Sin respuesta"},
        {codigo:"000002", empresa:"Muebleria Cabrera", tipo:"Correo", resp:"Sin respuesta"},
        {codigo:"000003", empresa:"AGEXI", tipo:"Impreso", resp:"07-07-2021"},
        {codigo:"000004", empresa:"Sauce", tipo:"Correo", resp:"Sin respuesta"},
        {codigo:"000005", empresa:"Muebles y decoraciones", tipo:"Correo", resp:"Sin respuesta"},
        {codigo:"000006", empresa:"Home Center", tipo:"Correo", resp:"Sin respuesta"},
        {codigo:"000007", empresa:"Home Center", tipo:"Correo", resp:"Sin respuesta"},
        {codigo:"000008", empresa:"Home Center", tipo:"Correo", resp:"Sin respuesta"},
        {codigo:"000009", empresa:"Home Center", tipo:"Correo", resp:"Sin respuesta"},
    ]);
    const closeModal = () =>{
        props.cerrarSolicitudes();
    }
    return(
        <>
          <Modal isOpen={props.abierto} >
                <ModalHeader toggle={closeModal}>
                    Solicitudes de cotizacion
                </ModalHeader>
                <ModalBody>
                    <label><strong>Impresas:</strong></label> <label>2</label> <br></br>
                    <label><strong>Enviadas por correo:</strong></label> <label>2</label> <br></br>
                    <label><strong>Respondidas:</strong></label> <label>2</label>
                    <div class="modal-table"> 
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Codigo</th>
                                <th>Empresa</th>
                                <th>Tipo cotizacion</th>
                                <th>Fecha Resp.</th>
                            </tr>
                        </thead> 
                        <tbody>
                            {
                                solicitudes.map((solicitud,index)=>{
                                    return (
                                        <tr>
                                            <th scope="row">{index+1}</th>
                                            <td>{solicitud.codigo}</td>
                                            <td>{solicitud.empresa}</td>
                                            <td>{solicitud.tipo}</td>
                                            <td>{solicitud.resp}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </Table>
                    </div>
                </ModalBody>
                <ModalFooter>
                <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal"
                    onClick={closeModal}>Cerrar</button>
            </ModalFooter>  
          </Modal>
        </>
    )
}
export default SolicitudesCotizacion