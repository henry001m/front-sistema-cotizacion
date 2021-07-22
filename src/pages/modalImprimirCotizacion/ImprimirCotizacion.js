import React, {useState, useEffect} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup, Button} from 'reactstrap';
import { getEmpresas } from '../../services/http/BussinessService';
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import {URL_API} from '../../services/const';


function ImprimirCotizacion(props){
    const { register, formState: { errors },handleSubmit, reset } = useForm();
    const [emp, setEmp] = useState([]);
    const {idUA} = useParams();
    const [quotitations, setQuotitations] = useState([]);
    const [flag, setFlag] = useState(false);
    const [idEmp, setIdEmp ] = useState([])
    const urlQuotitation = URL_API+"/requestquotitationpdf/"+props.id;

    console.log(props.id)
    const closeModal=()=>{
        props.cerrarModal()
        reset()
    }

    const updateEmpresas = ()=>{
        setFlag(!flag);
    }

    const handleSelectChange = (event) => {
        console.log("funciona")
        setIdEmp({
            ...idEmp,
           [event.target.name]: event.target.value
        })
        
    }

    const servicioImprimir =(event)=>{
        event.preventDefault()
    }

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await getEmpresas();
                console.log(response)
                setEmp(response.business);
                
            } catch (error) {
                console.log(error);
            }
            };
            fetchData();
    }, []);

    return(
        <>
        <div>
        <Modal isOpen={props.abierto}>
            <form onSubmit={servicioImprimir}>
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
                        <option >Empresas</option>
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
                <Button   type= "submit" color="primary" href={urlQuotitation}>
                        Listo
                </Button>
            </ModalFooter>
            </form>
        </Modal>
        
    </div>
            
        </>
    )
}

export default ImprimirCotizacion