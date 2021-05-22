import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../Home'
import './RespCotizacion.css'
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { BagPlusFill } from 'bootstrap-icons-react';
import OfertaModal from './OfertaModal';

function RespCotizacion() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [disponible, setDisponible] = useState(false);
    const [total, setTotal] = useState(0);
    const onSubmit = (data) =>{
        console.log(data)
    };
    const disponibleItem = ()=>{
        setDisponible(!disponible);
    }
    const calcularTotal = (e)=>{
        setTotal(e.target.value*10);
    }
    const [abierto, setAbierto] = useState(false);
    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }
    return(
        <>
            <div className="container" align="left">
                <h1 className="ml-4">Responder Cotizacion</h1>
                <div className="col">
                <OfertaModal abierto={abierto} cerrarModal={cerrarModal}/>
                    <div className="form-register">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label>Empresa:</label>
                                        <input {...register("nameEmpresa")} type="text" className="form-control"></input>
                                    </div>
                                    <div className="form-group col-md-4">
                                            <label>Validez de la oferta:</label>
                                            <input {...register("validesOferta")} type="text" className="form-control"></input>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Fecha de Solicitud:</label>
                                        <input {...register("fechaCotizacion")} type="text" className="form-control"></input>
                                    </div>      
                            </div>     
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label>Formas de Pago:</label>
                                    <select className="form-control" aria-label="Default select example">
                                        <option selected>Seleccione forma de pago</option>
                                        <option value="1">Efectivo</option>
                                        <option value="2">Credito</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Tiempo de Garantia:</label>
                                    <input {...register("tiempoGarantia")} type="text" className="form-control"></input>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Tiempo de Entrega:</label>
                                    <input {...register("tiempoEntregra")} type="text" className="form-control"></input>
                                </div>
                            </div>
                            <table className="table ">
                                    <thead>
                                        <tr>
                                            <th width="3%" scope="col">N&#176;</th>
                                            <th width="3%">Disp.</th>
                                            <th width="10%" scope="col">Cantidad</th>
                                            <th width="10%" scope="col">Unidad</th>
                                            <th width="44%" scope="col">Destalle</th>
                                            <th width="12%" scope="col">Precio Unit.</th>
                                            <th width="13%" scope="col">Precio total</th>
                                            <th width="5%" scope="col">Oferta</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><input onChange={disponibleItem} type="checkbox" style={{width:'20px',height:'20px'}}/></td>
                                            <td>10</td>
                                            <td>unidades</td>
                                            <td>Detalleadfadfadf adfadfaf adfasdfadf adfafdasdf</td>
                                            {disponible && <td><input className="form-control" {...register("presioUnitario")} onChange={calcularTotal}/></td>}
                                            {disponible && <td> <input className="form-control" {...register("presioTotal")} value={total} readonly/> </td>}
                                            {!disponible && <td><input className="form-control" disabled /></td>}
                                            {!disponible && <td><input className="form-control" disabled/> </td>}
                                            <td><button style={{border:"none",}} onClick={abrirModal}><BagPlusFill style={{color:'orange', fontSize:'30px'}}/></button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Observaciones:</label>
                                    <textarea {...register("observacion")} type="text" className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="form-group col" id="toolbar">
                                    <button type="submit" className="btn btn-secondary"  id="btnV">Cancelar</button>
                                    <button type="submit" className="btn btn-success" id="btnV"> Enviar </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default RespCotizacion;