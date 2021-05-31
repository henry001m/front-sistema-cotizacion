import React,{useState} from 'react'
import { BagPlusFill } from 'bootstrap-icons-react';
import OfertaModal from './OfertaModal';

const DetalleFila = (props) => {

    const [disponible, setDisponible] = useState(false);
    const [total, setTotal] = useState(0);
    const [precUnit, setPrecUnit] = useState(0);
    const [abierto, setAbierto] = useState(false);

    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }
    const disponibleItem = ()=>{
        setDisponible(!disponible);
    }
    const calcularTotal = (e)=>{
        setPrecUnit(e.target.value*1);
        setTotal(e.target.value*props.detalle.amount);
    }
    const onSubmit = () =>{
        var error = false;
        if(precUnit<0){
            alert("No se permite números negativos");
            error=true;
        }
        if(precUnit===0){
            alert("Cotización no valida");
            error=true;
        }
        if(!error){
            const data = {request_details_id:props.detalle.id,unitPrice:precUnit,totalPrice:total,amount:props.detalle.amount,unitMeasure:props.detalle.unitMeasure,description:props.detalle.description,disponible:disponible}
            props.detallesCotizado(data);
        }
    };
    return (
        <>
            <OfertaModal abierto={abierto} cerrarModal={cerrarModal}/>
            <tr>
                <td>{props.index+1}</td>
                <td><input onChange={disponibleItem} type="checkbox" style={{width:'20px',height:'20px'}}/></td>
                <td>{props.detalle.amount}</td>
                <td>{props.detalle.unitMeasure}</td>
                <td>{props.detalle.description}</td>
                {disponible && <td><input className="form-control" min="0" type="number" onChange={calcularTotal}/></td>}
                {disponible && <td> <input className="form-control" type="number" value={total} onChange={()=>{}} readOnly/> </td>}
                {!disponible && <td><input className="form-control" disabled /></td>}
                {!disponible && <td><input className="form-control" disabled/> </td>}
                <td><button style={{border:"none",}} onClick={abrirModal}><BagPlusFill style={{color:'orange', fontSize:'25px'}}/></button></td>
                <td><button type="submit" style={{border:"none",}} className="btn btn-primary" onClick={onSubmit}>Agregar</button></td>
            </tr>
        </>
    )
}

export default DetalleFila
