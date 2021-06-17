import React, { useState, useEffect } from 'react'
import './RespCotizacion.css'
import { useForm } from "react-hook-form";
import {detailsQuotitation,registrarCotizacionUA,registrarCotizacionDetalleUA,registrarCotizacionDetalleFileUA,regitrarArchivoGeneralUA} from '../../services/http/CompanyCodeService';
import DetalleFila from './DetalleFila';
import { getEmpresas } from '../../services/http/BussinessService';
import { useHistory } from 'react-router-dom';
import { FileEarmarkArrowUpFill } from 'bootstrap-icons-react';

function RespCotizacion(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    let history = useHistory();
    const [empresas, setEmpresas] = useState([]);
    const [detalles, setDetalles] = useState([]);
    const [fechaSolic, setFechaSolic] = useState("");
    const [fechaMin, setFechaMin] = useState("");
    const [cotizados, setCotizados] = useState([]);
    const [quotitationId, setQuotitationId] = useState({});
    const [message, setMessage] = useState("");
    const [flag, setFlag] = useState(false);
    //files
    const [namefile, setNamefile] = useState([])
    const [fileValidate, setFileValidate] = useState(false);
    const [fl, setFl] = useState(null);

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
    const enviarDetalle = async(detalle, id)=>{
        console.log(detalle)
        //const res = await registrarCotizacionDetalleUA(detalle,id)
        //const resFile = await registrarCotizacionDetalleFileUA(detalle.archivo,res.response)
    }
    const onSubmit = async (data) =>{
        data.company_codes_id=quotitationId.id;
        data.answerDate=new Date().toISOString().substr(0,10);
        try {
            if(cotizados.length>0){
                //document.getElementById('btnEnviar').disabled=true;
                const res = await registrarCotizacionUA(data);
                const resfilegeneral = await regitrarArchivoGeneralUA(fl,res.response.id);
                cotizados.forEach(cotizado => {
                    //enviarDetalle(cotizado,res.response.id);
                    enviarDetalle(cotizado,1);
                });
                console.log(data)
                //alert(res.response.message);
                //salirHome();
            }else{
                setMessage("No cotizo ningun detalle ó no guardo, revise por favor");
            }
        } catch (error) {
            console.log(error)
        }
    };
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
                if(exten === 'pdf' || exten === 'png' || exten=== 'jpg' || exten === 'jpeg' || exten === 'PNG'){
                    noEsValido =false;
                }else{
                    noEsValido=true;
                    flag = true;
                    
                }
            }
        });
        if(extenciones.length>0){
            setFileValidate(noEsValido);
        }
        setNamefile(namefileAux);
        setFl(e.target.files);
        console.log(e.target.files)
    }
    useEffect(() => {
        //const {data} = props.location;
        const data ={
            request_quotitations_id:1
        };
        setQuotitationId(data.request_quotitations_id);
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        setFechaSolic(hoy.toLocaleDateString());
        setFechaMin(fechaDeHoy());
        const fetchData = async () => {
            try {
                const response = await detailsQuotitation( data.request_quotitations_id);
                setDetalles(response);
                const res = await getEmpresas();
                setEmpresas(res.business);
                console.log(res)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return(
        <>
            <div className="container" align="left">
                <div className="col">
                    <div className="form-register">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h3>Datos del proveedor</h3>
                            <hr style={{margin:'0px'}}></hr>
                            <div className="form-row">
                                <div className="col-md-4">
                                    <select {...register("idEmpresa",{required:true})} className="form-select form-control" aria-label="Default select example">
                                        <option value="" >Seleccione la empresa</option>
                                        {
                                            empresas.map((empresa)=>(
                                                <option key={empresa.id} value={empresa.id}>{empresa.nameEmpresa}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.idEmpresa?.type === 'required' && <span style={{color:"red"}}>Este campo es requerido</span>}
                                </div>
                            </div>
                            <h3>Datos de Cotización</h3>
                            <hr style={{margin:'0px'}}></hr>
                            <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label>Validez de la oferta:<span style={{color:"red",fontSize:"20px"}}>*</span></label>
                                        <input {...register("offerValidity",{required:true})} type="date" min={fechaMin} className="form-control form-control-sm"></input>
                                        {errors.offerValidity?.type === 'required' && <span style={{color:"red"}}>Este campo es requerido</span>}
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label>Fecha de Respuesta:<span style={{color:"red",fontSize:"20px"}}>*</span></label>
                                        <input value={fechaSolic} onChange={()=>{}} type="text" className="form-control form-control-sm"></input>
                                    </div>
                                    <div className="form-group col-md-3">
                                    <label>Formas de Pago:<span style={{color:"red",fontSize:"20px"}}>*</span></label>
                                    <select {...register("paymentMethod")} className="form-control form-control-sm" aria-label="Default select example">
                                        <option value="efectivo">Efectivo</option>
                                        <option value="credito">Credito</option>
                                    </select>
                                    </div>
                                    <div className="form-group col-md-3">
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
                                                    <DetalleFila key={detalle.id} detallesCotizado={detallesCotizado} elimiarCotizado={elimiarCotizado} detalle={detalle} index={index}/>
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
                                <div className="form-group col-md-6" id="toolbar">
                                    {namefile.map((name,index)=>{
                                        return(
                                            <li key={index}>{name}</li>
                                        )
                                    })}
                                    <div className="">
                                        <input 
                                            name="archivo"
                                            type="file" 
                                            id="files" 
                                            multiple
                                            onChange = {fileSelectHandler}
                                        ></input>
                                        <label for="files"><FileEarmarkArrowUpFill className="mb-1"/> Adjuntar archivo</label>
                                    </div>
                                    {fileValidate && <label style={{color:'red'}}>Solo se permite archivos pdf, png, jpg, jpeg</label>}
                                </div>
                                
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