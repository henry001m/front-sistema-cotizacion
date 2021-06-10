import React,{useState} from 'react';
import { FileEarmarkArrowUpFill } from 'bootstrap-icons-react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import { useForm } from "react-hook-form";

const OfertaModal = (props) => {
    const modalStyles={
        top:"20%",
        transfrom: 'translate(-50%, -50%)',
        width:'400px'
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [namefile, setNamefile] = useState([])
    const [fileValidate, setFileValidate] = useState(false);
    const [fl, setFl] = useState(null);
    const closeModal = () => {
        reset()
        props.cerrarModal()
    }
    const onSubmit=(data)=>{
        data.archivo = fl
        props.guardarOferta(data)
        closeModal()
    }
    const fileSelectHandler =(e)=>{
        let namefileAux =[];
        let extenciones = [];
        for (let index = 0; index <e.target.files.length; index++) {
            const name = e.target.files[index].name;
            let extension = name.slice((name.lastIndexOf(".") - 1 >>> 0) + 2);
            namefileAux.push(name);
            extenciones.push(extension);
        }
        let noEsValido = true;
        let flag = false;
        extenciones.forEach(exten => {
            if(!flag){
                if(exten === 'pdf' || exten === 'png' || exten=== 'jpg'){
                    noEsValido =false;
                }else{
                    noEsValido=true;
                    flag = true;
                    
                }
            }
        });
        setFileValidate(noEsValido);
        setNamefile(namefileAux);
        setFl(e.target.files[0]);
        console.log(e.target.files)
    }
    return (
        <Modal isOpen={props.abierto} style={modalStyles}>
        <ModalHeader toggle={closeModal}>
            Agregar oferta
        </ModalHeader>
        <form > 
        <ModalBody>
            <FormGroup className="col-md-8">
            <label>Marca:</label>
            <input className="form-control form-control-sm" {...register("marca", { maxLength: 50,pattern: /^[A-Za-z 0-9]+$/i})} />
            <span style={{color:'red'}}>{errors.marca?.type === 'maxLength' && "Supero el numero maximo de caracteres (50)"}</span>
            <span style={{color:'red'}}>{errors.marca?.type === 'pattern' && "Solo se permiten caracteres"}</span>
            <label>Modelo:</label>
            <input className="form-control form-control-sm" {...register("modelo", { maxLength: 50,pattern: /^[A-Za-z 0-9]+$/i })} />
            <span style={{color:'red'}}>{errors.modelo?.type === 'maxLength' && "Supero el numero maximo de caracteres (50)"}</span>
            <span style={{color:'red'}}>{errors.modelo?.type === 'pattern' && "Solo se permiten caracteres"}</span>
            <label>Indutria:</label>
            <input className="form-control form-control-sm" {...register("industria", { maxLength: 50,pattern: /^[A-Za-z 0-9]+$/i })} />
            <span style={{color:'red'}}>{errors.industria?.type === 'maxLength' && "Supero el numero maximo de caracteres (50)"}</span>
            <span style={{color:'red'}}>{errors.industria?.type === 'pattern' && "Solo se permiten caracteres"}</span>
            <label>Tiempo de Garantia:</label>
            <input className="form-control form-control-sm" {...register("tiempo_garantia", { maxLength: 50,pattern: /^[A-Za-z 0-9]+$/i })} />
            <span style={{color:'red'}}>{errors.tiempo_garantia?.type === 'maxLength' && "Supero el numero maximo de caracteres (50)"}</span>
            <span style={{color:'red'}}>{errors.tiempo_garantia?.type === 'pattern' && "Solo se permiten caracteres"}</span>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <div className="form-group col-md-6" align="end">
                <input 
                    name="archivo"
                    type="file" 
                    id="files" 
                    onChange = {fileSelectHandler}
                ></input>
                <label for="files"><FileEarmarkArrowUpFill className="mb-1"/> Adjuntar archivo</label>
            </div>
            <Button type="button" onClick={handleSubmit(onSubmit)} color="primary">Guardar</Button>
        </ModalFooter>
        </form>
    </Modal> 
    )
}

export default OfertaModal
