import React from "react"
import './EnviarCotizacion.css'

function EnviarCotizacion(){
    return(
        <>
        <div className="container" align="left">
            <div className="form-register">
                <form>
                    <div>
                        <br></br>
                        <h1 align="left">Envio por correo</h1>
                        <br></br>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Correo de la Empresa:</label>
                            <div className="form-row" id="inputsEC">
                                <input type="text" className="form-control"></input>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Descripción:</label>
                            <div className="form-row" id="inputsEC">
                                <textarea className="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <div className="form-row">
                                <label>Formulario de Cotización:</label>
                            </div>
                            <div className="form-row" id="inputsEC">
                                <button type="button" className="btn btn-secondary my-2 my-sm-0"> Adjuntar Archivo </button>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col" id="btnCE">
                            <button type="button" className="btn btn-secondary my-2 my-sm-0"> Imprimir </button>
                            <button type="button" className="btn btn-info my-2 my-sm-0"> Enviar </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default EnviarCotizacion;