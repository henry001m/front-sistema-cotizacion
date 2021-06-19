import React from 'react'

function RespuestaInformeCotizacion(){

    const closePage = () => {

    }

    return(
        <>
            <div className="container" align="left">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Informe de cotización</h1>   
                    </div>
                    <div className="col-md-6" align="right">
                        <button type="button" className="close" onClick={ closePage }>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <br></br>
                <div className="col">
                    <div className="form-register">
                        <div className="form-row">
                            <div className="form-group col-md-6" >
                                <h5>Encargado: </h5>
                                <label>Nombre</label>
                            </div>
                            <div className="form-group col-md-6">
                                <h5>Fecha: </h5>
                                <label> fecha</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <textarea value="valor"></textarea>
                        </div>
                        <div className="form-row">
                            <h5>Cuadro comparativo de cotizaciones </h5>
                        </div>
                        <div className="form-row">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Empresa 1</th>
                                        <th scope="col">Empresa 1</th>
                                        <th scope="col">Empresa 1</th>
                                        <th scope="col">Empresa 1</th>
                                        <th scope="col">Empresa 1</th>
                                        <th scope="col">Precio mas bajo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RespuestaInformeCotizacion;