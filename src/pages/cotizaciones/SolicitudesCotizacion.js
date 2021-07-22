import React, {useState, useEffect} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup, Button} from 'reactstrap';
import {solicitudesDeCotizacion} from '../../services/http/QuotitationService';
function SolicitudesCotizacion(props){
    const [solicitudes, setSolicitudes] = useState({
        quote_email: 0,
        quote_print: 0,
        quote_resp: 0,
        table:[]
    });
    const closeModal = () =>{
        props.cerrarSolicitudes();
    }
    useEffect(() => {
        
        const fechData = async () => {
            const res = await solicitudesDeCotizacion(props.id);
            console.log(res);
            setSolicitudes(res);
        }
        fechData();
    }, [])
    return(
        <>
          <Modal isOpen={props.abierto} >
                <ModalHeader toggle={closeModal}>
                    Solicitudes de cotizacion
                </ModalHeader>
                <ModalBody>
                    <label><strong>Impresas:</strong></label> <label>{solicitudes.quote_print}</label> <br></br>
                    <label><strong>Enviadas por correo:</strong></label> <label>{solicitudes.quote_email}</label> <br></br>
                    <label><strong>Respondidas:</strong></label> <label>{solicitudes.quote_resp}</label>
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
                                solicitudes.table.map((solicitud,index)=>{
                                    return (
                                        <tr>
                                            <th scope="row">{index+1}</th>
                                            <td>{solicitud.idQuotation}</td>
                                            <td>{solicitud.business}</td>
                                            <td>{solicitud.typeQuotation}</td>
                                            <td>{solicitud.answerDate}</td>
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