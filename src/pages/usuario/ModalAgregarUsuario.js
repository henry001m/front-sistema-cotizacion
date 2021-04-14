import React from 'react'

function ModalAgregarUsuario(){
    return(
        <div className="modal-fade" id="modalAgregarAdquisicion" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Agregar Usuario</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nombres:</label>
                                <input type="text" className="form-control"></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Apellidos:</label>
                                <input type="text" className="form-control"></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Carnet de Identidad:</label>
                                <input type="text" className="form-control"></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Telefono:</label>
                                <input type="text" className="form-control"></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Direccion:</label>
                                <input type="text" className="form-control"></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Correo Electronico:</label>
                                <input type="text" className="form-control"></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Tipo de usuario:</label>
                                <select id="inputState" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Rol de Usuario:</label>
                                <select id="inputState" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-primary">Guardar</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAgregarUsuario;