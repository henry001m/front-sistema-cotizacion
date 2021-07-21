
import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

function InformeVista(props){

    const closeModal = () => {
        props.CerrarModal()
    }

    const convertFromJSONToHTML = (html) => {
        try{
            return { __html: html}
        } catch(exp) {
            console.log(exp)
            return { __html: 'Error' }
        }
    }

    return(
        <>
            <Modal isOpen={props.abrirModalInforme}>
                <ModalHeader toggle={closeModal}>
                    <h4>Informe</h4>
                </ModalHeader>
                <ModalBody>
                    <div className="form-row">
                        <div className="form-group col-md-6" >
                            <label><strong>Encargado: </strong></label> <label>{props.report.administrative_username}</label>
                        </div>
                        <div className="form-group col-md-6" >
                            <label><strong>Fecha: </strong></label> <label>{props.report.dateReport}</label>
                        </div>
                    </div>
                    <div className="container" id="containerInforme">
                        <div dangerouslySetInnerHTML={convertFromJSONToHTML(props.report.description)} ></div >
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default InformeVista;