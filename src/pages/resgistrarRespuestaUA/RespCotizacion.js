import React, { useState, useEffect } from 'react'
import './RespCotizacion.css';
import { useForm } from "react-hook-form";
import {detailsQuotitation,registrarCotizacionUA,registrarCotizacionDetalleUA,registrarCotizacionDetalleFileUA,regitrarArchivoGeneralUA} from '../../services/http/CompanyCodeService';
import DetalleFila from './DetalleFila';
import { getEmpresas } from '../../services/http/BussinessService';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { ModalHeader } from 'reactstrap';

function RespCotizacion(props) {
    const {id} = useParams();
    const { register, formState: { errors }, handleSubmit } = useForm();
    let history = useHistory();
    const [empresas, setEmpresas] = useState([]);
    const [detalles, setDetalles] = useState([]);
    const [fechaSolic, setFechaSolic] = useState("");
    const [fechaMin, setFechaMin] = useState("");
    const [cotizados, setCotizados] = useState([]);
    const [message, setMessage] = useState("");
    const [dataQ, setDataQ] = useState({});
    const [flag, setFlag] = useState(false);
    //files
    const [namefiles, setNamefiles] = useState([]);
    const [fileValidate, setFileValidate] = useState(false);
    const [fls, setFls] = useState(null);
    const [existeFile, setExisteFile] = useState("");
    const [codigos, setCodigos] = useState([
        {id:"000001"},
        {id:"000002"},
        {id:"000003"},
        {id:"000004"},
    ]);
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
    const irAtras = ()=>{
        history.push({pathname:`/cotizaciones/${id}`,data:dataQ});
    }
    const enviarDetalle = async(detalle, id)=>{
        const res = await registrarCotizacionDetalleUA(detalle,id)
        console.log(detalle.archivo);
        const resFile = await registrarCotizacionDetalleFileUA(detalle.archivo,res.response)

    }
    const onSubmit = async (data) =>{
        data.request_quotitations_id=id;
        data.answerDate=new Date().toISOString().substr(0,10);
        try {
            if(!fileValidate){
                if(cotizados.length>0){
                    if(fls!== null){
                        setExisteFile("");
                        document.getElementById('btnEnviar').disabled=true;
                        const res = await registrarCotizacionUA(data);
                        cotizados.forEach(cotizado => {
                            enviarDetalle(cotizado,res.response.id);
                        });
                        const formData = new FormData();
                        if(fls != null){
                            console.log("todos los archivos",fls.length)
                            for(var i=0 ; i<fls.length ; i++){
                                let name = 'file';
                                formData.append(name,fls[i],fls[i].name);
                            }
                        }
                        const resfilegeneral = await regitrarArchivoGeneralUA(formData,res.response.id);
                        swal({
                            text: res.response.message,
                            button: "Aceptar",
                          });
                        irAtras();
                    }else{
                       setExisteFile("Abjunte el archivo de cotización por favor");
                    }
                }else{
    
                    setMessage("No cotizo ningun detalle ó no guardo, revise por favor");
                }
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
    const fileSelectHandlerGeneral =(e)=>{
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
                if(exten === 'pdf'|| exten === 'PDF' || exten === 'JPG' || exten === 'docx' || exten=== 'jpg'){
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
        setExisteFile("");
        setNamefiles(namefileAux);
        setFls(e.target.files);
    }
    useEffect(() => {
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        const {data} = props.location;
        setFechaSolic(hoy.toLocaleDateString());
        setFechaMin(fechaDeHoy());
        const fetchData = async () => {
            try {
                setDataQ(data);
                const response = await detailsQuotitation(id);
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
            <div class="row page-titles">
                <div class="col-md-12 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">Solicitudes de adquisicion</li>
                        <li class="breadcrumb-item">Solicitud N&#176; {id}</li>
                        <li class="breadcrumb-item">Cotizaciones</li>
                        <li class="breadcrumb-item">Agregar cotizacion</li>
                    </ol>
                </div>
            </div>
            <br></br>
            <div className="form-row">
                <div className="col-md-12">
                    <div class="card">
                        <div class="card-header">
                             <h4>Agregar cotizacion
                             <button type="button" className="close" onClick={irAtras}>
                            <span aria-hidden="true">&times;</span>
                            </button></h4>
                        </div>
                        <div class="body">
                            <div className="form-register">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                      <ModalHeader>Datos del proveedor</ModalHeader><br></br>
                                      <div className="col">
                                            <div className="form-row">
                                                <div className="col-md-4">
                                                    <select {...register("codigo",{required:true})} className="form-select form-control" aria-label="Default select example">
                                                        <option value="" >Seleccione codigo cotizacion</option>
                                                        {
                                                            codigos.map((cod)=>(
                                                                <option key={cod.id} value={cod.id}>{cod.id}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    {errors.codigo?.type === 'required' && <span style={{color:"red"}}>Este campo es requerido</span>}
                                                </div>
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
                                                <div className="col-md-4" align="right">
                                                    <button onClick={()=>{history.push("/empresas");}} className="btn btn-secondary btn-sm">Registrar Nueva Empresa</button>
                                                </div>
                                            </div>
                                            </div>

                                        <ModalHeader>Datos de cotización</ModalHeader><br></br>
                                        <div className="col">
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
                                        </div>
                                        <ModalHeader>Detalle</ModalHeader><br></br>
                                        <div class="col">
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
                                        </div>
                                    <div style={{textAlign:'right',width:'100%'}}><span style={{color:'red'}}>{message}</span></div>
                                    <div class="col">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Observaciones:</label>
                                            <textarea {...register("observation",{maxLength:200})} type="text" className="form-control"></textarea>
                                            {errors.observacion?.type === 'maxLength' && <span style={{color:"red"}}>Supero el limite de 200 caracteres</span>}
                                        </div>
                                    </div>
                                    </div>
                                    <div class="col">
                                        <div className="form-row" >
                                            <div className="form-group col-md-6">
                                                <div className="">
                                                    <input
                                                    className = "btn btn-secondary"
                                                        name="archivo"
                                                        type="file"
                                                        onChange = {fileSelectHandlerGeneral}
                                                    ></input>
                                                </div>
                                                <label style={{color:'red'}}>{existeFile}</label>
                                                {fileValidate && <label style={{color:'red'}}>Los formatos de archivos permitidos son jpg, pdf y docx</label>}
                                            </div>
                                            
                                            <div className="form-group col-md-6" id="toolbar">
                                                <button className="btn btn-secondary" onClick={irAtras}  id="btnV">Cancelar</button>
                                                <button type="submit" className="btn btn-success ml-4" id="btnEnviar">Registrar</button>
                                            </div>
                                        </div>
                                    </div>
                           </form>
                    
                </div>
                        </div>
                        

                    </div>
                    <br></br>
                </div>

            </div>
            {/* <div className="form-row ">
                <h3 className="col-md-9" >Datos del proveedor</h3>
                <di className="col-md-3 " align="end">
                    <button type="button" className="close" onClick={irAtras}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </di>
            </div> */}
                
            </div>
            
        </>
    );
}

export default RespCotizacion;