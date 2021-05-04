import React, { useRef, useState,useEffect} from 'react'
import Modal from '../../components/modal/Modal'
import { useForm } from 'react-hook-form';
import {getFaculties} from '../../services/http/FacultyService';
import {createUnidadAdministrativa} from '../../services/http/UniAdministrativaService'


function ModalRegistroUnidadAdministrativa( props ){
    const modalref = useRef();

    const {register, formState: { errors }, handleSubmit, reset } = useForm();

    const [ nameUnidadAdministrativa, setNameUnidadAdministrativa ] = useState("");

    const [ facultades, setFacultades ] = useState(["derecho","economia","tecnologia","arquitectura"]);

    const openModal = () => {
        modalref.current.openModal()
    };

    const closeModal = () => {
        modalref.current.closeModal()
    };

    const OpenCloseModal = () => {
        if(props.isShowModalRegistroUA==true){
            openModal();
        }
    };

    const handleInputChange = (event) => {
        if(event.target.value[0]==" "){
            setNameUnidadAdministrativa(
                event.target.value.substring(1)
            );
        }else{
            setNameUnidadAdministrativa(
                event.target.value
            );
        } 
    };

    const saveData = async(data) => {
        const res = await createUnidadAdministrativa({name:data.nameUnidadAdministrativa,faculties_id:data.selectFacultad});
        console.log(res);
        props.CloseModalRUA();
        props.updateAdministrativas();
        closeModal();
        alert(res.message);
    }
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getFaculties();
            setFacultades(response.facultades);
        } catch (error) {
            console.log(error);
        }
    };

        fetchData();
    }, []);
    return(
        <>
            {
                OpenCloseModal()
            }
            <Modal ref={ modalref }>
                <form onSubmit={handleSubmit(saveData)}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Agregar Unidad Administrativa</h5>
                                <button type="button" className="close" onClick={() => {props.CloseModalRUA();closeModal()}}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-rom">
                                    <div className="form-group col-md-10">
                                        <label>Nombre de Unidad:</label>
                                            <input
                                                name="nameUnidadAdministrativa"
                                                {...register("nameUnidadAdministrativa",{
                                                    required:"Campo requerido",
                                                    minLength:{
                                                        value:3,
                                                        message:"Este campo debe tener entre 3 y 50 caracteres"
                                                    },
                                                    maxLength:{
                                                        value:50,
                                                        message:"Este campo debe tener entre 3 y 50 caracteres"
                                                    },
                                                    pattern:{
                                                        value: /^[Ññíóáéú. a-zA-Z ]+$/,
                                                        message:"El campo solo permite caracteres alfabeticos"
                                                    }
                                                })}
                                                className="form-control"
                                                type="text"
                                                value={nameUnidadAdministrativa}
                                                onChange={ handleInputChange }
                                            ></input>
                                            {errors.nameUnidadAdministrativa && <span className="text-danger text-small d-block mb-2">{errors.nameUnidadAdministrativa.message}</span>}
                                    </div>
                                    <div className="form-group col-md-10">
                                        <label>Facultad:</label>
                                    <select 
                                        name="selectFacultad"
                                        {...register("selectFacultad",{
                                            required:"Seleccione facultad"
                                        })}
                                        className="form-control">
                                            <option value="">Seleccione la facultad</option>
                                            {
                                                facultades.map((facultad)=>{
                                                    return(
                                                        <option value={facultad.id}>{facultad.nameFacultad}</option>   
                                                    )
                                                })
                                            }
                                        </select>
                                        {errors.selectFacultad && <span className="text-danger text-small d-block mb-2">{errors.selectFacultad.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal"
                                    onClick={() => {props.CloseModalRUA();closeModal()}}>Cancelar</button>
                                <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                            </div>
                            </div>
                        </div>
                </form>
            </Modal>
        </>
    );
}

export default ModalRegistroUnidadAdministrativa;
