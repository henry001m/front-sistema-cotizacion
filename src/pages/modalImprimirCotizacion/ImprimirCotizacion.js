import React, {useState, useEffect} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup, Button} from 'reactstrap';
import { getEmpresas } from '../../services/http/BussinessService';
import { useForm } from "react-hook-form";
import {URL_API} from '../../services/const';


function ImprimirCotizacion(props){
    const [emp, setEmp] = useState([]);
    const {id} = props;
    
    
    var idBussines = 0;
    const [urlPdf, setUrlPdf] = useState("");
    const closeModal=()=>{
        props.cerrarModal()
    }

    const handleSelectChange = (event) => {
        idBussines= event.target.value;
        setUrlPdf(URL_API+"/v2requestquotitationpdf/"+props.id+"/"+idBussines);
    }


    const servicioImprimir =(event)=>{
        event.preventDefault()
    }
    
    useEffect(()=>{
        const fetchData = async () => {
            try {
                console.log("id de cotizacion"+id);
                setUrlPdf(URL_API+"/v2requestquotitationpdf/"+id+"/0");
                const response = await getEmpresas();
                console.log(response)
                setEmp(response.business);
            } catch (error) {
                console.log(error);
            }
            };
            fetchData();
    }, [id]);


    return(
        <>
        <div>
        <Modal isOpen={props.abierto}>
            <ModalHeader toggle={closeModal} >
               Imprimir Cotización
            </ModalHeader>
           
            <ModalBody>
            <div className="form-group col-md-12">
                    <h6>Seleccionar Empresa (opcional):</h6>
                    <select 
                    name="empresa"
                    className="form-control"
                    onChange={ handleSelectChange }
                    >
                        <option value={0} >Seleccione empresa</option>
                        {
                            emp.map((empresa, index)=>{
                               return(
                                     <option value={empresa.id}>{empresa.nameEmpresa} </option>   
                                )
                            
                            })
                        }
                    </select>
                </div>
               
            </ModalBody>
            <ModalFooter>    
                <a className="btn btn-primary" target="true" href={urlPdf} style={{textDecoration:'none', color:"#fff"}}> Listo</a>
            </ModalFooter>
        </Modal>
        
    </div>
            
        </>
    )
}

export default ImprimirCotizacion