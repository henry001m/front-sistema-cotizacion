import React, { useState, useRef, useEffect } from 'react'
import { PlusCircle, PencilSquare } from 'bootstrap-icons-react'
import { useForm } from 'react-hook-form';
import ModalRegistroUnidadAdministrativa from './ModalRegistroUnidadAdministrativa'
import {getUnidadesAdministrativas} from '../../services/http/UniAdministrativaService'
import ModalEditarUA from './ModalEditarUA'
function UnidadesAdministrativas() {
    const modalref = useRef();
    const {reset} = useForm();
    const [ administrativeUnits, setAdministrativeUnits ] = useState([])
    const [ administrativeUnit, setAdministrativeUnit] = useState({nameUnidadGasto:"",faculty:[{id:"",nameFacultad:""}],admin:[{id:"",nameAdmin:""}]});
    const [ isShowModalRegistroUA,setIsShowModalRegistroUA ] = useState(false)
    const [abrirEditor, setAbrirEditor] = useState(false);
    const [flag, setFlag] = useState(false);

    const closeModalRUA = () => {
        setIsShowModalRegistroUA( false );
    };
    const closeModal = () => {
        reset()
        modalref.current.closeModal()
    };
   const cerrarEditor = () => {
        setAbrirEditor( false );
    }
    const updateAdministrativas = ()=>{
        setFlag(!flag);
    }
    // Unit admin de BD
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getUnidadesAdministrativas();
            setAdministrativeUnits(response.Administrative_unit);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        };
    fetchData();
    }, [setAdministrativeUnits,flag]);


    return(
        <>
            <div className="container" align="left">
                        <br></br>
                        <h1>Unidades Administrativas</h1>
                        <br></br>
                    <div className="row">
                        <div className="col-6">
                            <form className="form-inline">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            </form>
                        </div>
                        <div className="col-6" align="right">
                            <button type="button" className="btn btn-success my-2 my-sm-0" onClick={() => setIsShowModalRegistroUA(true)}> 
                            <PlusCircle  className="mb-1"/> Nuevo </button>
                        </div>
                    </div>
                    <ModalRegistroUnidadAdministrativa isShowModalRegistroUA={ isShowModalRegistroUA } closeModalRUA = {closeModalRUA} updateAdministrativas={updateAdministrativas}/>
                    <br></br>
                    <div className="form-register">             
                        <div className="form-row">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Facultad</th>
                                    <th scope="col">Encargado</th>
                                    <th scope="col">Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        administrativeUnits.map((administrativeUnit,index)=>{
                                            return(
                                                <tr>
                                                {/* <tr key={index}>
                                                <th scope="row">{index+1}</th> */}
                                                <td>{index+1}</td>
                                                <td>{administrativeUnit.name}</td>
                                                <td>{administrativeUnit.faculty}</td>
                                                <td>{administrativeUnit.faculty}</td>
                                                <td><button className="btn  btn-warning" 
                                                        onClick={()=>{
                                                            setAbrirEditor(true)
                                                            setAdministrativeUnit(administrativeUnit)
                                                        }}
                                                        style={{color:'white', backgroundColor:'orange'}}
                                                    ><PencilSquare/></button>
                                                </td>
                                                </tr>
                                            )
                                        })
                                    }
                                                                        
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
            <ModalEditarUA
                abrirEditor={ abrirEditor }
                administrativeUnit ={ administrativeUnit }
                cerrarEditor = {cerrarEditor}
                updateAdministrativas= {updateAdministrativas}
            />
        </>
    );
};

export default UnidadesAdministrativas;