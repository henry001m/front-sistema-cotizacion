import React from 'react'

const DetalleCotizado = (props) => {
    const quitarDetalle = () =>{
        props.elimiarCotizado(props.index);
    };
    return (
        <>
            <tr>
                <td>{props.index+1}</td>
                <td>{props.detalle.amount}</td>
                <td>{props.detalle.unitMeasure}</td>
                <td>{props.detalle.description}</td>
                <td>{props.detalle.unitPrice}</td>
                <td>{props.detalle.totalPrice}</td>
                <td><button style={{border:"none",}} className="btn btn-primary btn-sm" onClick={quitarDetalle}>Quitar</button></td>
            </tr> 
        </>
    )
}

export default DetalleCotizado
