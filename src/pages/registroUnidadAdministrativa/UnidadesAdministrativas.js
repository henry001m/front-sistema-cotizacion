import React, { useState } from 'react'
import { PlusCircle } from 'bootstrap-icons-react'
import ModalRegistroUnidadAdministrativa from './ModalRegistroUnidadAdministrativa'

function UnidadesAdministrativas() {

    const [ administrativeUnits, setAdministrativeUnits ] = useState([])

    const [ isShowModalRegistroUA,setIsShowModalRegistroUA ] = useState(false)

    const CloseModalRUA = () => {
        setIsShowModalRegistroUA( false );
    };

    const AdministrativeUnits = administrativeUnits.map((administrativeUnit,index)=>{
        return(
            <tr key={index}>
                <th scope="row">
                    {index+1}         
                </th>
                <td >
                    {administrativeUnit.nameUnidadGasto}         
                </td>
                <td >
                    {administrativeUnit.facultad}         
                </td>
                <td >
                    {administrativeUnit.administrator}         
                </td>
            </tr>
        );
    });

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
                    <br></br>
                    <div className="form-register">             
                        <div className="form-row">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Facultad</th>
                                    <th scope="col">Administrador</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AdministrativeUnits}
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
            <ModalRegistroUnidadAdministrativa
            isShowModalRegistroUA={ isShowModalRegistroUA }
            CloseModalRUA = {CloseModalRUA}/>
        </>
    );
};

export default UnidadesAdministrativas;
