import React,{useState} from 'react'
import { BagFill } from 'bootstrap-icons-react';
import OfertaModal from './OfertaModal';

const DetalleFila = (props) => {
    const [total, setTotal] = useState(0);
    const [precUnit, setPrecUnit] = useState(0);
    const [abierto, setAbierto] = useState(false);
    const [flagCotizar, setFlagCotizar] = useState(true);
    const [filaCotizada, setFilaCotizada] = useState("");
    const [oferta, setOferta] = useState({})
    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }
    const calcularTotal = (e)=>{
        setPrecUnit(e.target.value);
        setTotal(e.target.value*props.detalle.amount);
    }
    const guardarOferta = (data)=>{
        setOferta(data)
    }
    const onSubmit = () =>{
        var error = false;
        if(precUnit<0){
            error=true;
        }
        if(precUnit===0){
            error=true;
        }
        if(precUnit===""){
            error=true;
        }
        if(!error){
            const data = {request_details_id:props.detalle.id,unitPrice:parseFloat(precUnit),totalPrice:total}
            if(oferta){
                data.brand = oferta.marca
                data.model = oferta.modelo
                data.industry = oferta.industria
                data.warrantyTime = oferta.tiempo_garantia
                data.archivo = oferta.archivo
            }
            props.detallesCotizado(data);
            setFilaCotizada("table-success")
            setFlagCotizar(!flagCotizar);
        }
    };
    const calcelarCotizado = ()=>{
        setPrecUnit(0);
        setTotal(0);
        props.elimiarCotizado(props.detalle.id);
        setFilaCotizada("")
        setFlagCotizar(!flagCotizar);
    }
    return (
        <>
            <OfertaModal abierto={abierto} guardarOferta={guardarOferta} cerrarModal={cerrarModal}/>
            <tr className={filaCotizada}>
                <td>{props.index+1}</td>
                <td style={{textAlign:'center'}}>{props.detalle.amount}</td>
                <td>{props.detalle.unitMeasure}</td>
                <td>{props.detalle.description}</td>
                <td><input className="form-control"  value={precUnit} type="number" onChange={calcularTotal}/></td>
                <td> <input className="form-control" type="number" value={total} onChange={()=>{}} readOnly/> </td>
                <td style={{textAlign:'center'}}><BagFill style={{color:'orange', fontSize:'22px'}} onClick={abrirModal}/></td>
                {flagCotizar &&<td><button style={{border:"none",}} className="btn btn-primary btn-sm" onClick={onSubmit}>Guardar</button></td>}
                {!flagCotizar&&<td><button style={{border:"none",}} className="btn btn-danger btn-sm" onClick={calcelarCotizado}>Cancelar</button></td>}
            </tr>
        </>
    )
}

export default DetalleFila
