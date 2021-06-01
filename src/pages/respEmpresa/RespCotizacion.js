import React, { useState, useEffect } from 'react'
import './RespCotizacion.css'
import { useForm } from "react-hook-form";
import {detailsQuotitation,registrarCotizacion} from '../../services/http/CompanyCodeService';
import DetalleFila from './DetalleFila';
import DetalleCotizado from './DetalleCotizado';
import { useHistory } from 'react-router-dom';

function RespCotizacion(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    let history = useHistory();
    const [empresa, setEmpresa] = useState("");
    const [detalles, setDetalles] = useState([]);
    const [fechaSolic, setFechaSolic] = useState("");
    const [fechaMin, setFechaMin] = useState("");
    const [cotizados, setCotizados] = useState([]);
    const [companyCode, setCompanyCode] = useState({});
    const [message, setMessage] = useState("");
    const [empresaId, setEmpresaId] = useState(0);
    const [flag, setFlag] = useState(false);

    const detallesCotizado =(dato)=>{
        setMessage("");
        var yaExiste = false;
        cotizados.forEach(detalle => {
            if(detalle.request_details_id===dato.request_details_id){
                yaExiste=true;
            }
        });
        if(!yaExiste){
            if(dato.totalPrice>0){
                setCotizados([...cotizados,dato]);
            }
        }
    }
    const elimiarCotizado =(id)=>{
        var index = 0;
        var indexEncotrado;
        cotizados.forEach((cotizado) => {
            if(cotizado.request_details_id === id){
                indexEncotrado=index
            }
            index++
        });
        cotizados.splice(indexEncotrado,1);
        setCotizados(cotizados);
    }
    const salirHome = ()=>{
        history.push("/ingresoCodigo");
    }
    const onSubmit = async (data) =>{
        data.detalles=cotizados;
        data.company_codes_id=companyCode.id;
        data.answerDate=new Date().toISOString().substr(0,10);
        data.nameEmpresa=empresa;
        data.email=companyCode.email;
        data.empresaId = empresaId;
        try {
            if(cotizados.length>0){
                console.log(data);
                document.getElementById('btnEnviar').disabled=true;
                const res = await registrarCotizacion(data);
                alert(res.response.message);
                salirHome();
            }else{
                setMessage("No cotizo ningun detalle ó no guardo, revise por favor");
            }
        } catch (error) {
            console.log(error)
        }
    };
    const registraNombreEmpresa=(e)=>{
        setEmpresa(e.target.value);
    }
    const fechaDeHoy = () => {
        let hoy = new Date();
        var dia=hoy.getDate();
        if(hoy.getDate()<10){
            dia = '0'+dia;
        } 
        var mes = hoy.getMonth()+1;
        if(hoy.getMonth()<10){
            mes ='0'+mes;
        }
        return hoy.getFullYear()+'-'+mes+'-'+dia;
    }
    useEffect(() => {
        const {data} = props.location;
        setCompanyCode({id:data.id,email:data.email,request_quotitations_id:data.request_quotitations_id});
        if(data.empresa){
            setEmpresaId(data.empresa.id);
            setEmpresa(data.empresa.nameEmpresa);
        }
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        setFechaSolic(hoy.toLocaleDateString());
        setFechaMin(fechaDeHoy());
        const fetchData = async () => {
            try {
                const response = await detailsQuotitation( data.request_quotitations_id);
                setDetalles(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return(
        <>
            <div className="container" align="left">
                <h2 className="ml-4">Responder cotización</h2>
                <div className="col">
                    <div className="form-register">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label>Empresa:<span style={{color:"red",fontSize:"20px"}}>*</span></label>
                                        <input autoFocus  value={empresa} {...register("nameEmpresa",{required:true})} onChange={registraNombreEmpresa} type="text" className="form-control form-control-sm"></input>
                                        {errors.nameEmpresa?.type === 'required' && <span style={{color:"red"}}>Este campo es requerido</span>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Validez de la oferta:<span style={{color:"red",fontSize:"20px"}}>*</span></label>
                                        <input {...register("offerValidity",{required:true})} type="date" min={fechaMin} className="form-control form-control-sm"></input>
                                        {errors.offerValidity?.type === 'required' && <span style={{color:"red"}}>Este campo es requerido</span>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Fecha de Respuesta:<span style={{color:"red",fontSize:"20px"}}>*</span></label>
                                        <input value={fechaSolic} onChange={()=>{}} type="text" className="form-control form-control-sm"></input>
                                    </div>      
                            </div>     
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label>Formas de Pago:<span style={{color:"red",fontSize:"20px"}}>*</span></label>
                                    <select {...register("paymentMethod")} className="form-control form-control-sm" aria-label="Default select example">
                                        <option value="efectivo">Efectivo</option>
                                        <option value="credito">Credito</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Tiempo de Entrega:<span style={{color:"red",fontSize:"20px"}}>*</span></label>
                                    <input {...register("deliveryTime",{required:true})} type="date" min={fechaMin} className="form-control form-control-sm"></input>
                                    {errors.deliveryTime &&<span style={{color:"red"}}>Este campo es requerido</span>}
                                </div>
                            </div>
                            <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th width="3%" scope="col">N&#176;</th>
                                    <th width="10%" scope="col">Cantidad</th>
                                    <th width="10%" scope="col">Unidad</th>
                                    <th width="40%" scope="col">Destalle</th>
                                    <th width="12%" scope="col">Precio Unit.</th>
                                    <th width="13%" scope="col">Precio total</th>
                                    <th width="6%" scope="col">Oferta</th>
                                    <th width="6%" scope="col">Cotizar</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        detalles.map((detalle,index)=>{
                                            return(
                                                    <DetalleFila key={detalle.id} detallesCotizado={detallesCotizado} setMessage={setMessage} elimiarCotizado={elimiarCotizado} detalle={detalle} index={index} register={register}/>
                                                )
                                        })
                                    }
                            </tbody>
                            </table>
                            <div style={{textAlign:'right',width:'100%'}}><span style={{color:'red'}}>{message}</span></div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Observaciones:</label>
                                    <textarea {...register("observacion",{maxLength:200})} type="text" className="form-control"></textarea>
                                    {errors.observacion?.type === 'maxLength' && <span style={{color:"red"}}>Supero el limite de 200 caracteres</span>}
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="form-group col" id="toolbar">
                                    <button className="btn btn-secondary" onClick={salirHome}  id="btnV">Cancelar</button>
                                    <button type="submit" className="btn btn-success ml-4" id="btnEnviar">Enviar</button>
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